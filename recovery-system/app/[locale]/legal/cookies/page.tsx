'use client'
import { useLocale } from 'next-intl'

export default function CookiesPage() {
  const locale = useLocale();
  const isEs = String(locale || '').toLowerCase().startsWith('es');
  return (
    <div className="mx-auto max-w-4xl p-8 bg-[#0c1016] text-[#f4f1ea] min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        {isEs ? 'Política de Cookies' : 'Cookie Policy'}
      </h1>

      <p className="mb-6 text-sm text-[#8791a1]">
        {isEs
          ? 'De conformidad con la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), informamos sobre el uso de cookies en este sitio web.'
          : 'In compliance with Law 34/2002, of July 11, on Information Society Services and Electronic Commerce (LSSI-CE), we inform about the use of cookies on this website.'}
      </p>

      <h2 className="font-semibold mt-8 text-lg">
        {isEs ? '1. ¿Qué son las cookies?' : '1. What are cookies?'}
      </h2>
      <p className="text-sm text-[#8791a1] mt-2 leading-relaxed">
        {isEs
          ? 'Las cookies son pequeños archivos de texto que los sitios web almacenan en tu navegador cuando los visitas. Permiten que el sitio recuerde información sobre tu visita, como tu idioma preferido y otras opciones, lo que puede facilitar tu próxima visita y hacer que el sitio te resulte más útil.'
          : 'Cookies are small text files that websites store in your browser when you visit them. They allow the site to remember information about your visit, such as your preferred language and other options, which can make your next visit easier and the site more useful to you.'}
      </p>

      <h2 className="font-semibold mt-8 text-lg">
        {isEs ? '2. Tipos de cookies que utilizamos' : '2. Types of cookies we use'}
      </h2>
      <p className="text-sm text-[#8791a1] mt-2 leading-relaxed">
        {isEs
          ? 'Este sitio web utiliza los siguientes tipos de cookies:'
          : 'This website uses the following types of cookies:'}
      </p>

      <h3 className="font-medium mt-4 text-sm text-[#c8d4e2]">
        {isEs ? '2.1 Cookies técnicas (esenciales)' : '2.1 Technical cookies (essential)'}
      </h3>
      <p className="text-sm text-[#8791a1] mt-1 leading-relaxed">
        {isEs
          ? 'Son necesarias para el funcionamiento básico del sitio. Permiten la navegación, el acceso a áreas seguras y el uso de elementos de seguridad. Sin estas cookies, el sitio no puede funcionar correctamente.'
          : 'They are necessary for the basic functioning of the site. They enable navigation, access to secure areas, and the use of security elements. Without these cookies, the site cannot function properly.'}
      </p>
      <ul className="list-disc ml-6 mt-2 text-sm text-[#8791a1] space-y-1">
        <li>{isEs ? 'Cookie de sesión: mantiene tu sesión iniciada durante la navegación.' : 'Session cookie: keeps you logged in while browsing.'}</li>
        <li>{isEs ? 'Cookie de carrito: recuerda los productos añadidos al carrito.' : 'Cart cookie: remembers products added to the cart.'}</li>
        <li>{isEs ? 'Cookie de preferencia de idioma: almacena el idioma seleccionado (ES/EN).' : 'Language preference cookie: stores the selected language (ES/EN).'}</li>
        <li>{isEs ? 'Cookie de consentimiento: registra si has aceptado o rechazado las cookies.' : 'Consent cookie: records whether you have accepted or rejected cookies.'}</li>
      </ul>

      <h3 className="font-medium mt-4 text-sm text-[#c8d4e2]">
        {isEs ? '2.2 Cookies de análisis' : '2.2 Analytics cookies'}
      </h3>
      <p className="text-sm text-[#8791a1] mt-1 leading-relaxed">
        {isEs
          ? 'Utilizamos cookies de análisis para recopilar información anónima sobre cómo los visitantes usan nuestro sitio. Esto nos ayuda a mejorar la experiencia de navegación. Estas cookies no recopilan información que identifique personalmente al visitante.'
          : 'We use analytics cookies to collect anonymous information about how visitors use our site. This helps us improve the browsing experience. These cookies do not collect information that personally identifies the visitor.'}
      </p>

      <h3 className="font-medium mt-4 text-sm text-[#c8d4e2]">
        {isEs ? '2.3 Cookies de terceros' : '2.3 Third-party cookies'}
      </h3>
      <p className="text-sm text-[#8791a1] mt-1 leading-relaxed">
        {isEs
          ? 'Algunos servicios de terceros que utilizamos (como Stripe para pagos y Firebase para autenticación) pueden establecer sus propias cookies. Estas cookies son gestionadas por dichos terceros y están sujetas a sus propias políticas de privacidad.'
          : 'Some third-party services we use (such as Stripe for payments and Firebase for authentication) may set their own cookies. These cookies are managed by those third parties and are subject to their own privacy policies.'}
      </p>

      <h2 className="font-semibold mt-8 text-lg">
        {isEs ? '3. Cookies utilizadas en este sitio' : '3. Cookies used on this site'}
      </h2>
      <div className="overflow-x-auto mt-3">
        <table className="w-full text-sm border border-white/[0.07] rounded-lg overflow-hidden">
          <thead className="bg-white/[0.03]">
            <tr>
              <th className="text-left p-3 text-[#c8d4e2] font-medium">{isEs ? 'Nombre' : 'Name'}</th>
              <th className="text-left p-3 text-[#c8d4e2] font-medium">{isEs ? 'Tipo' : 'Type'}</th>
              <th className="text-left p-3 text-[#c8d4e2] font-medium">{isEs ? 'Duración' : 'Duration'}</th>
              <th className="text-left p-3 text-[#c8d4e2] font-medium">{isEs ? 'Finalidad' : 'Purpose'}</th>
            </tr>
          </thead>
          <tbody className="text-[#8791a1]">
            <tr className="border-t border-white/[0.05]">
              <td className="p-3">dev_user</td>
              <td className="p-3">{isEs ? 'Técnica' : 'Technical'}</td>
              <td className="p-3">{isEs ? 'Sesión' : 'Session'}</td>
              <td className="p-3">{isEs ? 'Mantiene la sesión del usuario' : 'Maintains user session'}</td>
            </tr>
            <tr className="border-t border-white/[0.05]">
              <td className="p-3">cart_items</td>
              <td className="p-3">{isEs ? 'Técnica' : 'Technical'}</td>
              <td className="p-3">{isEs ? 'Sesión' : 'Session'}</td>
              <td className="p-3">{isEs ? 'Almacena los productos del carrito' : 'Stores cart products'}</td>
            </tr>
            <tr className="border-t border-white/[0.05]">
              <td className="p-3">locale_pref</td>
              <td className="p-3">{isEs ? 'Técnica' : 'Technical'}</td>
              <td className="p-3">1 {isEs ? 'año' : 'year'}</td>
              <td className="p-3">{isEs ? 'Recuerda el idioma preferido' : 'Remembers preferred language'}</td>
            </tr>
            <tr className="border-t border-white/[0.05]">
              <td className="p-3">cookie_consent</td>
              <td className="p-3">{isEs ? 'Técnica' : 'Technical'}</td>
              <td className="p-3">1 {isEs ? 'año' : 'year'}</td>
              <td className="p-3">{isEs ? 'Registra la aceptación de cookies' : 'Records cookie acceptance'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="font-semibold mt-8 text-lg">
        {isEs ? '4. Cómo gestionar las cookies' : '4. How to manage cookies'}
      </h2>
      <p className="text-sm text-[#8791a1] mt-2 leading-relaxed">
        {isEs
          ? 'Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador. A continuación te indicamos cómo acceder a la configuración de cookies en los navegadores más comunes:'
          : 'You can allow, block or delete cookies installed on your device by configuring your browser options. Below we show you how to access cookie settings in the most common browsers:'}
      </p>
      <ul className="list-disc ml-6 mt-2 text-sm text-[#8791a1] space-y-1">
        <li>Google Chrome: {isEs ? 'Configuración → Privacidad y seguridad → Cookies' : 'Settings → Privacy and security → Cookies'}</li>
        <li>Mozilla Firefox: {isEs ? 'Opciones → Privacidad y seguridad → Cookies' : 'Options → Privacy & Security → Cookies'}</li>
        <li>Safari: {isEs ? 'Preferencias → Privacidad → Cookies' : 'Preferences → Privacy → Cookies'}</li>
        <li>Microsoft Edge: {isEs ? 'Configuración → Privacidad → Cookies' : 'Settings → Privacy → Cookies'}</li>
      </ul>
      <p className="text-sm text-[#8791a1] mt-2 leading-relaxed">
        {isEs
          ? 'Ten en cuenta que si desactivas las cookies técnicas, algunas funciones del sitio podrían no estar disponibles o no funcionar correctamente.'
          : 'Please note that if you disable technical cookies, some site functions may not be available or may not work correctly.'}
      </p>

      <h2 className="font-semibold mt-8 text-lg">
        {isEs ? '5. Transferencias internacionales de datos' : '5. International data transfers'}
      </h2>
      <p className="text-sm text-[#8791a1] mt-2 leading-relaxed">
        {isEs
          ? 'Algunos de los terceros mencionados (Stripe, Firebase) pueden transferir datos fuera del Espacio Económico Europeo. Estas transferencias se realizan con las garantías adecuadas según el RGPD, como las cláusulas contractuales tipo aprobadas por la Comisión Europea.'
          : 'Some of the mentioned third parties (Stripe, Firebase) may transfer data outside the European Economic Area. These transfers are made with adequate safeguards under the GDPR, such as standard contractual clauses approved by the European Commission.'}
      </p>

      <h2 className="font-semibold mt-8 text-lg">
        {isEs ? '6. Actualización de esta política' : '6. Updates to this policy'}
      </h2>
      <p className="text-sm text-[#8791a1] mt-2 leading-relaxed">
        {isEs
          ? 'Podemos actualizar nuestra Política de Cookies para reflejar cambios en nuestras prácticas o por motivos legales. Te recomendamos revisar esta página periódicamente. La fecha de la última actualización se indica al final de esta página.'
          : 'We may update our Cookie Policy to reflect changes in our practices or for legal reasons. We recommend reviewing this page periodically. The date of the last update is indicated at the end of this page.'}
      </p>

      <h2 className="font-semibold mt-8 text-lg">
        {isEs ? '7. Contacto' : '7. Contact'}
      </h2>
      <p className="text-sm text-[#8791a1] mt-2 leading-relaxed">
        {isEs
          ? 'Si tienes preguntas sobre nuestra Política de Cookies, puedes contactarnos a través de los canales indicados en el Aviso Legal.'
          : 'If you have questions about our Cookie Policy, you can contact us through the channels indicated in the Legal Notice.'}
      </p>

      <div className="mt-10 pt-6 border-t border-white/[0.07]">
        <p className="text-xs text-[#6b7785]">
          {isEs
            ? 'Última actualización: 1 de junio de 2026.'
            : 'Last updated: June 1, 2026.'}
        </p>
      </div>
    </div>
  )
}
