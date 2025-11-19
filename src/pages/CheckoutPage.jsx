import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Truck, MapPin, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, total } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [shippingData, setShippingData] = useState({
    name: '',
    email: '',
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

  const handleShippingChange = (e) => {
    setShippingData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePaymentChange = (e) => {
    setPaymentData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateStep1 = () => {
    return Object.values(shippingData).every(value => value.trim() !== '');
  };

  const validateStep2 = () => {
    return Object.values(paymentData).every(value => value.trim() !== '');
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simular procesamiento de pago
    setTimeout(() => {
      navigate('/');
    }, 5000);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          className="bg-white p-12 rounded-2xl shadow-xl text-center max-w-md"
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
            <p className="text-xl font-bold">#ORD-{Math.floor(Math.random() * 100000)}</p>
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
                          value={shippingData.name}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={shippingData.email}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Teléfono *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingData.phone}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Dirección *</label>
                      <input
                        type="text"
                        name="address"
                        value={shippingData.address}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Ciudad *</label>
                        <input
                          type="text"
                          name="city"
                          value={shippingData.city}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Provincia *</label>
                        <input
                          type="text"
                          name="state"
                          value={shippingData.state}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">CP *</label>
                        <input
                          type="text"
                          name="zip"
                          value={shippingData.zip}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          required
                        />
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

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Número de Tarjeta *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentChange}
                        maxLength="19"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Nombre en la Tarjeta *</label>
                      <input
                        type="text"
                        name="cardName"
                        placeholder="Juan Pérez"
                        value={paymentData.cardName}
                        onChange={handlePaymentChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Fecha de Vencimiento *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={handlePaymentChange}
                          maxLength="5"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">CVV *</label>
                        <input
                          type="text"
                          name="cvv"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={handlePaymentChange}
                          maxLength="4"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          required
                        />
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
                      <h3 className="font-bold mb-3">Dirección de Envío</h3>
                      <p>{shippingData.name}</p>
                      <p>{shippingData.address}</p>
                      <p>{shippingData.city}, {shippingData.state} {shippingData.zip}</p>
                      <p className="mt-2 text-gray-600">{shippingData.email}</p>
                      <p className="text-gray-600">{shippingData.phone}</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-bold mb-3">Método de Pago</h3>
                      <p>**** **** **** {paymentData.cardNumber.slice(-4)}</p>
                      <p>{paymentData.cardName}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="flex gap-4 mt-8">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
                      >
                        Atrás
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition"
                      >
                        Confirmar y Pagar
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
