'use client'
import { useLocale } from 'next-intl'

export default function LegalNoticePage() {
  const locale = useLocale();
  const isEs = String(locale || '').toLowerCase().startsWith('es');
  return (
    <div className="mx-auto max-w-4xl p-8 bg-[#0c1016] text-[#f4f1ea] min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        {isEs ? 'Aviso Legal' : 'Legal Notice'}
      </h1>

      <p className="mb-6 text-sm text-[#8791a1]">
        {isEs
          ? 'En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los siguientes datos del titular de este sitio web.'
          : 'In compliance with Law 34/2002, of July 11, on Information Society Services and Electronic Commerce (LSSI-CE), the following details of the owner of this website are provided.'}
      </p>

      <h2 className="font-semibold mt-8 text-lg">
        {isEs ? '1. Identificación del titular' : '1. Owner identification'}
      </h2>
      <div className="mt-3 space-y-2 text-sm text-[#8791a1]">
        <div className="flex gap-2">
          <span className="text-[#c8d4e2] font-medium w-48 shrink-0">{isEs ? 'Titular:' : 'Owner:'}</span>
          <span>NOCTIP</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[#c8d4e2] font-medium w-48 shrink-0">{isEs ? 'Denominación comercial:' : 'Trading name:'}</span>
          <span>Noctip™</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[#c8d4e2] font-medium w-48 shrink-0">{isEs ? 'CIF/NIF:' : 'Tax ID:'}</span>
          <span>{isEs ? 'A determinar' : 'To be determined'}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[#c8d4e2] font-medium w-48 shrink-0">{isEs ? 'Domicilio:' : 'Address:'}</span>
          <span>España</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[#c8d4e2] font-medium w-48 shrink-0">{isEs ? 'Correo electrónico:' : 'Email:'}</span>
          <span>soporte@noctas.com</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[#c8d4e2] font-medium w-48 shrink-0">{isEs ? 'Actividad:' : 'Activity:'}</span>
          <span>{isEs ? 'Comercio electrónico de productos de bienestar y recuperación.' : 'E-commerce of wellness and recovery products.'}</span>
        </div>
      </div>

      <h2 className="font-semibold mt-8 text-lg">
        {isEs ? '2. Condiciones de uso' : '2. Terms of use'}
      </h2>
      <p className="text-sm text-[#8791a1] mt-2 leading-relaxed">
        {isEs
          ? 'El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación plena y sin reservas de todas las disposiciones incluidas en este Aviso Legal, en la versión publicada en el momento en que el usuario acceda al sitio.'
          : 'Access to and use of this website confers the status of user and implies full and unreserved acceptance of all provisions included in this Legal Notice, in the version published at the time the user accesses the site.'}
      </p>
      <p className="text-sm text-[#8791a1] mt-2 leading-relaxed">
        {isEs
          ? 'El usuario se compromete a utilizar el sitio web de conformidad con la ley, la buena fe, el orden público y las exigencias de la buena costumbre. Queda prohibido cualquier uso con fines ilícitos, lesivos de los derechos del titular o de terceros, o que de cualquier forma pueda dañar, inutilizar, sobrecargar o deteriorar el sitio web.'
          : 'The user agrees to use the website in accordance with the law, good faith, public order, and the requirements of good practice. Any use for illegal purposes, harmful to the rights of the owner or third parties, or that in any way may damage, disable, overload, or impair the website is prohibited.'}
      </p>

      <h2 className="font-semibold mt-8 text-lg">
        {isEs ? '3. Propiedad intelectual e industrial' : '3. Intellectual and industrial property'}
      </h2>
      <p className="text-sm text-[#8791a1] mt-2 leading-relaxed">
        {isEs
          ? 'Todos los contenidos del sitio web (textos, imágenes, logotipos, estructura, diseño, código fuente y demás elementos) son propiedad exclusiva del titular o de terceros que han autorizado su uso, y están protegidos por la legislación española e internacional sobre propiedad intelectual e industrial.'
          : 'All contents of the website (texts, images, logos, structure, design, source code and other elements) are the exclusive property of the owner or third parties who have authorized their use, and are protected by Spanish and international legislation on intellectual and industrial property.'}
      </p>
      <p className="text-sm text-[#8791a1] mt-2 leading-relaxed">
        {isEs
          ? 'Queda expresamente prohibida la reproducción, distribución, transformación, comunicación pública o cualquier otra forma de explotación total o parcial de los contenidos sin la autorización expresa y por escrito del titular.'
          : 'The reproduction, distribution, transformation, public communication, or any other form of total or partial exploitation of the contents is expressly prohibited without the express written authorization of the owner.'}
      </p>

      <h2 className="font-semibold mt-8 text-lg">
        {isEs ? '4. Exclusión de responsabilidad' : '4. Disclaimer of liability'}
      </h2>
      <p className="text-sm text-[#8791a1] mt-2 leading-relaxed">
        {isEs
          ? 'El titular no se hace responsable de:'
          : 'The owner is not responsible for:'}
      </p>
      <ul className="list-disc ml-6 mt-2 text-sm text-[#8791a1] space-y-1">
        <li>
          {isEs
            ? 'La disponibilidad y continuidad del funcionamiento del sitio web, no garantizando la ausencia de interrupciones o errores en el acceso.'
            : 'The availability and continuity of the website operation, not guaranteeing the absence of interruptions or errors in access.'}
        </li>
        <li>
          {isEs
            ? 'Los daños y perjuicios que puedan derivarse de la falta de disponibilidad del sitio web por causas técnicas o de fuerza mayor.'
            : 'Damages that may arise from the lack of availability of the website due to technical or force majeure causes.'}
        </li>
        <li>
          {isEs
            ? 'Los contenidos, productos y servicios de terceros a los que se pueda acceder mediante enlaces desde este sitio web.'
            : 'The contents, products, and services of third parties that can be accessed through links from this website.'}
        </li>
        <li>
          {isEs
            ? 'Los daños que puedan causar en los equipos de los usuarios virus informáticos, malware o cualquier otro elemento dañino, a pesar de haber adoptado las medidas de seguridad necesarias.'
            : 'Damages that computer viruses, malware, or any other harmful elements may cause to users equipment, despite having adopted the necessary security measures.'}
        </li>
      </ul>

      <h2 className="font-semibold mt-8 text-lg">
        {isEs ? '5. Protección de datos personales' : '5. Personal data protection'}
      </h2>
      <p className="text-sm text-[#8791a1] mt-2 leading-relaxed">
        {isEs
          ? 'El tratamiento de los datos personales recabados a través de este sitio web se rige por lo dispuesto en nuestra Política de Privacidad y en el Reglamento General de Protección de Datos (RGPD - Reglamento UE 2016/679) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).'
          : 'The processing of personal data collected through this website is governed by the provisions of our Privacy Policy and the General Data Protection Regulation (GDPR - EU Regulation 2016/679) and Organic Law 3/2018, of December 5, on Personal Data Protection and guarantee of digital rights (LOPDGDD).'}
      </p>

      <h2 className="font-semibold mt-8 text-lg">
        {isEs ? '6. Enlaces externos' : '6. External links'}
      </h2>
      <p className="text-sm text-[#8791a1] mt-2 leading-relaxed">
        {isEs
          ? 'Este sitio web puede contener enlaces a sitios web de terceros. El titular no asume responsabilidad alguna sobre el contenido, las políticas de privacidad o las prácticas de dichos sitios. La inclusión de estos enlaces no implica la aprobación de sus contenidos por parte del titular.'
          : 'This website may contain links to third-party websites. The owner assumes no responsibility for the content, privacy policies, or practices of such sites. The inclusion of these links does not imply the approval of their contents by the owner.'}
      </p>

      <h2 className="font-semibold mt-8 text-lg">
        {isEs ? '7. Legislación aplicable y jurisdicción' : '7. Applicable law and jurisdiction'}
      </h2>
      <p className="text-sm text-[#8791a1] mt-2 leading-relaxed">
        {isEs
          ? 'Las relaciones entre el titular y el usuario se regirán por la legislación española vigente. Para la resolución de cualquier controversia, ambas partes se someten expresamente a los Juzgados y Tribunales del domicilio del titular, con renuncia a cualquier otro fuero que pudiera corresponderles, salvo que la ley aplicable disponga lo contrario en materia de consumidores y usuarios.'
          : 'Relations between the owner and the user shall be governed by current Spanish legislation. For the resolution of any dispute, both parties expressly submit to the Courts and Tribunals of the owner\'s domicile, waiving any other jurisdiction that may correspond to them, unless the applicable law provides otherwise regarding consumers and users.'}
      </p>

      <h2 className="font-semibold mt-8 text-lg">
        {isEs ? '8. Resolución de conflictos en línea' : '8. Online dispute resolution'}
      </h2>
      <p className="text-sm text-[#8791a1] mt-2 leading-relaxed">
        {isEs
          ? 'En cumplimiento del Reglamento UE 524/2013, informamos que la Comisión Europea proporciona una plataforma de resolución de litigios en línea disponible en el siguiente enlace: https://ec.europa.eu/consumers/odr/. Como consumidor, puedes utilizar esta plataforma para resolver tus reclamaciones.'
          : 'In compliance with EU Regulation 524/2013, we inform you that the European Commission provides an online dispute resolution platform available at: https://ec.europa.eu/consumers/odr/. As a consumer, you can use this platform to resolve your complaints.'}
      </p>

      <h2 className="font-semibold mt-8 text-lg">
        {isEs ? '9. Modificaciones' : '9. Modifications'}
      </h2>
      <p className="text-sm text-[#8791a1] mt-2 leading-relaxed">
        {isEs
          ? 'El titular se reserva el derecho a modificar en cualquier momento y sin previo aviso la presentación, configuración y contenidos del sitio web, así como las condiciones de uso aquí recogidas. Las modificaciones entrarán en vigor desde su publicación.'
          : 'The owner reserves the right to modify at any time and without prior notice the presentation, configuration, and contents of the website, as well as the terms of use set forth herein. Modifications will take effect from their publication.'}
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
