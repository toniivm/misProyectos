import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, AlertTriangle, Shield, DollarSign, Truck, RotateCcw, CheckCircle, Gavel } from 'lucide-react';

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition"
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="text-black" size={32} />
            <h1 className="text-4xl font-bold">Términos y Condiciones</h1>
          </div>
          <p className="text-gray-600 mb-8">Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-sm text-red-900">
              Al acceder y utilizar VALTREX, aceptas estar completamente vinculado por estos Términos y Condiciones. 
              Si no aceptas alguna parte, no debes utilizar nuestros servicios.
            </p>
          </div>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="text-black" size={24} />
                <h2 className="text-2xl font-bold text-black">1. Aceptación de los Términos</h2>
              </div>
              <p>
                Al acceder y utilizar VALTREX ("nosotros", "nuestro", "la plataforma"), usted ("usuario", "cliente" o "consumidor") 
                acepta estar sujeto a estos Términos y Condiciones de Servicio en su totalidad. Si no está de acuerdo con alguna parte 
                de estos términos, no debe utilizar nuestros servicios. El uso continuado de la plataforma implica aceptación de estos términos.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="text-black" size={24} />
                <h2 className="text-2xl font-bold text-black">2. Descripción del Servicio</h2>
              </div>
              <p className="mb-3">
                VALTREX es una plataforma de comercio electrónico especializada en la venta de sneakers, zapatillas deportivas 
                y bolsos de lujo de marcas premium auténticas y verificadas. Nuestros servicios incluyen:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Catálogo de productos auténticos sometidos a verificación profesional</li>
                <li>Servicio de carrito de compra y checkout seguro</li>
                <li>Procesamiento de pagos mediante pasarelas certificadas</li>
                <li>Envío nacional e internacional con múltiples opciones</li>
                <li>Garantía de autenticidad del 100% o reembolso completo</li>
                <li>Atención al cliente especializada y resolución de reclamaciones</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">3. Cuenta de Usuario</h2>
              <p className="mb-3">
                Para realizar compras en VALTREX, debes crear una cuenta proporcionando información veraz, completa y actualizada. 
                Eres responsable de:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Mantener la confidencialidad de tu contraseña y no compartirla con terceros</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Todas las actividades realizadas bajo tu cuenta</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Notificarnos inmediatamente ante cualquier uso no autorizado o acceso sospechoso</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Proporcionar datos de contacto, envío y pago correctos y actualizados</p>
                </div>
              </div>
              <p className="mt-3 text-sm italic">
                No seremos responsables por pérdidas causadas por acceso no autorizado a tu cuenta debido a contraseña débil o compartida.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="text-black" size={24} />
                <h2 className="text-2xl font-bold text-black">4. Autenticidad y Productos</h2>
              </div>
              <p className="mb-3">
                Todos los productos listados en VALTREX son 100% auténticos:
              </p>
              <div className="space-y-3">
                <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded">
                  <h3 className="font-bold mb-1">✓ Verificación de Autenticidad</h3>
                  <p className="text-sm">
                    Cada producto es verificado mediante procesos profesionales independientes antes de ofrecerse a la venta.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded">
                  <h3 className="font-bold mb-1">✓ Garantía de Autenticidad</h3>
                  <p className="text-sm">
                    En caso de que un producto no sea auténtico, ofrecemos reembolso completo + compensación equivalente al 20% del precio.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded">
                  <h3 className="font-bold mb-1">✓ Precios y Disponibilidad</h3>
                  <p className="text-sm">
                    Los precios se muestran en euros (€) e incluyen IVA aplicable. Nos reservamos el derecho de modificar precios sin previo aviso. 
                    La disponibilidad está sujeta a stock en tiempo real.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="text-black" size={24} />
                <h2 className="text-2xl font-bold text-black">5. Proceso de Compra y Pago</h2>
              </div>
              <p className="mb-3">
                Nuestro proceso de compra es seguro y transparente:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Selecciona productos, talla, cantidad y método de envío</li>
                <li>Revisa tu carrito y procede al checkout</li>
                <li>Proporciona datos de envío y método de pago</li>
                <li>Recibe confirmación inmediata del pedido por email</li>
                <li>El contrato de venta se perfecciona cuando aceptamos tu pedido</li>
              </ul>
              <p className="mt-3">
                <strong>Métodos de pago aceptados:</strong> Tarjetas de crédito/débito (Visa, Mastercard), Apple Pay, Google Pay, PayPal, 
                y transferencia bancaria para pedidos especiales.
              </p>
              <p className="mt-2 text-sm italic">
                Todos los pagos se procesan mediante pasarelas certificadas PCI-DSS con cifrado SSL/TLS. Nunca almacenamos datos completos de tarjetas.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Truck className="text-black" size={24} />
                <h2 className="text-2xl font-bold text-black">6. Envío y Entrega</h2>
              </div>
              <p className="mb-3">Ofrecemos tres opciones de envío:</p>
              
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold flex items-center gap-2">
                    <Truck size={18} />
                    Envío Estándar
                  </h3>
                  <p className="text-sm mt-2"><strong>Coste:</strong> Gratis (pedidos +100€), 4.99€ en otros casos</p>
                  <p className="text-sm"><strong>Plazo:</strong> 5-7 días laborables</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-bold flex items-center gap-2">
                    <Truck size={18} />
                    Envío Express
                  </h3>
                  <p className="text-sm mt-2"><strong>Coste:</strong> 9.99€</p>
                  <p className="text-sm"><strong>Plazo:</strong> 2-3 días laborables</p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <h3 className="font-bold flex items-center gap-2">
                    <Truck size={18} />
                    Envío Urgente
                  </h3>
                  <p className="text-sm mt-2"><strong>Coste:</strong> 19.99€</p>
                  <p className="text-sm"><strong>Plazo:</strong> 24-48 horas (solo en días laborables)</p>
                </div>
              </div>

              <p className="mt-4">
                El envío se realiza a la dirección proporcionada durante el checkout. VALTREX no es responsable de direcciones 
                incorrectas suministradas por el cliente. Se proporciona número de seguimiento para todos los envíos.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <RotateCcw className="text-black" size={24} />
                <h2 className="text-2xl font-bold text-black">7. Derecho de Desistimiento (14 días)</h2>
              </div>
              <p className="mb-3">
                Conforme a la Directiva 2011/83/UE, tienes derecho a desistir de tu compra en un plazo de 14 días desde la recepción 
                del producto sin necesidad de justificación:
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-3">
                <h3 className="font-bold mb-2">✓ Condiciones para la devolución:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>El producto debe estar en estado original sin signos de uso</li>
                  <li>Con embalaje, etiquetas, protecciones y accesorios intactos</li>
                  <li>Sin olores, manchas, deformaciones o cambios en la condición</li>
                  <li>El cliente asume los costes de envío de devolución</li>
                  <li>Reembolso procesado en 14 días tras recibir la devolución</li>
                </ul>
              </div>

              <p className="text-sm">
                <strong>Excepciones al derecho de desistimiento:</strong> Productos personalizados, artículos con defectos de fábrica 
                que desees mantener (pero que se cambian sin coste), o ropa interior por razones de higiene.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">8. Garantía de Conformidad</h2>
              <p className="mb-3">
                Todos los productos se venden en conformidad con los estándares legales europeos. Ofrecemos:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Defectos de fábrica:</strong> Cambio gratuito o reembolso dentro de 30 días</li>
                <li><strong>Problema de autenticidad:</strong> Reembolso completo + 20% de compensación</li>
                <li><strong>Garantía del fabricante:</strong> Se transfiere al cliente cuando aplicable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">9. Responsabilidades del Usuario</h2>
              <p className="mb-3">
                No debes utilizar VALTREX para:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Realizar transacciones fraudulentas o con datos de terceros</li>
                <li>Revender productos para actividades ilícitas</li>
                <li>Infringir derechos de propiedad intelectual</li>
                <li>Acosar, amenazar o abusar de otros usuarios o personal</li>
                <li>Intentar acceder no autorizadamente a sistemas o datos</li>
                <li>Realizar spam, estafas o phishing</li>
              </ul>
              <p className="mt-3">
                VALTREX se reserva el derecho de suspender o cancelar cuentas que violen estos términos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">10. Limitación de Responsabilidad</h2>
              <p className="mb-3">
                En la máxima medida permitida por la ley:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>VALTREX proporciona la plataforma "tal cual" sin garantías adicionales</li>
                <li>No seremos responsables por daños indirectos, incidentales o consecuentes</li>
                <li>Nuestra responsabilidad máxima se limita al precio de compra del producto en cuestión</li>
                <li>No seremos responsables por interrupciones del servicio fuera de nuestro control</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">11. Propiedad Intelectual</h2>
              <p>
                Todo el contenido de VALTREX, incluyendo textos, imágenes, logos, diseños, código y gráficos, está protegido 
                por derechos de autor, marcas registradas y otras leyes de propiedad intelectual. Queda prohibida la reproducción, 
                distribución, modificación o transmisión sin autorización expresa por escrito de VALTREX.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">12. Modificaciones de los Términos</h2>
              <p>
                VALTREX se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios 
                materiales entrarán en vigor inmediatamente tras su publicación en esta página y serán notificados por email 
                a usuarios registrados. El uso continuado de la plataforma implica la aceptación de los términos modificados.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Gavel className="text-black" size={24} />
                <h2 className="text-2xl font-bold text-black">13. Ley Aplicable y Resolución de Conflictos</h2>
              </div>
              <p className="mb-3">
                Estos Términos y Condiciones se rigen por la legislación española y europea aplicable, 
                incluyendo el Código Civil, Ley de Comercio Electrónico y Directiva de Comercio Electrónico.
              </p>
              <p className="mb-3">
                Para la resolución de conflictos, las partes se someten a la jurisdicción de los juzgados y tribunales 
                de Madrid, España, renunciando a cualquier otro fuero. En caso de disputas de consumidor, puedes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Contactar directamente con nuestro servicio de atención al cliente</li>
                <li>Recurrir a mediación de consumidor gratuita (organismos de tu región)</li>
                <li>Acudir a los juzgados de lo mercantil si es necesario</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">14. Contacto y Atención al Cliente</h2>
              <p className="mb-3">
                Para cualquier consulta, reclamación o ejercicio de derechos como consumidor:
              </p>
              <ul className="list-none space-y-2 bg-gray-50 p-4 rounded-lg">
                <li><strong>📧 Email de soporte:</strong> support@valtrex.com</li>
                <li><strong>⚖️ Email legal:</strong> legal@valtrex.com</li>
                <li><strong>📞 Teléfono:</strong> +34 900 123 456 (Lunes-Viernes 9:00-18:00 CET)</li>
                <li><strong>📍 Dirección:</strong> Calle Serrano 45, 28001 Madrid, España</li>
                <li><strong>🌐 Formulario de contacto:</strong> Disponible en la plataforma</li>
              </ul>
            </section>

            <div className="border-t pt-8 mt-12 bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-black mb-3">📋 Resumen de tus Derechos como Consumidor</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>✓ Derecho a desistir en 14 días sin penalización</li>
                <li>✓ Garantía de conformidad por defectos de fábrica</li>
                <li>✓ Garantía de autenticidad del 100%</li>
                <li>✓ Protección de datos personales conforme a RGPD</li>
                <li>✓ Acceso a información clara y transparente</li>
              </ul>
            </div>

            <div className="border-t pt-8 mt-12">
              <p className="text-sm text-gray-600">
                <strong>Aviso importante:</strong> Al realizar una compra en VALTREX, confirmas que has leído, comprendido 
                y aceptado completamente estos Términos y Condiciones, así como nuestra Política de Privacidad. 
                Si tienes dudas, no dudes en contactarnos antes de finalizar tu compra.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
