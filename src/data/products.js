const PRODUCTS = [
    // NIKE
    {
        id: 1,
        title: "Nike Air Jordan 1 Retro High Chicago",
        description: "Icónicas Jordan 1 en el colorway legendario. Rojo, blanco y negro. Edición retro del clásico de 1985.",
        price: 189.99,
        images: [
            "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "Nike",
        colors: ["Rojo", "Blanco", "Negro"],
        isNew: true,
        discount: 0
    },
    {
        id: 2,
        title: "Nike Dunk Low Panda",
        description: "El colorway más vendido de los últimos años. Blanco y negro simple pero efectivo. Perfectas para cualquier outfit.",
        price: 129.99,
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "Nike",
        colors: ["Blanco", "Negro"],
        isNew: false,
        discount: 10
    },
    {
        id: 3,
        title: "Nike TN Air Max Plus Triple Black",
        description: "Las legendarias TN totalmente negras. Diseño aerodinámico con amortiguación Air Max completa.",
        price: 199.99,
        images: [
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "Nike",
        colors: ["Negro"],
        isNew: true,
        discount: 0
    },
    {
        id: 4,
        title: "Nike x Travis Scott Air Jordan 1 Low",
        description: "Colaboración con Travis Scott. Swoosh invertido y pocket en tobillo. Una de las más buscadas.",
        price: 899.99,
        images: [
            "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "Nike",
        colors: ["Marrón", "Rosa"],
        isNew: true,
        discount: 0
    },

    // ADIDAS
    {
        id: 5,
        title: "Adidas Yeezy Boost 350 V2 Zebra",
        description: "Diseñadas por Kanye West. El icónico colorway Zebra en blanco y negro. Boost ultra cómodo.",
        price: 399.99,
        images: [
            "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "Adidas",
        colors: ["Blanco", "Negro"],
        isNew: true,
        discount: 0
    },
    {
        id: 6,
        title: "Adidas Samba OG Black White",
        description: "El clásico del fútbol sala convertido en icono streetwear. Piel premium y suela de goma.",
        price: 119.99,
        images: [
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "Adidas",
        colors: ["Negro", "Blanco"],
        isNew: false,
        discount: 15
    },
    {
        id: 7,
        title: "Adidas Gazelle Bold Pink",
        description: "El modelo retro reinventado con plataforma. Rosa vibrante con rayas blancas. Estilo vintage moderno.",
        price: 139.99,
        images: [
            "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&h=800&fit=crop"
        ],
        sizes: ["36", "37", "38", "39", "40", "41", "42"],
        category: "zapatillas",
        brand: "Adidas",
        colors: ["Rosa", "Blanco"],
        isNew: true,
        discount: 0
    },
    {
        id: 8,
        title: "Adidas x Bad Bunny Campus Light Blue",
        description: "Colaboración con Bad Bunny. Campus en azul claro exclusivo. Edición limitada sold-out.",
        price: 449.99,
        images: [
            "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44"],
        category: "zapatillas",
        brand: "Adidas",
        colors: ["Azul"],
        isNew: true,
        discount: 0
    },

    // BALENCIAGA
    {
        id: 9,
        title: "Balenciaga Triple S Clear Sole",
        description: "Las icónicas dad shoes de lujo. Triple suela transparente. Statement piece definitivo.",
        price: 1099.99,
        images: [
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "Balenciaga",
        colors: ["Blanco", "Gris", "Amarillo"],
        isNew: true,
        discount: 0
    },
    {
        id: 10,
        title: "Balenciaga Speed Trainer Black",
        description: "El modelo calcetín que revolucionó el diseño. Upper de punto elástico. Futurista y minimalista.",
        price: 799.99,
        images: [
            "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "Balenciaga",
        colors: ["Negro"],
        isNew: false,
        discount: 0
    },
    {
        id: 11,
        title: "Balenciaga Track LED White Red",
        description: "Track sneakers con iluminación LED. Diseño técnico extremo con capas múltiples.",
        price: 1299.99,
        images: [
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44"],
        category: "zapatillas",
        brand: "Balenciaga",
        colors: ["Blanco", "Rojo"],
        isNew: true,
        discount: 0
    },

    // GUCCI
    {
        id: 12,
        title: "Gucci Ace Sneaker Bee Embroidery",
        description: "Zapatillas de cuero blanco con la icónica abeja bordada. Lujo italiano atemporal.",
        price: 699.99,
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "Gucci",
        colors: ["Blanco", "Verde", "Rojo"],
        isNew: false,
        discount: 0
    },
    {
        id: 13,
        title: "Gucci Rhyton Vintage Logo",
        description: "Chunky sneakers con logo vintage oversized. Inspiración años 80. Suela gruesa con distressing.",
        price: 899.99,
        images: [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44"],
        category: "zapatillas",
        brand: "Gucci",
        colors: ["Beige", "Verde", "Rojo"],
        isNew: true,
        discount: 0
    },
    {
        id: 14,
        title: "Gucci Screener Leather Sneaker",
        description: "Sneakers de cuero con acabado vintage pre-tratado. Web stripe verde-rojo. Estilo retro premium.",
        price: 749.99,
        images: [
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "Gucci",
        colors: ["Blanco", "Verde", "Rojo"],
        isNew: false,
        discount: 10
    },

    // NEW BALANCE
    {
        id: 15,
        title: "New Balance 550 White Green",
        description: "El revival del básquetbol de los 80s. Cuero premium blanco con detalles verdes. Confort superior.",
        price: 149.99,
        images: [
            "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "New Balance",
        colors: ["Blanco", "Verde"],
        isNew: true,
        discount: 0
    },
    {
        id: 16,
        title: "New Balance 2002R Protection Pack Grey",
        description: "Running heritage con tecnología N-ERGY. Malla premium y nobuck. Máximo confort diario.",
        price: 169.99,
        images: [
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "New Balance",
        colors: ["Gris", "Azul"],
        isNew: true,
        discount: 15
    },

    // OFF-WHITE
    {
        id: 17,
        title: "Off-White Out Of Office Sneaker",
        description: "Diseñadas por Virgil Abloh. Arrow logo signature. Detalles industriales únicos.",
        price: 599.99,
        images: [
            "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44"],
        category: "zapatillas",
        brand: "Off-White",
        colors: ["Blanco", "Negro"],
        isNew: true,
        discount: 0
    },
    {
        id: 18,
        title: "Off-White Odsy-1000 Low Blue",
        description: "Modelo low-top con estética deconstructed. Mesh técnico y overlays plásticos.",
        price: 649.99,
        images: [
            "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "Off-White",
        colors: ["Azul", "Blanco"],
        isNew: false,
        discount: 0
    },

    // PRADA
    {
        id: 19,
        title: "Prada Cloudbust Thunder Black",
        description: "Chunky sneakers con suela ultra-tech. Logo Prada en relieve. Lujo deportivo extremo.",
        price: 899.99,
        images: [
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44"],
        category: "zapatillas",
        brand: "Prada",
        colors: ["Negro", "Gris"],
        isNew: true,
        discount: 0
    },
    {
        id: 20,
        title: "Prada America's Cup Leather Sneaker",
        description: "Inspiradas en las velas. Cuero con mesh técnico. Icono de Prada desde 1997.",
        price: 749.99,
        images: [
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "Prada",
        colors: ["Blanco", "Plateado"],
        isNew: false,
        discount: 0
    },

    // ALEXANDER MCQUEEN
    {
        id: 21,
        title: "Alexander McQueen Oversized Sneaker",
        description: "Las sneakers de suela oversized que iniciaron una tendencia. Cuero italiano premium.",
        price: 549.99,
        images: [
            "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "Alexander McQueen",
        colors: ["Blanco"],
        isNew: false,
        discount: 0
    },
    {
        id: 22,
        title: "Alexander McQueen Tread Slick Boot",
        description: "Botas futuristas con suela Tread dentada. Lona y cuero. Diseño vanguardista.",
        price: 799.99,
        images: [
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44"],
        category: "zapatillas",
        brand: "Alexander McQueen",
        colors: ["Negro"],
        isNew: true,
        discount: 0
    },

    // GOLDEN GOOSE
    {
        id: 23,
        title: "Golden Goose Superstar White Star",
        description: "Sneakers italianas hechas a mano con acabado distressed. Estrella signature. Estilo vintage único.",
        price: 499.99,
        images: [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=800&fit=crop"
        ],
        sizes: ["36", "37", "38", "39", "40", "41", "42"],
        category: "zapatillas",
        brand: "Golden Goose",
        colors: ["Blanco", "Plateado"],
        isNew: false,
        discount: 10
    },
    {
        id: 24,
        title: "Golden Goose Mid Star Leopard",
        description: "Botín Mid con print leopardo. Piel envejecida a mano. Lujo casual italiano.",
        price: 589.99,
        images: [
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&h=800&fit=crop"
        ],
        sizes: ["36", "37", "38", "39", "40", "41"],
        category: "zapatillas",
        brand: "Golden Goose",
        colors: ["Leopardo", "Blanco"],
        isNew: true,
        discount: 0
    },

    // CONVERSE
    {
        id: 25,
        title: "Converse x Comme des Garçons Play Chuck 70 High",
        description: "Colaboración icónica. Chuck Taylor con corazón CDG. Clásico reinventado.",
        price: 169.99,
        images: [
            "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "Converse",
        colors: ["Negro", "Blanco"],
        isNew: false,
        discount: 0
    },

    // VERSACE
    {
        id: 26,
        title: "Versace Chain Reaction Sneaker",
        description: "Chunky sneakers con suela en cadena. Medusa logo. Lujo maximalista italiano.",
        price: 999.99,
        images: [
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44"],
        category: "zapatillas",
        brand: "Versace",
        colors: ["Negro", "Dorado"],
        isNew: true,
        discount: 0
    },

    // SALOMON
    {
        id: 27,
        title: "Salomon XT-6 Advanced Black",
        description: "Trail running convertido en streetwear. Tecnología trail premium. Confort extremo.",
        price: 219.99,
        images: [
            "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "Salomon",
        colors: ["Negro"],
        isNew: true,
        discount: 15
    },
    {
        id: 28,
        title: "Salomon x COMME des GARÇONS Speedcross 3",
        description: "Colaboración avant-garde. Trail sneakers con estética japonesa. Edición limitada.",
        price: 399.99,
        images: [
            "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44"],
        category: "zapatillas",
        brand: "Salomon",
        colors: ["Negro", "Gris"],
        isNew: true,
        discount: 0
    },

    // VEJA
    {
        id: 29,
        title: "Veja V-10 White Green",
        description: "Sneakers sostenibles de Brasil. Materiales orgánicos y comercio justo. Eco-luxury.",
        price: 159.99,
        images: [
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "Veja",
        colors: ["Blanco", "Verde"],
        isNew: false,
        discount: 0
    },

    // RICK OWENS
    {
        id: 30,
        title: "Rick Owens DRKSHDW Ramones Low",
        description: "Las icónicas Ramones. Estética gótica minimalista. Canvas premium con suela XXL.",
        price: 649.99,
        images: [
            "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop"
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        category: "zapatillas",
        brand: "Rick Owens",
        colors: ["Negro"],
        isNew: true,
        discount: 0
    }
];

export default PRODUCTS;
