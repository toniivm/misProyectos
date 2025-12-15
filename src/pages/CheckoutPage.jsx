import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, CheckCircle2, ArrowLeft, Shield, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import StripeCheckout from '../components/StripeCheckout';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [orderId, setOrderId] = useState(null);
  const API_BASE = (process.env.REACT_APP_API_URL || process.env.REACT_APP_API_BASE || 'http://localhost:8080').replace(/\/$/, '');
  
  // Legal acceptance
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  
  // Form validation errors
  const [errors, setErrors] = useState({});
  
  const [shippingData, setShippingData] = useState({
    name: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const [shippingMethod, setShippingMethod] = useState('standard');

  const shippingCosts = {
    standard: 0,
    express: 9.99,
    urgent: 19.99,
  };

  const shippingOptions = [
    { id: 'standard', name: 'Envío Estándar', time: '5-7 días laborables', cost: 0 },
    { id: 'express', name: 'Envío Express', time: '2-3 días laborables', cost: 9.99 },
    { id: 'urgent', name: 'Envío Urgente', time: '24 horas', cost: 19.99 },
  ];

  // Input formatting helpers
  const formatPhone = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    return v.slice(0, 9);
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'phone') {
      formattedValue = formatPhone(value);
    } else if (name === 'zip') {
      formattedValue = value.replace(/[^0-9]/gi, '').slice(0, 5);
    }
    
    setShippingData((prev) => ({ ...prev, [name]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateStep1 = (opts = {}) => {
    const silent = opts.silent === true;
    const newErrors = {};
    if (!shippingData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!shippingData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!validateEmail(shippingData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!shippingData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (shippingData.phone.length < 9) {
      newErrors.phone = 'Teléfono debe tener 9 dígitos';
    }
    if (!shippingData.address.trim()) newErrors.address = 'La dirección es obligatoria';
    if (!shippingData.city.trim()) newErrors.city = 'La ciudad es obligatoria';
    if (!shippingData.state.trim()) newErrors.state = 'La provincia es obligatoria';
    if (!shippingData.zip.trim()) {
      newErrors.zip = 'El código postal es obligatorio';
    } else if (shippingData.zip.length !== 5) {
      newErrors.zip = 'CP debe tener 5 dígitos';
    }
    if (!silent) setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = async () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      
      // Crear PaymentIntent real en backend y activar Stripe UI
      try {
        const items = [
          ...cart.map(item => ({
            id: String(item.id),
            qty: item.quantity,
            price: Number(item.price),
            name: item.title || item.name || 'Producto',
          })),
          { id: `shipping:${shippingMethod}`, qty: 1, price: Number(shippingCosts[shippingMethod] || 0), name: `Shipping ${shippingMethod}` }
        ];

        const payload = {
          items,
          currency: 'eur',
          email: shippingData.email,
          shipping: {
            name: shippingData.name,
            address: { line1: shippingData.address, city: shippingData.city, postal_code: shippingData.zip, country: 'ES' }
          }
        };

        const resp = await fetch(`${API_BASE}/payments/create-intent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!resp.ok) {
          const errJson = await resp.json().catch(() => ({}));
          throw new Error(`Intent creation failed: ${errJson.error || resp.status}`);
        }
        const data = await resp.json();
        if (data?.clientSecret) setClientSecret(data.clientSecret);
        if (data?.orderId) {
          setOrderId(data.orderId);
          setOrderNumber(data.orderId);
        }
      } catch (error) {
        console.error('Error creating payment intent:', error);
        setErrors(prev => ({ ...prev, paymentIntent: 'Error iniciando pago. Revisa conexión con el backend o stock.' }));
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Stripe Payment Handlers
  const handleStripeSuccess = async (paymentIntent) => {
    console.log('✅ Pago exitoso con Stripe:', paymentIntent);
    
    try {
      const orderNum = orderId || ('ORD-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 7).toUpperCase());
      const orderData = {
        orderNumber: orderNum,
        userId: user?.uid || 'guest',
        userEmail: user?.email || shippingData.email,
        status: 'paid',
        shipping: {
          name: shippingData.name,
          email: shippingData.email,
          phone: shippingData.phone,
          address: shippingData.address,
          city: shippingData.city,
          state: shippingData.state,
          zip: shippingData.zip,
          method: shippingMethod,
          cost: shippingCosts[shippingMethod],
        },
        payment: {
          method: 'stripe',
          paymentIntentId: paymentIntent.id,
          status: paymentIntent.status,
        },
        products: cart.map(item => ({
          id: item.id,
          title: item.title,
          brand: item.brand,
          price: item.price,
          size: item.size,
          quantity: item.quantity,
          image: item.images ? item.images[0] : item.image,
        })),
        subtotal: total,
        shippingCost: shippingCosts[shippingMethod],
        total: finalTotal,
        legalAcceptance: {
          termsAccepted: acceptedTerms,
          privacyAccepted: acceptedPrivacy,
          acceptedAt: new Date().toISOString(),
        },
      };

      // Send confirmation email if backend order exists
      try {
        if (orderId) {
          await fetch(`${API_BASE}/emails/order-confirmation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId })
          });
        }
      } catch (e) {
        console.warn('No se pudo enviar email de confirmación:', e?.message);
      }

      await saveOrderToFirebase(orderData);
      setOrderNumber(orderNum);
      setIsSubmitted(true);
      clearCart();
      
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
      setErrors({ submit: 'Pago exitoso pero error al guardar pedido. Contacta soporte.' });
    }
  };
  
  // Save order to Firebase Firestore
  const saveOrderToFirebase = async (orderData) => {
    try {
      if (!db) return null;
      const ordersRef = collection(db, 'orders');
      const docRef = await addDoc(ordersRef, {
        ...orderData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving order:', error);
      return null;
    }
  };

  const finalTotal = total + shippingCosts[shippingMethod];

  if (cart.length === 0 && !isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">Añade productos para proceder con el checkout</p>
          <button
            onClick={() => navigate('/')}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Ir a la tienda
          </button>
        </div>
      </div>
    );
  }
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-6">
        <motion.div
          className="bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center max-w-md w-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4">¡Pedido Confirmado!</h2>
          <p className="text-gray-600 mb-6">
            Gracias por tu compra. Te enviaremos un correo de confirmación con los detalles de tu pedido.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">Número de pedido</p>
            <p className="text-xl font-bold">#{orderNumber}</p>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left">
            <p className="text-sm text-blue-900">
              <strong>📦 Siguiente paso:</strong> Recibirás un email con la información de seguimiento en 24-48 horas.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition w-full"
          >
            Volver a la tienda
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition"
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">Finalizar Compra</h1>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
              {[1, 2].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition ${
                    currentStep >= step
                      ? 'bg-black text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 2 && (
                  <div
                    className={`w-24 h-1 mx-2 ${
                      currentStep > step ? 'bg-black' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 max-w-md mx-auto">
            <span className="text-sm font-medium">Envío</span>
            <span className="text-sm font-medium">Pago</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8">
              {/* Step 1: Información de Envío */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="text-black" size={28} />
                    <h2 className="text-2xl font-bold">Información de Envío</h2>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Nombre completo *</label>
                        <input
                          type="text"
                          name="name"
                          autoComplete="name"
                          value={shippingData.name}
                          onChange={handleShippingChange}
                          className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                            errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                          }`}
                          placeholder="Juan Pérez"
                          required
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          value={shippingData.email}
                          onChange={handleShippingChange}
                          className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                            errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                          }`}
                          placeholder="juan@ejemplo.com"
                          required
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Teléfono *</label>
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={shippingData.phone}
                        onChange={handleShippingChange}
                        className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                          errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                        }`}
                        placeholder="612345678"
                        maxLength="9"
                        required
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Dirección *</label>
                      <input
                        type="text"
                        name="address"
                        autoComplete="street-address"
                        value={shippingData.address}
                        onChange={handleShippingChange}
                        className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                          errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                        }`}
                        placeholder="Calle Serrano 45, 3º B"
                        required
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.address}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Ciudad *</label>
                        <input
                          type="text"
                          name="city"
                          autoComplete="address-level2"
                          value={shippingData.city}
                          onChange={handleShippingChange}
                          className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                            errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                          }`}
                          placeholder="Madrid"
                          required
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.city}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Provincia *</label>
                        <input
                          type="text"
                          name="state"
                          autoComplete="address-level1"
                          value={shippingData.state}
                          onChange={handleShippingChange}
                          className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                            errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                          }`}
                          placeholder="Madrid"
                          required
                        />
                        {errors.state && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.state}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">CP *</label>
                        <input
                          type="text"
                          name="zip"
                          autoComplete="postal-code"
                          value={shippingData.zip}
                          onChange={handleShippingChange}
                          className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                            errors.zip ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                          }`}
                          placeholder="28001"
                          maxLength="5"
                          required
                        />
                        {errors.zip && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.zip}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-semibold mb-4">Método de Envío</label>
                      <div className="space-y-3">
                        {shippingOptions.map((option) => (
                          <label
                            key={option.id}
                            className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition ${
                              shippingMethod === option.id
                                ? 'border-black bg-gray-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <input
                                type="radio"
                                name="shipping"
                                value={option.id}
                                checked={shippingMethod === option.id}
                                onChange={(e) => setShippingMethod(e.target.value)}
                                className="w-5 h-5"
                              />
                              <div>
                                <div className="font-semibold">{option.name}</div>
                                <div className="text-sm text-gray-600">{option.time}</div>
                              </div>
                            </div>
                            <div className="font-bold">
                              {option.cost === 0 ? 'GRATIS' : `${option.cost.toFixed(2)} €`}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleNextStep}
                    disabled={!validateStep1({ silent: true })}
                    className="w-full mt-8 bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Continuar al Pago
                  </button>
                </motion.div>
              )}

              {/* Step 2: Información de Pago */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="text-black" size={28} />
                    <h2 className="text-2xl font-bold">Información de Pago</h2>
                  </div>

                  {/* Stripe Notice */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 p-5 rounded-lg mb-6">
                    <div className="flex items-start gap-3">
                      <Shield size={24} className="text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">🔒 Pago Seguro con Stripe</h3>
                        <p className="text-sm text-gray-700 mb-3">
                          Pagos habilitados en modo test. Usa la tarjeta de prueba para completar el pago.
                        </p>
                        <div className="bg-white border border-gray-300 p-3 rounded text-sm">
                          <p className="font-semibold text-gray-800 mb-1">Tarjeta de Prueba Stripe:</p>
                          <p className="font-mono text-gray-600">4242 4242 4242 4242</p>
                          <p className="text-xs text-gray-500 mt-1">Vencimiento: 12/34 | CVV: 123</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stripe Checkout Component */}
                  <div className="mb-6 sm:mb-8">
                    <StripeCheckout
                      amount={finalTotal}
                      clientSecret={clientSecret}
                      onSuccess={handleStripeSuccess}
                      onError={(e) => setErrors(prev => ({ ...prev, payment: e?.message || 'Error al procesar el pago' }))}
                      customerEmail={shippingData.email}
                      disabled={!acceptedTerms || !acceptedPrivacy}
                    />
                  </div>
                  {errors.paymentIntent && (
                    <div className="bg-red-50 border-2 border-red-500 p-4 rounded-lg mb-6 flex items-center gap-2 text-red-700">
                      <AlertCircle size={20} />
                      <span>{errors.paymentIntent}</span>
                    </div>
                  )}

                  {/* Aceptación legal antes de pagar */}
                  <div className="bg-yellow-50 border-2 border-yellow-300 p-6 rounded-lg space-y-4">
                    <h3 className="font-bold mb-1 flex items-center gap-2">
                      <Shield size={20} />
                      Aceptación Legal
                    </h3>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => {
                          setAcceptedTerms(e.target.checked);
                          if (errors.terms) setErrors(prev => ({ ...prev, terms: '' }));
                        }}
                        className="mt-1 w-5 h-5 accent-black"
                        required
                      />
                      <span className="text-sm">
                        He leído y acepto los{' '}
                        <Link to="/terms" target="_blank" className="text-blue-600 hover:underline font-semibold">
                          Términos y Condiciones
                        </Link>{' '}
                        de compra, incluyendo devoluciones y garantía de autenticidad.
                      </span>
                    </label>
                    {errors.terms && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.terms}
                      </p>
                    )}

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptedPrivacy}
                        onChange={(e) => {
                          setAcceptedPrivacy(e.target.checked);
                          if (errors.privacy) setErrors(prev => ({ ...prev, privacy: '' }));
                        }}
                        className="mt-1 w-5 h-5 accent-black"
                        required
                      />
                      <span className="text-sm">
                        Acepto la{' '}
                        <Link to="/privacy" target="_blank" className="text-blue-600 hover:underline font-semibold">
                          Política de Privacidad
                        </Link>{' '}
                        y el tratamiento de mis datos personales conforme al RGPD.
                      </span>
                    </label>
                    {errors.privacy && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.privacy}
                      </p>
                    )}
                    <p className="text-xs text-gray-600">
                      El botón de pago se habilita cuando aceptas los términos y privacidad.
                    </p>
                  </div>

                  <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                      Atrás
                    </button>
                  </div>
                </motion.div>
              )}
              )}
            </div>
          </div>

          {/* Resumen del Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 sticky top-16 sm:top-24">
              <h3 className="text-xl font-bold mb-6">Resumen del Pedido</h3>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${index}`} className="flex gap-4">
                    <img
                      src={item.images ? item.images[0] : item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm line-clamp-1">{item.title}</p>
                      <p className="text-xs text-gray-600">Talla: {item.size} | Cant: {item.quantity}</p>
                      <p className="font-bold text-sm mt-1">{(item.price * item.quantity).toFixed(2)} €</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Envío</span>
                  <span>{shippingCosts[shippingMethod] === 0 ? 'GRATIS' : `${shippingCosts[shippingMethod].toFixed(2)} €`}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>{finalTotal.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
