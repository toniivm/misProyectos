import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Database, Eye, UserCheck, Globe } from 'lucide-react';

const PrivacyPolicy = () => {
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
            <Shield className="text-black" size={32} />
            <h1 className="text-4xl font-bold">Política de Privacidad</h1>
          </div>
          <p className="text-gray-600 mb-8">Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
            <p className="text-sm text-blue-900">
              En VALTREX respetamos tu privacidad y nos comprometemos a proteger tus datos personales conforme al 
              Reglamento General de Protección de Datos (RGPD) de la UE y la Ley Orgánica de Protección de Datos (LOPD).
            </p>
          </div>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <UserCheck className="text-black" size={24} />
                <h2 className="text-2xl font-bold text-black">1. Responsable del Tratamiento</h2>
              </div>
              <ul className="list-none space-y-2 bg-gray-50 p-4 rounded-lg">
                <li><strong>Identidad:</strong> VALTREX E-COMMERCE S.L.</li>
                <li><strong>NIF:</strong> B-12345678</li>
                <li><strong>Dirección:</strong> Calle Serrano 45, 28001 Madrid, España</li>
                <li><strong>Email:</strong> privacy@valtrex.com</li>
                <li><strong>DPO (Delegado de Protección de Datos):</strong> dpo@valtrex.com</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Database className="text-black" size={24} />
                <h2 className="text-2xl font-bold text-black">2. Datos que Recopilamos</h2>
              </div>
              <p className="mb-3">Recopilamos y procesamos los siguientes tipos de datos personales:</p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-black pl-4">
                  <h3 className="font-bold mb-2">2.1. Datos de Identificación y Contacto</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Nombre y apellidos</li>
                    <li>Dirección de email</li>
                    <li>Número de teléfono</li>
                    <li>Dirección postal completa</li>
                  </ul>
                </div>

                <div className="border-l-4 border-black pl-4">
                  <h3 className="font-bold mb-2">2.2. Datos de Cuenta</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Credenciales de acceso (email/contraseña encriptada)</li>
                    <li>Historial de compras</li>
                    <li>Preferencias de usuario</li>
                    <li>Lista de deseos</li>
                  </ul>
                </div>

                <div className="border-l-4 border-black pl-4">
                  <h3 className="font-bold mb-2">2.3. Datos de Pago</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Últimos 4 dígitos de tarjeta (los datos completos se procesan mediante pasarela segura)</li>
                    <li>Método de pago utilizado</li>
                    <li>Historial de transacciones</li>
                  </ul>
                  <p className="text-sm italic mt-2">
                    ⚠️ Nunca almacenamos datos completos de tarjetas bancarias ni CVV. El procesamiento se realiza 
                    mediante proveedores certificados PCI-DSS.
                  </p>
                </div>

                <div className="border-l-4 border-black pl-4">
                  <h3 className="font-bold mb-2">2.4. Datos de Navegación</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Dirección IP</li>
                    <li>Tipo de navegador y dispositivo</li>
                    <li>Páginas visitadas y tiempo de permanencia</li>
                    <li>Cookies y tecnologías similares</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Eye className="text-black" size={24} />
                <h2 className="text-2xl font-bold text-black">3. Finalidad del Tratamiento</h2>
              </div>
              <p className="mb-3">Utilizamos tus datos personales para las siguientes finalidades:</p>
              
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">3.1. Ejecución del Contrato (Base Legal: Contrato)</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Procesar pedidos y pagos</li>
                    <li>Gestionar envíos y entregas</li>
                    <li>Gestionar devoluciones y reembolsos</li>
                    <li>Atención al cliente y soporte</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">3.2. Interés Legítimo</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Prevención de fraude y seguridad</li>
                    <li>Análisis de datos y mejora del servicio</li>
                    <li>Gestión de reclamaciones</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">3.3. Consentimiento (Puedes revocarlo en cualquier momento)</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Envío de newsletters y ofertas promocionales</li>
                    <li>Marketing personalizado</li>
                    <li>Comunicaciones comerciales por email/SMS</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">3.4. Obligación Legal</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Emisión de facturas (obligación fiscal)</li>
                    <li>Conservación de datos contables</li>
                    <li>Cumplimiento de requerimientos legales</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Lock className="text-black" size={24} />
                <h2 className="text-2xl font-bold text-black">4. Conservación de Datos</h2>
              </div>
              <p className="mb-3">Conservamos tus datos personales durante:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Datos de cuenta:</strong> Mientras mantengas la cuenta activa + 5 años tras cierre</li>
                <li><strong>Datos de pedidos:</strong> 5 años desde la compra (obligación fiscal)</li>
                <li><strong>Datos de marketing:</strong> Hasta revocación del consentimiento + 1 año</li>
                <li><strong>Datos de navegación:</strong> Máximo 2 años</li>
              </ul>
              <p className="mt-3 text-sm italic">
                Tras estos periodos, los datos se eliminan de forma segura o se anonimizan para estadísticas.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="text-black" size={24} />
                <h2 className="text-2xl font-bold text-black">5. Destinatarios de los Datos</h2>
              </div>
              <p className="mb-3">Compartimos tus datos únicamente con los siguientes terceros necesarios:</p>
              
              <div className="space-y-3">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <h3 className="font-bold mb-2">Proveedores de Servicios Esenciales</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li><strong>Pasarelas de pago:</strong> Stripe, PayPal (certificados PCI-DSS)</li>
                    <li><strong>Servicios de envío:</strong> Correos, SEUR, DHL</li>
                    <li><strong>Hosting y almacenamiento:</strong> Firebase (Google Cloud)</li>
                    <li><strong>Email marketing:</strong> Mailchimp, SendGrid</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <h3 className="font-bold mb-2">Transferencias Internacionales</h3>
                  <p className="text-sm">
                    Algunos proveedores (Google, Stripe) pueden procesar datos fuera del EEE. Estas transferencias 
                    están protegidas mediante Cláusulas Contractuales Tipo aprobadas por la Comisión Europea o 
                    mecanismos equivalentes.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">6. Tus Derechos (RGPD)</h2>
              <p className="mb-3">Como usuario, tienes los siguientes derechos sobre tus datos personales:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">✓ Derecho de Acceso</h3>
                  <p className="text-sm">Obtener copia de tus datos personales</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">✓ Derecho de Rectificación</h3>
                  <p className="text-sm">Corregir datos inexactos o incompletos</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">✓ Derecho de Supresión</h3>
                  <p className="text-sm">Solicitar la eliminación de tus datos</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">✓ Derecho de Portabilidad</h3>
                  <p className="text-sm">Recibir tus datos en formato estructurado</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">✓ Derecho de Oposición</h3>
                  <p className="text-sm">Oponerte al tratamiento de marketing</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">✓ Derecho de Limitación</h3>
                  <p className="text-sm">Restringir el procesamiento de tus datos</p>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
                <h3 className="font-bold mb-2">¿Cómo ejercer tus derechos?</h3>
                <p className="text-sm mb-2">
                  Puedes ejercer cualquiera de estos derechos enviando un email a: <strong>privacy@valtrex.com</strong>
                </p>
                <p className="text-sm">
                  Responderemos en un plazo máximo de 1 mes. Si no estás satisfecho, puedes reclamar ante la 
                  Agencia Española de Protección de Datos (AEPD): <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.aepd.es</a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">7. Cookies y Tecnologías de Rastreo</h2>
              <p className="mb-3">Utilizamos cookies y tecnologías similares para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Cookies esenciales:</strong> Funcionamiento básico del sitio (carrito, sesión)</li>
                <li><strong>Cookies analíticas:</strong> Google Analytics para entender el uso del sitio</li>
                <li><strong>Cookies de marketing:</strong> Publicidad personalizada (requiere consentimiento)</li>
              </ul>
              <p className="mt-3 text-sm">
                Puedes gestionar tus preferencias de cookies desde la configuración de tu navegador o mediante nuestro 
                banner de cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">8. Seguridad de los Datos</h2>
              <p className="mb-3">Implementamos medidas técnicas y organizativas para proteger tus datos:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cifrado SSL/TLS en todas las comunicaciones</li>
                <li>Contraseñas encriptadas con bcrypt</li>
                <li>Firewalls y sistemas de detección de intrusiones</li>
                <li>Acceso restringido a datos personales (principio de necesidad)</li>
                <li>Auditorías de seguridad periódicas</li>
                <li>Planes de respuesta ante brechas de seguridad</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">9. Menores de Edad</h2>
              <p>
                VALTREX no está dirigido a menores de 16 años. No recopilamos conscientemente datos de menores. 
                Si eres padre/madre/tutor y descubres que tu hijo ha proporcionado datos, contacta con nosotros 
                para proceder a su eliminación inmediata.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">10. Modificaciones de la Política</h2>
              <p>
                Nos reservamos el derecho de actualizar esta Política de Privacidad. Te notificaremos los cambios 
                materiales por email o mediante aviso en el sitio web. La fecha de "última actualización" indica 
                cuándo se realizó la última modificación.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">11. Contacto</h2>
              <p className="mb-3">Para cualquier consulta sobre privacidad o protección de datos:</p>
              <ul className="list-none space-y-2 bg-gray-50 p-4 rounded-lg">
                <li><strong>Email de Privacidad:</strong> privacy@valtrex.com</li>
                <li><strong>DPO (Delegado de Protección de Datos):</strong> dpo@valtrex.com</li>
                <li><strong>Teléfono:</strong> +34 900 123 456</li>
                <li><strong>Dirección Postal:</strong> Calle Serrano 45, 28001 Madrid, España</li>
              </ul>
            </section>

            <div className="border-t pt-8 mt-12">
              <p className="text-sm text-gray-600">
                Al utilizar VALTREX, aceptas esta Política de Privacidad y el tratamiento de tus datos conforme a lo 
                descrito. Si no estás de acuerdo, por favor no utilices nuestros servicios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
