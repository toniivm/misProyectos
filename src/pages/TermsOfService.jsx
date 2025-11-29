import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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
          <h1 className="text-4xl font-bold mb-2">Términos y Condiciones</h1>
          <p className="text-gray-600 mb-8">Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar VALTREX ("nosotros", "nuestro" o "la plataforma"), usted ("usuario" o "cliente") 
                acepta estar sujeto a estos Términos y Condiciones de Servicio. Si no está de acuerdo con alguna parte 
                de estos términos, no debe utilizar nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">2. Descripción del Servicio</h2>
              <p className="mb-3">
                VALTREX es una plataforma de comercio electrónico especializada en la venta de zapatillas deportivas 
                auténticas de marcas premium. Ofrecemos:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Venta de productos auténticos verificados</li>
                <li>Servicio de envío nacional e internacional</li>
                <li>Garantía de autenticidad 100%</li>
                <li>Atención al cliente especializada</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">3. Cuenta de Usuario</h2>
              <p className="mb-3">
                Para realizar compras, debes crear una cuenta proporcionando información veraz y actualizada. Eres responsable de:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Mantener la confidencialidad de tu contraseña</li>
                <li>Todas las actividades realizadas bajo tu cuenta</li>
                <li>Notificarnos inmediatamente ante cualquier uso no autorizado</li>
                <li>Proporcionar datos de contacto y envío correctos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">4. Productos y Precios</h2>
              <p className="mb-3">
                Todos los productos listados en VALTREX son auténticos y han sido verificados por nuestro equipo:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Los precios se muestran en euros (€) e incluyen IVA</li>
                <li>Nos reservamos el derecho de modificar precios sin previo aviso</li>
                <li>Los gastos de envío se calculan durante el proceso de compra</li>
                <li>Las imágenes son representativas; pueden existir ligeras variaciones</li>
                <li>Disponibilidad sujeta a stock; confirmación tras el pedido</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">5. Proceso de Compra</h2>
              <p className="mb-3">
                Al realizar un pedido en VALTREX:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Debes seleccionar talla, cantidad y método de envío</li>
                <li>Recibirás confirmación del pedido por email</li>
                <li>El contrato se perfecciona cuando aceptamos tu pedido</li>
                <li>Nos reservamos el derecho de rechazar pedidos fraudulentos</li>
                <li>El tiempo de procesamiento es de 1-3 días laborables</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">6. Métodos de Pago</h2>
              <p className="mb-3">
                Aceptamos los siguientes métodos de pago seguros:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Tarjetas de crédito y débito (Visa, Mastercard)</li>
                <li>Apple Pay y Google Pay</li>
                <li>PayPal</li>
                <li>Transferencia bancaria (pedidos especiales)</li>
              </ul>
              <p className="mt-3">
                Todos los pagos se procesan mediante pasarelas seguras con cifrado SSL. No almacenamos datos completos 
                de tarjetas bancarias.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">7. Envío y Entrega</h2>
              <p className="mb-3">
                Opciones de envío disponibles:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Estándar (Gratis en pedidos +100€):</strong> 5-7 días laborables</li>
                <li><strong>Express (9.99€):</strong> 2-3 días laborables</li>
                <li><strong>Urgente (19.99€):</strong> 24-48 horas</li>
              </ul>
              <p className="mt-3">
                El envío se realiza a la dirección proporcionada durante el checkout. No nos responsabilizamos por 
                direcciones incorrectas proporcionadas por el cliente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">8. Derecho de Desistimiento (14 días)</h2>
              <p className="mb-3">
                Conforme a la legislación europea, tienes derecho a devolver el producto en un plazo de 14 días desde 
                la recepción sin necesidad de justificación:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>El producto debe estar en su estado original</li>
                <li>Con embalaje, etiquetas y accesorios intactos</li>
                <li>Sin signos de uso o desgaste</li>
                <li>El cliente asume los costes de devolución</li>
                <li>Reembolso en 14 días tras recibir la devolución</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">9. Garantía y Autenticidad</h2>
              <p className="mb-3">
                VALTREX garantiza la autenticidad del 100% de sus productos:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Todos los productos son originales de marca</li>
                <li>Verificación mediante procesos de autenticación profesionales</li>
                <li>En caso de producto no auténtico: reembolso completo + compensación</li>
                <li>Garantía del fabricante según corresponda</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">10. Limitación de Responsabilidad</h2>
              <p>
                VALTREX no será responsable por daños indirectos, incidentales o consecuentes derivados del uso de 
                nuestros productos o servicios. Nuestra responsabilidad máxima se limita al precio de compra del producto.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">11. Propiedad Intelectual</h2>
              <p>
                Todo el contenido de VALTREX (textos, imágenes, logos, diseños) está protegido por derechos de autor 
                y marcas registradas. Queda prohibida su reproducción sin autorización expresa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">12. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios 
                entrarán en vigor inmediatamente tras su publicación en esta página. El uso continuado de la plataforma 
                implica la aceptación de los términos modificados.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">13. Ley Aplicable y Jurisdicción</h2>
              <p>
                Estos términos se rigen por la legislación española y europea aplicable. Para la resolución de 
                controversias, las partes se someten a los juzgados y tribunales de Madrid, España, renunciando a 
                cualquier otro fuero que pudiera corresponderles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">14. Contacto</h2>
              <p>
                Para cualquier consulta sobre estos Términos y Condiciones, puedes contactarnos:
              </p>
              <ul className="list-none space-y-2 mt-3">
                <li><strong>Email:</strong> legal@valtrex.com</li>
                <li><strong>Teléfono:</strong> +34 900 123 456</li>
                <li><strong>Dirección:</strong> Calle Serrano 45, 28001 Madrid, España</li>
              </ul>
            </section>

            <div className="border-t pt-8 mt-12">
              <p className="text-sm text-gray-600">
                Al realizar una compra en VALTREX, confirmas que has leído, comprendido y aceptado estos Términos y 
                Condiciones en su totalidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
