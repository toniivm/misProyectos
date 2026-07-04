import { Resend } from 'resend';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const resend = new Resend('re_SRvFLXm7_73HANWgMRZscmRaM1ASiKVbk');
const TO_EMAIL = 'tonivfortnite@gmail.com';
const FROM_EMAIL = 'Noctip <noreply@noctip.com>';

async function testEmail() {
  console.log('📧 Enviando email de prueba...\n');

  // 1. Test order confirmation email
  try {
    const tpl = await fs.readFile(path.join(__dirname, 'templates', 'order-confirmation.html'), 'utf8');
    const html = tpl
      .replace(/{{orderId}}/g, 'TEST-12345')
      .replace(/{{customerName}}/g, 'Toni')
      .replace(/{{itemsHtml}}/g, `
        <ul style="list-style:none;padding:0;margin:0;">
          <li style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:14px;display:flex;justify-content:space-between;">
            <span>Noctip Rest x2</span><span style="font-weight:600;">€23.98</span>
          </li>
        </ul>
      `)
      .replace(/{{total}}/g, '€23.98');

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: '✅ Confirmación de pedido TEST-12345 - Noctip',
      html,
    });
    console.log('✅ Email de confirmación enviado:', result.id);
  } catch (e) {
    console.error('❌ Error en email de confirmación:', e.message);
  }

  // 2. Test shipment email
  try {
    const tpl = await fs.readFile(path.join(__dirname, 'templates', 'shipment.html'), 'utf8');
    let html = tpl
      .replace(/{{orderId}}/g, 'TEST-12345')
      .replace(/{{customerName}}/g, 'Toni')
      .replace(/{{carrier}}/g, 'Correos')
      .replace(/{{trackingNumber}}/g, 'XY123456789ES')
      .replace(/{{#trackingUrl}}.*?{{\/trackingUrl}}/gs, '<a href="https://www.google.com/search?q=Correos+tracking+XY123456789ES" class="track-btn" target="_blank">Seguir mi paquete</a>')
      .replace(/\{\{trackingUrl\}\}/g, 'https://www.google.com/search?q=Correos+tracking+XY123456789ES');

    // Show only Spanish section
    html = html.replace(/<div class="lang-en">[\s\S]*?<\/div>/, '');
    html = html.replace(/class="lang-es"/, 'class="lang-es" style="display:block"');

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: '📦 Tu pedido TEST-12345 ha sido enviado — Noctip',
      html,
    });
    console.log('✅ Email de envío enviado:', result.id);
  } catch (e) {
    console.error('❌ Error en email de envío:', e.message);
  }

  console.log('\n🎉 Revisa tu bandeja de entrada (y spam)');
}

testEmail();
