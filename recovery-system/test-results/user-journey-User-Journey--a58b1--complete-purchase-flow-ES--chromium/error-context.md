# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user-journey.spec.ts >> User Journey: TikTok ad -> Order Complete >> complete purchase flow (ES)
- Location: tests\e2e\user-journey.spec.ts:7:7

# Error details

```
TimeoutError: page.waitForURL: Timeout 10000ms exceeded.
=========================== logs ===========================
waiting for navigation to "**/checkout**" until "load"
============================================================
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e4]:
      - generic [ref=e5]: Envío gratis en todos los pedidos
      - generic [ref=e6]: 4,9 estrellas - más de 6.000 clientes satisfechos
      - generic [ref=e7]: Garantía de devolución de 30 días, sin preguntas
      - generic [ref=e8]: Pago seguro con Stripe
      - generic [ref=e9]: Envío en 24 horas
      - generic [ref=e10]: Envío gratis en todos los pedidos
      - generic [ref=e11]: 4,9 estrellas - más de 6.000 clientes satisfechos
      - generic [ref=e12]: Garantía de devolución de 30 días, sin preguntas
      - generic [ref=e13]: Pago seguro con Stripe
      - generic [ref=e14]: Envío en 24 horas
    - banner [ref=e15]:
      - generic [ref=e16]:
        - generic [ref=e17]:
          - link "Noctas" [ref=e18] [cursor=pointer]:
            - /url: /es/
            - generic [ref=e24]: Noctas
          - generic [ref=e27]:
            - img [ref=e28]
            - textbox "Busca bandas de sueño, masajeadores, antifaces..." [ref=e31]
          - generic [ref=e32]:
            - link "Switch to English" [ref=e33] [cursor=pointer]:
              - /url: /en/
              - text: EN
            - button "Iniciar sesión" [ref=e34] [cursor=pointer]
            - button "Carrito - 1 artículo" [ref=e35] [cursor=pointer]:
              - img [ref=e36]
              - generic [ref=e40]: "1"
        - generic [ref=e41]:
          - link "🎧 Sueño y audio" [ref=e42] [cursor=pointer]:
            - /url: /es/shop/sleep-audio/
            - generic [ref=e43]: 🎧
            - text: Sueño y audio
          - link "🧘 Cuello y recuperación" [ref=e44] [cursor=pointer]:
            - /url: /es/shop/neck-recovery/
            - generic [ref=e45]: 🧘
            - text: Cuello y recuperación
          - link "🌙 Sensorial y relajación" [ref=e46] [cursor=pointer]:
            - /url: /es/shop/sensory/
            - generic [ref=e47]: 🌙
            - text: Sensorial y relajación
    - main [ref=e48]:
      - generic [ref=e51]:
        - generic [ref=e52]:
          - generic [ref=e53]:
            - img [ref=e54]
            - generic [ref=e56]: Tecnología premium de bienestar
          - heading "Recupérate mejor. Descansa más. Rinde más." [level=1] [ref=e57]:
            - text: Recupérate mejor.
            - text: Descansa más. Rinde más.
          - paragraph [ref=e58]: "Una tienda de sueño y recuperación creada alrededor de lo que la gente siente cada día: mal descanso, tensión cervical, músculos cargados y fatiga de viaje. Herramientas premium, rutinas más limpias y menos improvisación."
          - generic [ref=e59]:
            - link "😴 No consigues desconectar" [ref=e60] [cursor=pointer]:
              - /url: /es/shop/sleep-audio/
              - generic [ref=e61]: 😴
              - text: No consigues desconectar
              - img [ref=e62]
            - link "🦴 Tensión de cuello por escritorio" [ref=e64] [cursor=pointer]:
              - /url: /es/shop/neck-recovery/
              - generic [ref=e65]: 🦴
              - text: Tensión de cuello por escritorio
              - img [ref=e66]
            - link "🌙 Necesitas más calma" [ref=e68] [cursor=pointer]:
              - /url: /es/shop/sensory/
              - generic [ref=e69]: 🌙
              - text: Necesitas más calma
              - img [ref=e70]
          - generic [ref=e72]:
            - link "Ver todos los productos (5)" [ref=e73] [cursor=pointer]:
              - /url: /es/shop/all/
              - img [ref=e74]
              - text: Ver todos los productos (5)
            - link "Explorar Noctive Halo" [ref=e78] [cursor=pointer]:
              - /url: /es/products/sleepband-pro/
          - generic [ref=e79]:
            - generic [ref=e80]:
              - generic [ref=e81]: Quienes duermen de lado
              - generic [ref=e82]: imprescindibles para descansar mejor
            - generic [ref=e83]:
              - generic [ref=e84]: Trabajo de escritorio
              - generic [ref=e85]: alivio cervical y postural
            - generic [ref=e86]:
              - generic [ref=e87]: Viajeros frecuentes
              - generic [ref=e88]: recuperación portátil
        - generic [ref=e89]:
          - 'link "Noctive Halo Producto insignia Noctive Halo La forma más fácil de dormir mejor: audio suave, sin auriculares duros y con comodidad cada noche." [ref=e90] [cursor=pointer]':
            - /url: /es/products/sleepband-pro/
            - img "Noctive Halo" [ref=e91]
            - generic [ref=e93]:
              - generic [ref=e94]: Producto insignia
              - generic [ref=e95]: Noctive Halo
              - paragraph [ref=e96]: "La forma más fácil de dormir mejor: audio suave, sin auriculares duros y con comodidad cada noche."
          - generic [ref=e97]:
            - generic [ref=e98]:
              - img "Hardware limpio" [ref=e99]
              - generic [ref=e101]:
                - generic [ref=e102]: Hardware limpio
                - generic [ref=e103]: Confort discreto pensado para uso diario
            - generic [ref=e104]:
              - img "Listo para viajar" [ref=e105]
              - generic [ref=e107]:
                - generic [ref=e108]: Listo para viajar
                - generic [ref=e109]: Recuperación portátil para vuelos, hoteles y siestas
      - generic [ref=e110]:
        - generic [ref=e111]:
          - img [ref=e112]
          - generic [ref=e117]:
            - generic [ref=e118]: Envío gratis
            - generic [ref=e119]: En todos los pedidos
        - generic [ref=e120]:
          - img [ref=e121]
          - generic [ref=e124]:
            - generic [ref=e125]: Devoluciones 30 días
            - generic [ref=e126]: Sin preguntas
        - generic [ref=e127]:
          - img [ref=e128]
          - generic [ref=e130]:
            - generic [ref=e131]: Pago seguro
            - generic [ref=e132]: SSL + Stripe cifrado
        - generic [ref=e133]:
          - img [ref=e134]
          - generic [ref=e136]:
            - generic [ref=e137]: Media de 4,9
            - generic [ref=e138]: Más de 6.000 reseñas verificadas
      - generic [ref=e139]:
        - generic [ref=e141]:
          - heading "Empieza por la rutina que encaja con tu problema." [level=2] [ref=e142]
          - paragraph [ref=e143]: En vez de navegar al azar, comienza por el tipo de recuperación que más necesitas.
        - generic [ref=e144]:
          - link "😴 Inicio guiado Reset nocturno Para personas que no logran desconectar, duermen con ruido o no soportan auriculares rígidos en la cama. Noctive Halo Noctive Wave Sleep Headband Ver esta rutina" [ref=e145] [cursor=pointer]:
            - /url: /es/shop/sleep-audio/
            - generic [ref=e146]:
              - generic [ref=e147]: 😴
              - generic [ref=e148]: Inicio guiado
            - heading "Reset nocturno" [level=3] [ref=e149]
            - paragraph [ref=e150]: Para personas que no logran desconectar, duermen con ruido o no soportan auriculares rígidos en la cama.
            - generic [ref=e151]:
              - generic [ref=e152]:
                - img [ref=e154]
                - text: Noctive Halo
              - generic [ref=e156]:
                - img [ref=e158]
                - text: Noctive Wave
              - generic [ref=e160]:
                - img [ref=e162]
                - text: Sleep Headband
            - generic [ref=e164]:
              - text: Ver esta rutina
              - img [ref=e165]
          - link "🦴 Inicio guiado Alivio diario Para cuellos rígidos, rutinas cargadas de pantalla y quien necesita desconectar después de un día largo. Neck Massager Noctive Calm Mask Ver esta rutina" [ref=e167] [cursor=pointer]:
            - /url: /es/shop/neck-recovery/
            - generic [ref=e168]:
              - generic [ref=e169]: 🦴
              - generic [ref=e170]: Inicio guiado
            - heading "Alivio diario" [level=3] [ref=e171]
            - paragraph [ref=e172]: Para cuellos rígidos, rutinas cargadas de pantalla y quien necesita desconectar después de un día largo.
            - generic [ref=e173]:
              - generic [ref=e174]:
                - img [ref=e176]
                - text: Neck Massager
              - generic [ref=e178]:
                - img [ref=e180]
                - text: Noctive Calm Mask
            - generic [ref=e182]:
              - text: Ver esta rutina
              - img [ref=e183]
      - generic [ref=e185]:
        - generic [ref=e187]:
          - heading "Una tienda. Cada necesidad de recuperación." [level=2] [ref=e188]
          - paragraph [ref=e189]: Encuentra el producto adecuado para tu problema concreto.
        - generic [ref=e190]:
          - link "😴 ¿No puedes dormir? Sueño y audio Bandas Bluetooth para dormir, máquinas de ruido blanco y sistemas de sonido ambiental. Comprar ahora" [ref=e191] [cursor=pointer]:
            - /url: /es/shop/sleep-audio/
            - generic [ref=e192]:
              - generic [ref=e193]: 😴
              - generic [ref=e194]: ¿No puedes dormir?
              - heading "Sueño y audio" [level=3] [ref=e195]
              - paragraph [ref=e196]: Bandas Bluetooth para dormir, máquinas de ruido blanco y sistemas de sonido ambiental.
              - generic [ref=e197]:
                - text: Comprar ahora
                - img [ref=e198]
          - link "🦴 ¿Dolor de cuello o espalda? Cuello y recuperación Masajeadores de cuello con calor. Revierte horas de escritorio en minutos. Comprar ahora" [ref=e200] [cursor=pointer]:
            - /url: /es/shop/neck-recovery/
            - generic [ref=e201]:
              - generic [ref=e202]: 🦴
              - generic [ref=e203]: ¿Dolor de cuello o espalda?
              - heading "Cuello y recuperación" [level=3] [ref=e204]
              - paragraph [ref=e205]: Masajeadores de cuello con calor. Revierte horas de escritorio en minutos.
              - generic [ref=e206]:
                - text: Comprar ahora
                - img [ref=e207]
          - link "🌙 ¿Necesitas relajarte más? Sensorial y relajación Antifaces con peso para una relajación más rápida y profunda en casa. Comprar ahora" [ref=e209] [cursor=pointer]:
            - /url: /es/shop/sensory/
            - generic [ref=e210]:
              - generic [ref=e211]: 🌙
              - generic [ref=e212]: ¿Necesitas relajarte más?
              - heading "Sensorial y relajación" [level=3] [ref=e213]
              - paragraph [ref=e214]: Antifaces con peso para una relajación más rápida y profunda en casa.
              - generic [ref=e215]:
                - text: Comprar ahora
                - img [ref=e216]
      - generic [ref=e218]:
        - heading "Cómo funciona" [level=2] [ref=e219]
        - generic [ref=e220]:
          - generic [ref=e221]:
            - generic [ref=e222]:
              - generic [ref=e223]: 🎯
              - generic [ref=e224]: "01"
            - heading "Elige tu problema" [level=3] [ref=e225]
            - paragraph [ref=e226]: "Compra por categoría: sueño, alivio o relajación. Cada producto resuelve una necesidad diaria concreta."
          - generic [ref=e227]:
            - generic [ref=e228]:
              - generic [ref=e229]: 📦
              - generic [ref=e230]: "02"
            - heading "Pídelo hoy, sale mañana" [level=3] [ref=e231]
            - paragraph [ref=e232]: Cada pedido sale en 24 horas con envío gratis y seguimiento. Normalmente llega en 3-5 días.
          - generic [ref=e233]:
            - generic [ref=e234]:
              - generic [ref=e235]: ✨
              - generic [ref=e236]: "03"
            - heading "Garantía de 30 noches" [level=3] [ref=e237]
            - paragraph [ref=e238]: Pruébalo durante un mes. Si no notas la diferencia, te devolvemos el dinero. Sin riesgo.
      - generic [ref=e239]:
        - generic [ref=e240]:
          - generic [ref=e241]: Recuperación práctica
          - heading "Herramientas premium que encajan en rutinas reales." [level=2] [ref=e242]
          - paragraph [ref=e243]: "Aplicamos la misma estructura de las mejores tiendas: beneficios claros, imágenes reales y confianza para comprar sin dudar."
          - generic [ref=e244]:
            - generic [ref=e245]:
              - generic [ref=e246]: Úsalo cada noche
              - paragraph [ref=e247]: Equipos de audio para dormir y antifaces pensados para uso repetido, no para ser un truco puntual.
            - generic [ref=e248]:
              - generic [ref=e249]: Portátil para viajar
              - paragraph [ref=e250]: Productos compactos para aviones, hoteles, post-entreno y pequeños resets entre jornadas.
            - generic [ref=e251]:
              - generic [ref=e252]: Organizado por problemas reales
              - paragraph [ref=e253]: "Cada categoría empieza por lo que sientes primero: mal sueño, cuello rígido o estrés acumulado."
          - link "Ver rutina principal" [ref=e254] [cursor=pointer]:
            - /url: /es/products/sleepband-pro/
            - text: Ver rutina principal
            - img [ref=e255]
        - generic [ref=e257]:
          - generic [ref=e258]:
            - img "Desconecta más rápido" [ref=e259]
            - generic [ref=e261]:
              - generic [ref=e262]: Desconecta más rápido
              - generic [ref=e263]: Audio suave por la noche sin auriculares rígidos
          - generic [ref=e264]:
            - img "Hardware limpio" [ref=e265]
            - generic [ref=e267]:
              - generic [ref=e268]: Hardware limpio
              - generic [ref=e269]: Confort discreto pensado para uso diario
          - generic [ref=e270]:
            - img "Listo para viajar" [ref=e271]
            - generic [ref=e273]:
              - generic [ref=e274]: Listo para viajar
              - generic [ref=e275]: Recuperación portátil para vuelos, hoteles y siestas
      - generic [ref=e276]:
        - heading "Comprar por categoría" [level=2] [ref=e278]
        - generic [ref=e279]:
          - link "🎧 Sueño y audio 3 productos" [ref=e280] [cursor=pointer]:
            - /url: /es/shop/sleep-audio/
            - generic [ref=e281]: 🎧
            - generic [ref=e282]: Sueño y audio
            - generic [ref=e283]: 3 productos
          - link "🧘 Cuello y recuperación 1 producto" [ref=e284] [cursor=pointer]:
            - /url: /es/shop/neck-recovery/
            - generic [ref=e285]: 🧘
            - generic [ref=e286]: Cuello y recuperación
            - generic [ref=e287]: 1 producto
          - link "🌙 Sensorial y relajación 1 producto" [ref=e288] [cursor=pointer]:
            - /url: /es/shop/sensory/
            - generic [ref=e289]: 🌙
            - generic [ref=e290]: Sensorial y relajación
            - generic [ref=e291]: 1 producto
      - generic [ref=e292]:
        - generic [ref=e293]:
          - generic [ref=e294]:
            - img [ref=e295]
            - heading "Más vendidos" [level=2] [ref=e298]
          - link "Ver todo" [ref=e299] [cursor=pointer]:
            - /url: /es/shop/all/
            - text: Ver todo
            - img [ref=e300]
        - link "Noctive Halo Más vendido -43% 4.9 (1578) Noctive Halo Cinta acústica ultrafina diseñada para audio de sueño inmersivo sin presión en los oídos. €17€30 Añadir" [ref=e303] [cursor=pointer]:
          - /url: /es/products/sleepband-pro/
          - generic [ref=e304]:
            - generic [ref=e305]:
              - img "Noctive Halo" [ref=e306]
              - generic [ref=e308]: Más vendido
              - generic [ref=e309]: "-43%"
            - generic [ref=e310]:
              - generic [ref=e311]:
                - generic [ref=e312]:
                  - img [ref=e313]
                  - img [ref=e315]
                  - img [ref=e317]
                  - img [ref=e319]
                  - img [ref=e321]
                - generic [ref=e323]: 4.9 (1578)
              - heading "Noctive Halo" [level=3] [ref=e324]
              - paragraph [ref=e325]: Cinta acústica ultrafina diseñada para audio de sueño inmersivo sin presión en los oídos.
              - generic [ref=e326]:
                - generic [ref=e327]:
                  - generic [ref=e328]: €17
                  - generic [ref=e329]: €30
                - button "Añadir" [ref=e330]:
                  - img [ref=e331]
                  - text: Añadir
      - generic [ref=e336]:
        - img [ref=e337]
        - heading "Ofertas y tendencia" [level=2] [ref=e339]
      - generic [ref=e340]:
        - generic [ref=e341]:
          - img [ref=e342]
          - heading "Todos los productos" [level=2] [ref=e346]
        - generic [ref=e347]:
          - link "Noctive Halo Más vendido -43% 4.9 (1578) Noctive Halo Cinta acústica ultrafina diseñada para audio de sueño inmersivo sin presión en los oídos. €17€30 Añadir" [ref=e348] [cursor=pointer]:
            - /url: /es/products/sleepband-pro/
            - generic [ref=e349]:
              - generic [ref=e350]:
                - img "Noctive Halo" [ref=e351]
                - generic [ref=e353]: Más vendido
                - generic [ref=e354]: "-43%"
              - generic [ref=e355]:
                - generic [ref=e356]:
                  - generic [ref=e357]:
                    - img [ref=e358]
                    - img [ref=e360]
                    - img [ref=e362]
                    - img [ref=e364]
                    - img [ref=e366]
                  - generic [ref=e368]: 4.9 (1578)
                - heading "Noctive Halo" [level=3] [ref=e369]
                - paragraph [ref=e370]: Cinta acústica ultrafina diseñada para audio de sueño inmersivo sin presión en los oídos.
                - generic [ref=e371]:
                  - generic [ref=e372]:
                    - generic [ref=e373]: €17
                    - generic [ref=e374]: €30
                  - button "Añadir" [ref=e375]:
                    - img [ref=e376]
                    - text: Añadir
          - link "Noctive Wave Nuevo -38% 4.8 (812) Noctive Wave Sistema de sonido ambiental compacto con perfiles de sueño y luz suave adaptativa. €20€32 Añadir" [ref=e380] [cursor=pointer]:
            - /url: /es/products/white-noise-pro/
            - generic [ref=e381]:
              - generic [ref=e382]:
                - img "Noctive Wave" [ref=e383]
                - generic [ref=e385]: Nuevo
                - generic [ref=e386]: "-38%"
              - generic [ref=e387]:
                - generic [ref=e388]:
                  - generic [ref=e389]:
                    - img [ref=e390]
                    - img [ref=e392]
                    - img [ref=e394]
                    - img [ref=e396]
                    - img [ref=e398]
                  - generic [ref=e400]: 4.8 (812)
                - heading "Noctive Wave" [level=3] [ref=e401]
                - paragraph [ref=e402]: Sistema de sonido ambiental compacto con perfiles de sueño y luz suave adaptativa.
                - generic [ref=e403]:
                  - generic [ref=e404]:
                    - generic [ref=e405]: €20
                    - generic [ref=e406]: €32
                  - button "Añadir" [ref=e407]:
                    - img [ref=e408]
                    - text: Añadir
          - link "Cinta para dormir -45% 4.4 (120) Cinta para dormir Cinta Bluetooth cómoda para dormir con altavoces ultrafinos. €12€22 Añadir" [ref=e412] [cursor=pointer]:
            - /url: /es/products/sleep-headband/
            - generic [ref=e413]:
              - generic [ref=e414]:
                - img "Cinta para dormir" [ref=e415]
                - generic [ref=e416]: "-45%"
              - generic [ref=e417]:
                - generic [ref=e418]:
                  - generic [ref=e419]:
                    - img [ref=e420]
                    - img [ref=e422]
                    - img [ref=e424]
                    - img [ref=e426]
                    - img [ref=e428]
                  - generic [ref=e430]: 4.4 (120)
                - heading "Cinta para dormir" [level=3] [ref=e431]
                - paragraph [ref=e432]: Cinta Bluetooth cómoda para dormir con altavoces ultrafinos.
                - generic [ref=e433]:
                  - generic [ref=e434]:
                    - generic [ref=e435]: €12
                    - generic [ref=e436]: €22
                  - button "Añadir" [ref=e437]:
                    - img [ref=e438]
                    - text: Añadir
          - link "Masajeador de cuello -40% 4.5 (210) Masajeador de cuello Masajeador de cuello portátil con calor y varios modos. €15€25 Añadir" [ref=e442] [cursor=pointer]:
            - /url: /es/products/neck-massager/
            - generic [ref=e443]:
              - generic [ref=e444]:
                - img "Masajeador de cuello" [ref=e445]
                - generic [ref=e446]: "-40%"
              - generic [ref=e447]:
                - generic [ref=e448]:
                  - generic [ref=e449]:
                    - img [ref=e450]
                    - img [ref=e452]
                    - img [ref=e454]
                    - img [ref=e456]
                    - img [ref=e458]
                  - generic [ref=e460]: 4.5 (210)
                - heading "Masajeador de cuello" [level=3] [ref=e461]
                - paragraph [ref=e462]: Masajeador de cuello portátil con calor y varios modos.
                - generic [ref=e463]:
                  - generic [ref=e464]:
                    - generic [ref=e465]: €15
                    - generic [ref=e466]: €25
                  - button "Añadir" [ref=e467]:
                    - img [ref=e468]
                    - text: Añadir
          - link "Noctive Calm Mask Nuevo -35% 4.7 (512) Noctive Calm Mask Antifaz con peso que combina presión suave y diseño transpirable para relajarse más rápido. €11€17 Añadir" [ref=e472] [cursor=pointer]:
            - /url: /es/products/weighted-mask-pro/
            - generic [ref=e473]:
              - generic [ref=e474]:
                - img "Noctive Calm Mask" [ref=e475]
                - generic [ref=e477]: Nuevo
                - generic [ref=e478]: "-35%"
              - generic [ref=e479]:
                - generic [ref=e480]:
                  - generic [ref=e481]:
                    - img [ref=e482]
                    - img [ref=e484]
                    - img [ref=e486]
                    - img [ref=e488]
                    - img [ref=e490]
                  - generic [ref=e492]: 4.7 (512)
                - heading "Noctive Calm Mask" [level=3] [ref=e493]
                - paragraph [ref=e494]: Antifaz con peso que combina presión suave y diseño transpirable para relajarse más rápido.
                - generic [ref=e495]:
                  - generic [ref=e496]:
                    - generic [ref=e497]: €11
                    - generic [ref=e498]: €17
                  - button "Añadir" [ref=e499]:
                    - img [ref=e500]
                    - text: Añadir
      - generic [ref=e505]:
        - generic [ref=e506]:
          - generic [ref=e507]: Bundle
          - heading "Ahorra con packs" [level=2] [ref=e508]
          - paragraph [ref=e509]: Construye tu sistema completo de recuperación combinando masaje, alivio cervical y audio para dormir en una sola rutina.
          - generic [ref=e510]:
            - link "Ver todos los productos" [ref=e511] [cursor=pointer]:
              - /url: /es/shop/all/
              - text: Ver todos los productos
              - img [ref=e512]
            - link "Ir al checkout" [ref=e514] [cursor=pointer]:
              - /url: /es/checkout/
        - generic [ref=e516]:
          - generic [ref=e517]: 🎧
          - generic [ref=e518]:
            - generic [ref=e519]: Noctive Halo
            - generic [ref=e520]: €17
      - generic [ref=e521]:
        - heading "Lo que dicen los clientes" [level=2] [ref=e522]
        - generic [ref=e523]:
          - generic [ref=e524]:
            - generic [ref=e525]:
              - generic [ref=e526]:
                - img [ref=e527]
                - img [ref=e529]
                - img [ref=e531]
                - img [ref=e533]
                - img [ref=e535]
              - generic [ref=e537]: Compra verificada
            - paragraph [ref=e538]: "\"Lo compré por el precio y no esperaba mucho, pero la cinta es cómoda y el sonido se escucha bien. Me duermo mucho más rápido.\""
            - generic [ref=e539]:
              - generic [ref=e540]:
                - generic [ref=e541]: Andrea L.
                - generic [ref=e542]: Estudiante
              - generic [ref=e543]: Noctive Halo
          - generic [ref=e544]:
            - generic [ref=e545]:
              - generic [ref=e546]:
                - img [ref=e547]
                - img [ref=e549]
                - img [ref=e551]
                - img [ref=e553]
                - img [ref=e555]
              - generic [ref=e557]: Compra verificada
            - paragraph [ref=e558]: "\"Tengo contracturas en el cuello por el ordenador. Desde que uso el masajeador 15 min al día, he notado mucha mejora. Merece la pena.\""
            - generic [ref=e559]:
              - generic [ref=e560]:
                - generic [ref=e561]: Miguel Á.
                - generic [ref=e562]: Informático
              - generic [ref=e563]: Masajeador de cuello
          - generic [ref=e564]:
            - generic [ref=e565]:
              - generic [ref=e566]:
                - img [ref=e567]
                - img [ref=e569]
                - img [ref=e571]
                - img [ref=e573]
                - img [ref=e575]
              - generic [ref=e577]: Compra verificada
            - paragraph [ref=e578]: "\"Noctive Halo me ha cambiado el sueño. Es cómoda y el sonido se escucha genial. Me duermo mucho más rápido desde que la uso.\""
            - generic [ref=e579]:
              - generic [ref=e580]:
                - generic [ref=e581]: Carla F.
                - generic [ref=e582]: Deportista amateur
              - generic [ref=e583]: Noctive Halo
          - generic [ref=e584]:
            - generic [ref=e585]:
              - generic [ref=e586]:
                - img [ref=e587]
                - img [ref=e589]
                - img [ref=e591]
                - img [ref=e593]
                - img [ref=e595]
              - generic [ref=e597]: Compra verificada
            - paragraph [ref=e598]: "\"Tenía dudas pero el antifaz con peso me ayuda a relajarme mucho más rápido. La presión suave es muy calmante. Por este precio, muy bien.\""
            - generic [ref=e599]:
              - generic [ref=e600]:
                - generic [ref=e601]: Laura P.
                - generic [ref=e602]: Madre primeriza
              - generic [ref=e603]: Noctive Calm Mask
          - generic [ref=e604]:
            - generic [ref=e605]:
              - generic [ref=e606]:
                - img [ref=e607]
                - img [ref=e609]
                - img [ref=e611]
                - img [ref=e613]
                - img [ref=e615]
              - generic [ref=e617]: Compra verificada
            - paragraph [ref=e618]: "\"Viajo mucho por trabajo y la cinta de sueño me permite dormir en cualquier sitio. Muy portátil y cómoda.\""
            - generic [ref=e619]:
              - generic [ref=e620]:
                - generic [ref=e621]: David R.
                - generic [ref=e622]: Consultor
              - generic [ref=e623]: Sleep Headband
          - generic [ref=e624]:
            - generic [ref=e625]:
              - generic [ref=e626]:
                - img [ref=e627]
                - img [ref=e629]
                - img [ref=e631]
                - img [ref=e633]
                - img [ref=e635]
              - generic [ref=e637]: Compra verificada
            - paragraph [ref=e638]: "\"Vivo en un bajo y entra ruido de la calle. La máquina de ruido blanco lo tapa todo. Mi sueño ha mejorado un montón.\""
            - generic [ref=e639]:
              - generic [ref=e640]:
                - generic [ref=e641]: Sara M.
                - generic [ref=e642]: Profesora
              - generic [ref=e643]: Noctive Wave
      - generic [ref=e645]:
        - generic [ref=e646]:
          - img "Escena de producto de Noctas" [ref=e648]
          - img "Escena de producto de Noctas" [ref=e650]
          - img "Escena de producto de Noctas" [ref=e652]
          - img "Escena de producto de Noctas" [ref=e654]
        - generic [ref=e655]:
          - generic [ref=e656]: Visuales de uso real
          - heading "Una tienda que enseña la rutina, no solo el producto." [level=2] [ref=e657]
          - paragraph [ref=e658]: "Esta es la lección central de las referencias: los clientes necesitan ver contexto, estilo de vida y claridad de uso. Por eso la tienda mezcla bloques de producto con imágenes reales, señales de confianza y explicaciones directas en lugar de depender solo de tarjetas de catálogo."
          - generic [ref=e659]:
            - generic [ref=e660]:
              - generic [ref=e661]: Sueño
              - generic [ref=e662]: audio y productos sensoriales
            - generic [ref=e663]:
              - generic [ref=e664]: Alivio
              - generic [ref=e665]: recuperación cervical y muscular
            - generic [ref=e666]:
              - generic [ref=e667]: Viaje
              - generic [ref=e668]: calma portátil al instante
          - link "Explorar toda la tienda" [ref=e669] [cursor=pointer]:
            - /url: /es/shop/all/
            - text: Explorar toda la tienda
            - img [ref=e670]
      - generic [ref=e672]:
        - heading "Preguntas frecuentes" [level=2] [ref=e673]
        - generic [ref=e674]:
          - generic [ref=e675]:
            - generic [ref=e676]: ¿Cuánto tarda el envío?
            - paragraph [ref=e677]: Los pedidos estándar salen en 24 horas y llegan en 3-5 días laborables dentro de Europa. En el checkout también puedes elegir envío exprés de 1-2 días.
          - generic [ref=e678]:
            - generic [ref=e679]: ¿Cuál es vuestra política de devoluciones?
            - paragraph [ref=e680]: Prueba cualquier producto durante 30 noches. Si no te funciona, contáctanos y gestionamos la devolución y el reembolso completo.
          - generic [ref=e681]:
            - generic [ref=e682]: ¿Los productos son compatibles con cualquier dispositivo?
            - paragraph [ref=e683]: Los productos Bluetooth se conectan por Bluetooth 5.0 a cualquier móvil, tablet u ordenador. Los productos USB-C cargan con cualquier cable USB-C estándar.
          - generic [ref=e684]:
            - generic [ref=e685]: ¿El checkout es seguro?
            - paragraph [ref=e686]: Sí. Todos los pagos se procesan con Stripe y cifrado SSL. Nunca almacenamos los datos de tu tarjeta.
          - generic [ref=e687]:
            - generic [ref=e688]: ¿Puedo seguir mi pedido?
            - paragraph [ref=e689]: Sí. Recibirás un correo con seguimiento dentro de las 24 horas posteriores al envío. Todos los pedidos incluyen tracking en tiempo real.
          - generic [ref=e690]:
            - generic [ref=e691]: ¿Ofrecéis packs o bundles?
            - paragraph [ref=e692]: Sí. Añade varios productos al carrito y los descuentos de bundle se aplican automáticamente. Si quieres una combinación concreta, también puedes escribirnos.
    - contentinfo [ref=e693]:
      - generic [ref=e694]:
        - generic [ref=e695]:
          - generic [ref=e696]:
            - generic [ref=e703]: Noctas
            - paragraph [ref=e704]: Productos premium de sueño y recuperación para el bienestar diario.
          - generic [ref=e705]:
            - generic [ref=e706]: Categorías
            - list [ref=e707]:
              - listitem [ref=e708]:
                - link "Sueño y audio" [ref=e709] [cursor=pointer]:
                  - /url: /es/shop/sleep-audio/
              - listitem [ref=e710]:
                - link "Cuello y recuperación" [ref=e711] [cursor=pointer]:
                  - /url: /es/shop/neck-recovery/
              - listitem [ref=e712]:
                - link "Sensorial y relajación" [ref=e713] [cursor=pointer]:
                  - /url: /es/shop/sensory/
          - generic [ref=e714]:
            - generic [ref=e715]: Ayuda
            - list [ref=e716]:
              - listitem [ref=e717]: Contáctanos
              - listitem [ref=e718]: Sigue tu pedido
              - listitem [ref=e719]: Devolver un producto
              - listitem [ref=e720]: Información de garantía
          - generic [ref=e721]:
            - generic [ref=e722]: Políticas
            - list [ref=e723]:
              - listitem [ref=e724]: Política de envíos
              - listitem [ref=e725]: Política de devoluciones
              - listitem [ref=e726]: Política de privacidad
              - listitem [ref=e727]: Términos del servicio
        - generic [ref=e728]:
          - paragraph [ref=e729]: © 2026 Noctas™. Todos los derechos reservados.
          - generic [ref=e730]:
            - img [ref=e731]
            - generic [ref=e733]: SSL seguro · Pagos con Stripe
  - alert [ref=e734]
  - dialog "Bienvenido" [ref=e737]:
    - button "Close" [ref=e738] [cursor=pointer]:
      - img [ref=e739]
    - generic [ref=e742]:
      - text: RECOVER™
      - heading "Bienvenido" [level=2] [ref=e743]
      - paragraph [ref=e744]: Inicia sesión en tu cuenta
    - button "Continuar con Google" [ref=e745] [cursor=pointer]:
      - img [ref=e746]
      - text: Continuar con Google
    - generic [ref=e753]: o
    - generic [ref=e755]:
      - generic [ref=e756]:
        - img [ref=e757]
        - textbox "Correo electrónico" [ref=e760]: test@noctas.com
      - generic [ref=e761]:
        - img [ref=e762]
        - textbox "Contraseña" [ref=e765]: test123456
        - button "Show password" [ref=e766] [cursor=pointer]:
          - img [ref=e767]
      - button "¿Olvidaste tu contraseña?" [ref=e771] [cursor=pointer]
      - paragraph [ref=e772]: "Firebase: Error (auth/invalid-credential)."
      - button "Iniciar sesión" [ref=e773] [cursor=pointer]
    - paragraph [ref=e774]:
      - text: ¿No tienes una cuenta?
      - button "Regístrate" [ref=e775] [cursor=pointer]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const BASE = 'https://valtre-73c7b.web.app';
  4   | 
  5   | test.describe('User Journey: TikTok ad -> Order Complete', () => {
  6   | 
  7   |   test('complete purchase flow (ES)', async ({ page }) => {
  8   |     // 1. User arrives from TikTok ad to the Spanish store
  9   |     await page.goto(`${BASE}/es?utm_source=tiktok&utm_medium=social&utm_campaign=tt_ad1`);
  10  |     await expect(page).toHaveTitle(/NOCTAS/);
  11  |     
  12  |     // 2. Verify homepage loaded with products
  13  |     await expect(page.locator('text=Noctive Halo').first()).toBeVisible({ timeout: 15000 });
  14  |     await expect(page.locator('text=Sueño y audio').first()).toBeVisible({ timeout: 5000 });
  15  |     
  16  |     // 3. User sees categories and clicks one
  17  |     await page.locator('a[href*="/shop/sleep-audio"]').first().click();
  18  |     await page.waitForURL('**/shop/sleep-audio**');
  19  |     await expect(page.locator('text=Noctive Halo').first()).toBeVisible();
  20  |     
  21  |     // 4. User goes back and adds product to cart
  22  |     await page.goto(`${BASE}/es`);
  23  |     await expect(page.locator('text=Noctive Halo').first()).toBeVisible({ timeout: 10000 });
  24  |     
  25  |     // Click Añadir button
  26  |     const addBtn = page.locator('text=Añadir').first();
  27  |     await addBtn.scrollIntoViewIfNeeded();
  28  |     await addBtn.click();
  29  |     
  30  |     // 5. Cart drawer opens - verify product is there
  31  |     const cartPanel = page.locator('aside');
  32  |     await expect(cartPanel).toBeVisible({ timeout: 5000 });
  33  |     await expect(cartPanel.locator('text=Noctive Halo').first()).toBeVisible();
  34  |     
  35  |     // 6. User proceeds to checkout - should trigger auth modal
  36  |     await cartPanel.locator('text=Ir al pago').click();
  37  |     
  38  |     // 7. Auth modal opens - verify it appears
  39  |     const authModal = page.locator('[role="dialog"]');
  40  |     await expect(authModal).toBeVisible({ timeout: 5000 });
  41  |     
  42  |     // Fill in signup form
  43  |     const emailInput = authModal.locator('input[type="email"]');
  44  |     await emailInput.fill('test@noctas.com');
  45  |     await authModal.locator('input[type="password"]').fill('test123456');
  46  |     await authModal.locator('button[type="submit"]').click();
  47  |     
  48  |     // 8. Modal closes, user should be on checkout page
> 49  |     await page.waitForURL('**/checkout**', { timeout: 10000 });
      |                ^ TimeoutError: page.waitForURL: Timeout 10000ms exceeded.
  50  |     await expect(page.locator('text=Contacto')).toBeVisible({ timeout: 5000 });
  51  |     
  52  |     // 9. Verify order summary shows product
  53  |     await expect(page.locator('text=Noctive Halo').first()).toBeVisible();
  54  |   });
  55  | 
  56  |   test('language switching works correctly', async ({ page }) => {
  57  |     // Start in Spanish
  58  |     await page.goto(`${BASE}/es`);
  59  |     await expect(page.locator('text=Noctive Halo').first()).toBeVisible({ timeout: 15000 });
  60  |     
  61  |     // Find EN switcher and click
  62  |     const langSwitch = page.locator('a[aria-label="Switch to English"]').first();
  63  |     await expect(langSwitch).toBeVisible({ timeout: 5000 });
  64  |     await langSwitch.click();
  65  |     await page.waitForURL('**/en/**', { timeout: 10000 });
  66  |     
  67  |     // Verify English content - hero should be in English
  68  |     await expect(page.locator('text=Recover better').first()).toBeVisible({ timeout: 10000 });
  69  |     await expect(page.locator('text=Sleep deeper').first()).toBeVisible();
  70  |     
  71  |     // Nav should show English
  72  |     await expect(page.locator('text=Sign in').first()).toBeVisible();
  73  |     
  74  |     // Add a product to see cart in English
  75  |     const addBtn = page.locator('text=Add').first();
  76  |     await addBtn.scrollIntoViewIfNeeded();
  77  |     await addBtn.click();
  78  |     
  79  |     const cartPanel = page.locator('aside');
  80  |     await expect(cartPanel).toBeVisible({ timeout: 5000 });
  81  |     await expect(cartPanel.locator('text=Your cart').first()).toBeVisible();
  82  |   });
  83  | 
  84  |   test('cart persistence across page reload', async ({ page }) => {
  85  |     await page.goto(`${BASE}/es`);
  86  |     await expect(page.locator('text=Noctive Halo').first()).toBeVisible({ timeout: 15000 });
  87  |     
  88  |     // Add product
  89  |     const addBtn = page.locator('text=Añadir').first();
  90  |     await addBtn.scrollIntoViewIfNeeded();
  91  |     await addBtn.click();
  92  |     
  93  |     // Verify cart panel opened
  94  |     const cartPanel = page.locator('aside');
  95  |     await expect(cartPanel).toBeVisible({ timeout: 5000 });
  96  |     await expect(cartPanel.locator('text=Noctive Halo').first()).toBeVisible();
  97  |     
  98  |     // Reload page
  99  |     await page.reload();
  100 |     await expect(page.locator('text=Noctive Halo').first()).toBeVisible({ timeout: 10000 });
  101 |     
  102 |     // Cart should persist (check cart count badge)
  103 |     const cartButton = page.locator('button[aria-label*="Carrito"]').first();
  104 |     await expect(cartButton.locator('span').first()).toContainText('1', { timeout: 5000 });
  105 |   });
  106 | 
  107 |   test('checkout auth gate - redirects to login when not authenticated', async ({ page }) => {
  108 |     await page.goto(`${BASE}/es/checkout`);
  109 |     
  110 |     // Should see sign in prompt
  111 |     await expect(page.locator('text=Inicia sesión o crea una cuenta')).toBeVisible({ timeout: 10000 });
  112 |     
  113 |     // Submit button should be disabled when not logged in
  114 |     const submitBtn = page.locator('button[type="submit"]');
  115 |     await expect(submitBtn).toBeDisabled();
  116 |   });
  117 | 
  118 |   test('empty cart shows empty state in checkout', async ({ page }) => {
  119 |     await page.goto(`${BASE}/es/checkout`);
  120 |     await page.evaluate(() => localStorage.removeItem('recover_cart'));
  121 |     await page.reload();
  122 |     
  123 |     // Should show empty cart message
  124 |     await expect(page.locator('text=Tu carrito está vacío')).toBeVisible({ timeout: 10000 });
  125 |   });
  126 | 
  127 |   test('success page shows confirmation after order', async ({ page }) => {
  128 |     await page.goto(`${BASE}/es/checkout/success`);
  129 |     
  130 |     // Should show confirmation
  131 |     await expect(page.locator('text=Pedido confirmado')).toBeVisible({ timeout: 10000 });
  132 |     await expect(page.locator('text=Gracias por tu compra')).toBeVisible();
  133 |     await expect(page.locator('text=Entrega estimada')).toBeVisible();
  134 |     await expect(page.locator('text=Seguir comprando')).toBeVisible();
  135 |   });
  136 | });
  137 | 
```