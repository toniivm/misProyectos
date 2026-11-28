import { chromium } from 'playwright'
const b = await chromium.launch()
for (const [w,name] of [[390,'m'],[1440,'d']]) {
  const p = await (await b.newContext({viewport:{width:w,height:900}})).newPage()
  for (const [path,label] of [['/es/about','about'],['/es/contact','contact'],['/es/legal/returns','returns'],['/es/legal/shipping','shipping'],['/es/tracking','tracking']]) {
    await p.goto('http://localhost:4173'+path,{waitUntil:'domcontentloaded'})
    await p.waitForTimeout(600)
    await p.screenshot({path:`D:/OpenCode/temp/pg-${label}-${name}.png`, fullPage:false})
  }
  await p.context().close()
}
await b.close(); console.log('ok')
