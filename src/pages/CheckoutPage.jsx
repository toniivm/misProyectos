import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Truck, MapPin, CheckCircle2, ArrowLeft, Shield, AlertCircle, Apple } from 'lucide-react';
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [useStripePayment, setUseStripePayment] = useState(false);
  
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

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
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
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

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

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/[^0-9]/gi, '').slice(0, 4);
    }
    
    setPaymentData((prev) => ({ ...prev, [name]: formattedValue }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateStep1 = () => {
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    const cardNumberClean = paymentData.cardNumber.replace(/\s/g, '');
    if (!cardNumberClean) {
      newErrors.cardNumber = 'Número de tarjeta obligatorio';
    } else if (cardNumberClean.length < 15) {
      newErrors.cardNumber = 'Número de tarjeta inválido';
    }
    
    if (!paymentData.cardName.trim()) {
      newErrors.cardName = 'Nombre en tarjeta obligatorio';
    }
    
    if (!paymentData.expiryDate) {
      newErrors.expiryDate = 'Fecha de vencimiento obligatoria';
    } else if (paymentData.expiryDate.length !== 5) {
      newErrors.expiryDate = 'Formato: MM/AA';
    }
    
    if (!paymentData.cvv) {
      newErrors.cvv = 'CVV obligatorio';
    } else if (paymentData.cvv.length < 3) {
      newErrors.cvv = 'CVV debe tener 3-4 dígitos';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = async () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      
      // MODO DEMO: Crear un PaymentIntent simulado
      // TODO: En producción, esto debe hacerse con Firebase Functions
      if (!clientSecret && useStripePayment) {
        try {
          // Por ahora mostramos el formulario de Stripe sin clientSecret real
          // En producción, aquí llamarías a tu Cloud Function:
          // const response = await fetch('YOUR_CLOUD_FUNCTION_URL', { ... })
          console.log('Stripe Payment habilitado - Integrar con Firebase Functions para payment intent real');
        } catch (error) {
          console.error('Error creating payment intent:', error);
        }
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2 && !useStripePayment && validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Stripe Payment Handlers
  const handleStripeSuccess = async (paymentIntent) => {
    console.log('✅ Pago exitoso con Stripe:', paymentIntent);
    
    try {
      // Generate order number
      const orderNum = 'ORD-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 7).toUpperCase();
      
      // Prepare order data
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
      
      // Save to Firebase
      await saveOrderToFirebase(orderData);
      
      // Show success
      setOrderNumber(orderNum);
      setIsSubmitted(true);
      clearCart();
      
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
      setErrors({ submit: 'Pago exitoso pero error al guardar pedido. Contacta soporte.' });
    }
  };
  
  const handleStripeError = (error) => {
    console.error('❌ Error en Stripe:', error);
    setErrors({ payment: error.message || 'Error al procesar el pago' });
  };

  // Save order to Firebase Firestore
  const saveOrderToFirebase = async (orderData) => {
    try {
      const ordersRef = collection(db, 'orders');
      const docRef = await addDoc(ordersRef, {
        ...orderData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving order:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate legal acceptance
    if (!acceptedTerms) {
      setErrors({ terms: 'Debes aceptar los Términos y Condiciones' });
      return;
    }
    if (!acceptedPrivacy) {
      setErrors({ privacy: 'Debes aceptar la Política de Privacidad' });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Generate order number
      const orderNum = 'ORD-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 7).toUpperCase();
      
      // Prepare order data for Firebase
      const orderData = {
        orderNumber: orderNum,
        userId: user?.uid || 'guest',
        userEmail: user?.email || shippingData.email,
        status: 'pending', // pending, processing, shipped, delivered, cancelled
        
        // Shipping information
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
        
        // Payment information (only last 4 digits for security)
        payment: {
          method: 'credit_card', // TODO: Replace with actual payment gateway (stripe, paypal, apple_pay)
          cardLast4: paymentData.cardNumber.replace(/\s/g, '').slice(-4),
          cardName: paymentData.cardName,
          // NEVER store full card number or CVV
        },
        
        // Products
        products: cart.map(item => ({
          id: item.id,
          title: item.title,
          brand: item.brand,
          price: item.price,
          size: item.size,
          quantity: item.quantity,
          image: item.images ? item.images[0] : item.image,
        })),
        
        // Totals
        subtotal: total,
        shippingCost: shippingCosts[shippingMethod],
        total: finalTotal,
        
        // Legal acceptance
        legalAcceptance: {
          termsAccepted: acceptedTerms,
          privacyAccepted: acceptedPrivacy,
          acceptedAt: new Date().toISOString(),
        },
      };
      
      // Save to Firebase
      await saveOrderToFirebase(orderData);
      
      // Clear cart and show success
      setOrderNumber(orderNum);
      setIsSubmitted(true);
      clearCart();
      
      // TODO: Send confirmation email (implement with Firebase Functions or SendGrid)
      // TODO: Process actual payment with Stripe/PayPal API
      
    } catch (error) {
      console.error('Error processing order:', error);
      setErrors({ submit: 'Error al procesar el pedido. Por favor, inténtalo de nuevo.' });
      setIsProcessing(false);
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition"
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        <h1 className="text-4xl font-bold mb-8">Finalizar Compra</h1>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((step) => (
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
                {step < 3 && (
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
            <span className="text-sm font-medium">Confirmar</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
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

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Nombre completo *</label>
                        <input
                          type="text"
                          name="name"
                          autoComplete="name"
                          value={shippingData.name}
                          onChange={handleShippingChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
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
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
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
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
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
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
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
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
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
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
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
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
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
                    disabled={!validateStep1()}
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
                          Actualmente en <strong>MODO DEMO</strong> para probar la integración. 
                          Usa la tarjeta de prueba para completar el pago.
                        </p>
                        <div className="bg-white border border-gray-300 p-3 rounded text-sm">
                          <p className="font-semibold text-gray-800 mb-1">Tarjeta de Prueba Stripe:</p>
                          <p className="font-mono text-gray-600">4242 4242 4242 4242</p>
                          <p className="text-xs text-gray-500 mt-1">Vencimiento: 12/34 | CVV: 123</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stripe Checkout Component - MODO DEMO */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-4 text-center">
                      ⚠️ <strong>IMPORTANTE:</strong> Para activar pagos reales, necesitas configurar Firebase Functions 
                      para crear Payment Intents desde el backend (ver STRIPE_INTEGRATION_GUIDE.md)
                    </p>
                    
                    {/* Demo Message */}
                    <div className="bg-yellow-50 border-2 border-yellow-300 p-4 rounded-lg mb-4">
                      <p className="text-sm text-yellow-800">
                        <strong>🚧 Modo Demo:</strong> El componente StripeCheckout requiere un <code>clientSecret</code> 
                        generado desde el backend. Por ahora, usa el formulario manual abajo o configura Firebase Functions.
                      </p>
                    </div>
                  </div>

                  {/* Manual Card Form (Fallback) */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex-1 border-t border-gray-300"></div>
                      <span className="text-sm text-gray-500 font-semibold">Formulario Manual (Sin Stripe)</span>
                      <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Número de Tarjeta *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        autoComplete="cc-number"
                        placeholder="4242 4242 4242 4242 (Prueba)"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentChange}
                        maxLength="19"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                          errors.cardNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                        }`}
                        required
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.cardNumber}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Shield size={12} /> Este formulario NO procesa pagos reales (solo demo)
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Nombre en la Tarjeta *</label>
                      <input
                        type="text"
                        name="cardName"
                        autoComplete="cc-name"
                        placeholder="JUAN PEREZ"
                        value={paymentData.cardName}
                        onChange={handlePaymentChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                          errors.cardName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                        }`}
                        required
                      />
                      {errors.cardName && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.cardName}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Vencimiento *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          autoComplete="cc-exp"
                          placeholder="12/34"
                          value={paymentData.expiryDate}
                          onChange={handlePaymentChange}
                          maxLength="5"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                            errors.expiryDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                          }`}
                          required
                        />
                        {errors.expiryDate && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.expiryDate}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">CVV *</label>
                        <input
                          type="text"
                          name="cvv"
                          autoComplete="cc-csc"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={handlePaymentChange}
                          maxLength="4"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                            errors.cvv ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                          }`}
                          required
                        />
                        {errors.cvv && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.cvv}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">3 dígitos (4 para Amex)</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                      Atrás
                    </button>
                    <button
                      onClick={handleNextStep}
                      disabled={!validateStep2()}
                      className="flex-1 bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Revisar Pedido
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmación */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle2 className="text-black" size={28} />
                    <h2 className="text-2xl font-bold">Confirmar Pedido</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-bold mb-3 flex items-center gap-2">
                        <MapPin size={20} />
                        Dirección de Envío
                      </h3>
                      <p className="font-semibold">{shippingData.name}</p>
                      <p>{shippingData.address}</p>
                      <p>{shippingData.city}, {shippingData.state} {shippingData.zip}</p>
                      <p className="mt-2 text-gray-600">{shippingData.email}</p>
                      <p className="text-gray-600">{shippingData.phone}</p>
                      <p className="mt-3 text-sm font-semibold text-gray-700">
                        Envío: {shippingOptions.find(opt => opt.id === shippingMethod)?.name} 
                        ({shippingOptions.find(opt => opt.id === shippingMethod)?.time})
                      </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-bold mb-3 flex items-center gap-2">
                        <CreditCard size={20} />
                        Método de Pago
                      </h3>
                      <p className="font-mono">**** **** **** {paymentData.cardNumber.replace(/\s/g, '').slice(-4)}</p>
                      <p className="text-gray-600">{paymentData.cardName}</p>
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <Shield size={12} /> 
                        Pago seguro con cifrado SSL
                      </p>
                    </div>

                    {/* Legal Acceptance */}
                    <div className="bg-yellow-50 border-2 border-yellow-300 p-6 rounded-lg space-y-4">
                      <h3 className="font-bold mb-3 flex items-center gap-2">
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
                          de compra, incluyendo la política de devoluciones y garantía de autenticidad. *
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
                          y el tratamiento de mis datos personales conforme al RGPD. *
                        </span>
                      </label>
                      {errors.privacy && (
                        <p className="text-red-500 text-xs flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.privacy}
                        </p>
                      )}

                      <p className="text-xs text-gray-600 mt-3">
                        * Campos obligatorios. Al realizar el pedido, confirmas que has leído y aceptado nuestros 
                        términos legales. Tus datos serán almacenados de forma segura y nunca compartidos con terceros 
                        sin tu consentimiento.
                      </p>
                    </div>
                  </div>

                  {errors.submit && (
                    <div className="bg-red-50 border-2 border-red-500 p-4 rounded-lg mt-6 flex items-center gap-2 text-red-700">
                      <AlertCircle size={20} />
                      <span>{errors.submit}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="flex gap-4 mt-8">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        disabled={isProcessing}
                        className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Atrás
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing || !acceptedTerms || !acceptedPrivacy}
                        className="flex-1 bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Procesando...
                          </>
                        ) : (
                          <>
                            <Shield size={20} />
                            Confirmar y Pagar {finalTotal.toFixed(2)} €
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </div>
          </div>

          {/* Resumen del Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
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
