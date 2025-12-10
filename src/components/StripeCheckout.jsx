import React, { useEffect, useState } from 'react';
import { Elements, PaymentElement, useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AlertCircle, Lock, CreditCard } from 'lucide-react';

// Inicializar Stripe con tu Public Key
// IMPORTANTE: Reemplazar con tu clave después de crear cuenta en stripe.com
const rawPublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'pk_test_REEMPLAZAR_CON_TU_CLAVE';
const stripePromise = loadStripe(rawPublicKey);

// Componente interno del formulario de pago
const PaymentForm = ({ amount, onSuccess, onError, customerEmail, clientSecret, disabled }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pr, setPr] = useState(null);

  // Initialize Payment Request (Apple Pay / Google Pay) if available
  useEffect(() => {
    if (!stripe || !amount) return;
    const prq = stripe.paymentRequest({
      country: 'ES',
      currency: 'eur',
      total: { label: 'VALTREX Pedido', amount: Math.round(Number(amount) * 100) },
      requestPayerName: true,
      requestPayerEmail: true,
    });
    prq.canMakePayment().then((result) => {
      if (result) {
        setPr(prq);
      }
    });

    if (clientSecret) {
      prq.on('paymentmethod', async (ev) => {
        try {
          const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: ev.paymentMethod.id,
          }, { handleActions: false });
          if (confirmError) {
            ev.complete('fail');
            setErrorMessage(confirmError.message || 'Pago rechazado');
            onError(confirmError);
            return;
          }
          ev.complete('success');

          if (paymentIntent && paymentIntent.status === 'requires_action') {
            const { error, paymentIntent: nextPi } = await stripe.confirmCardPayment(clientSecret);
            if (error) {
              setErrorMessage(error.message || 'Autenticación requerida fallida');
              onError(error);
            } else {
              onSuccess(nextPi);
            }
          } else if (paymentIntent) {
            onSuccess(paymentIntent);
          }
        } catch (e) {
          setErrorMessage(e.message || 'Error en Payment Request');
          onError(e);
        }
      });
    }
  }, [stripe, amount, clientSecret, onError, onSuccess]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      // Confirmar el pago con Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout?success=true`,
          receipt_email: customerEmail,
        },
        redirect: 'if_required', // No redirigir si no es necesario (ej: 3D Secure)
      });

      if (error) {
        // Manejar errores
        setErrorMessage(error.message);
        onError(error);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Pago exitoso
        onSuccess(paymentIntent);
      }
    } catch (err) {
      setErrorMessage('Error procesando el pago. Por favor, inténtalo de nuevo.');
      onError(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {pr && (
        <div className="mb-3">
          <PaymentRequestButtonElement options={{ paymentRequest: pr, style: { paymentRequestButton: { type: 'buy', theme: 'dark', height: '44px' } } }} />
        </div>
      )}
      {/* Payment Element de Stripe (incluye tarjeta, Apple Pay, Google Pay automáticamente) */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
        <PaymentElement
          options={{
            layout: 'tabs',
            defaultValues: {
              billingDetails: {
                email: customerEmail,
              },
            },
          }}
        />
      </div>

      {/* Mensaje de seguridad */}
      <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <Lock size={16} className="text-blue-600" />
        <span>Pago seguro procesado por Stripe. Tus datos están cifrados y protegidos.</span>
      </div>

      {/* Mensaje de error */}
      {errorMessage && (
        <div className="bg-red-50 border-2 border-red-500 p-4 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle size={20} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Botón de pago */}
      <button
        type="submit"
        disabled={disabled || !stripe || isProcessing}
        className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Procesando pago...
          </>
        ) : (
          <>
            <CreditCard size={20} />
            Pagar {amount.toFixed(2)} €
          </>
        )}
      </button>
    </form>
  );
};

// Componente principal exportado
const StripeCheckout = ({ amount, clientSecret, onSuccess, onError, customerEmail, disabled = false }) => {
  // Opciones para Elements Provider
  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#000000',
        colorBackground: '#ffffff',
        colorText: '#1a1a1a',
        colorDanger: '#ef4444',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        borderRadius: '8px',
      },
    },
  };

  const isPlaceholder = rawPublicKey.includes('REEMPLAZAR');

  return (
    <div className="stripe-checkout">
      {isPlaceholder && (
        <div className="mb-4 bg-red-50 border border-red-400 text-red-700 p-3 rounded text-sm">
          ⚠️ Clave pública Stripe no configurada. Define `REACT_APP_STRIPE_PUBLIC_KEY` en tu entorno.
        </div>
      )}
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm
            amount={amount}
            onSuccess={onSuccess}
            onError={onError}
            customerEmail={customerEmail}
            clientSecret={clientSecret}
            disabled={disabled}
          />
        </Elements>
      ) : (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Preparando pago seguro...</p>
        </div>
      )}
    </div>
  );
};

export default StripeCheckout;
