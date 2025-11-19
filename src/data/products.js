const PRODUCTS = [
    // CAMISETAS
    {
        id: 1,
        title: "Camiseta Básica Blanca",
        description: "Camiseta esencial de algodón 100% orgánico. Corte regular, perfecta para el día a día. Tejido suave y transpirable.",
        price: 19.99,
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&h=800&fit=crop"
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        category: "camisetas",
        colors: ["Blanco", "Negro", "Gris"],
        isNew: true,
        discount: 0
    },
    {
        id: 2,
        title: "Camiseta Oversize Negra",
        description: "Diseño oversize moderno con caída perfecta. 100% algodón premium. Ideal para look urbano y casual.",
        price: 29.99,
        images: [
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=800&fit=crop"
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        category: "camisetas",
        colors: ["Negro", "Blanco", "Beige"],
        isNew: true,
        discount: 15
    },
    {
        id: 3,
        title: "Camiseta Estampada Vintage",
        description: "Camiseta con estampado retro exclusivo. Edición limitada con acabado desgastado. 100% algodón prelavado.",
        price: 34.99,
        images: [
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&h=800&fit=crop"
        ],
        sizes: ["S", "M", "L", "XL"],
        category: "camisetas",
        colors: ["Multicolor"],
        isNew: false,
        discount: 0
    },

    // PANTALONES
    {
        id: 4,
        title: "Jeans Slim Fit Azul Oscuro",
        description: "Jeans de corte slim con mezclilla de alta calidad. Diseño atemporal con ligero stretch para mayor comodidad.",
        price: 59.99,
        images: [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=800&fit=crop"
        ],
        sizes: ["28", "30", "32", "34", "36"],
        category: "pantalones",
        colors: ["Azul Oscuro", "Negro", "Gris"],
        isNew: false,
        discount: 20
    },
    {
        id: 5,
        title: "Pantalón Cargo Verde Militar",
        description: "Pantalón cargo con múltiples bolsillos. Tela resistente y cómoda. Perfecto para estilo urbano y outdoor.",
        price: 49.99,
        images: [
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop"
        ],
        sizes: ["S", "M", "L", "XL"],
        category: "pantalones",
        colors: ["Verde Militar", "Negro", "Beige"],
        isNew: true,
        discount: 0
    },
    {
        id: 6,
        title: "Chinos Beige Clásicos",
        description: "Pantalones chinos elegantes de algodón. Corte recto y acabado impecable. Ideales para ocasiones formales.",
        price: 44.99,
        images: [
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1624378440070-7f888424003b?w=800&h=800&fit=crop"
        ],
        sizes: ["28", "30", "32", "34", "36", "38"],
        category: "pantalones",
        colors: ["Beige", "Azul Marino", "Gris"],
        isNew: false,
        discount: 0
    },

    // CHAQUETAS
    {
        id: 7,
        title: "Chaqueta Denim Azul",
        description: "Chaqueta vaquera clásica con lavado medio. Diseño icónico y versátil. Perfecta para todas las estaciones.",
        price: 79.99,
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop"
        ],
        sizes: ["S", "M", "L", "XL"],
        category: "chaquetas",
        colors: ["Azul Medio", "Azul Oscuro", "Negro"],
        isNew: false,
        discount: 25
    },
    {
        id: 8,
        title: "Bomber Negra Premium",
        description: "Chaqueta bomber con forro acolchado. Cierre de cremallera y bolsillos laterales. Material resistente al agua.",
        price: 89.99,
        images: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&h=800&fit=crop"
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        category: "chaquetas",
        colors: ["Negro", "Verde Oliva", "Azul Marino"],
        isNew: true,
        discount: 0
    },
    {
        id: 9,
        title: "Parka Oversize Camel",
        description: "Parka larga con capucha y forro térmico. Diseño oversize moderno. Múltiples bolsillos y ajuste en cintura.",
        price: 129.99,
        images: [
            "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1548126032-079d4fa65a6b?w=800&h=800&fit=crop"
        ],
        sizes: ["M", "L", "XL"],
        category: "chaquetas",
        colors: ["Camel", "Negro", "Verde Militar"],
        isNew: true,
        discount: 10
    },

    // SUDADERAS
    {
        id: 10,
        title: "Hoodie Gris Minimalista",
        description: "Sudadera con capucha de felpa francesa. Interior suave y cálido. Diseño clean sin estampados.",
        price: 39.99,
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=800&fit=crop"
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        category: "sudaderas",
        colors: ["Gris", "Negro", "Azul Marino"],
        isNew: false,
        discount: 0
    },
    {
        id: 11,
        title: "Sudadera Crewneck Negra",
        description: "Sudadera cuello redondo con logotipo bordado. Ajuste regular y acabados reforzados. 80% algodón 20% poliéster.",
        price: 44.99,
        images: [
            "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&h=800&fit=crop"
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        category: "sudaderas",
        colors: ["Negro", "Blanco", "Gris"],
        isNew: true,
        discount: 15
    },
    {
        id: 12,
        title: "Sudadera Zip Deportiva",
        description: "Sudadera con cierre completo y capucha ajustable. Bolsillos canguro y puños elásticos. Perfecta para deporte.",
        price: 49.99,
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=800&h=800&fit=crop"
        ],
        sizes: ["S", "M", "L", "XL"],
        category: "sudaderas",
        colors: ["Negro", "Azul", "Rojo"],
        isNew: false,
        discount: 0
    },

    // ACCESORIOS
    {
        id: 13,
        title: "Gorra Snapback Negra",
        description: "Gorra de béisbol con visera plana y cierre ajustable. Bordado frontal de alta calidad.",
        price: 24.99,
        images: [
            "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&h=800&fit=crop"
        ],
        sizes: ["Única"],
        category: "accesorios",
        colors: ["Negro", "Blanco", "Gris"],
        isNew: true,
        discount: 0
    },
    {
        id: 14,
        title: "Mochila Urban Negra",
        description: "Mochila espaciosa con compartimento acolchado para portátil. Material resistente al agua. Diseño urbano moderno.",
        price: 54.99,
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=800&fit=crop"
        ],
        sizes: ["Única"],
        category: "accesorios",
        colors: ["Negro", "Gris Oscuro"],
        isNew: false,
        discount: 20
    },
    {
        id: 15,
        title: "Cinturón Cuero Marrón",
        description: "Cinturón de cuero genuino con hebilla de metal. Acabado artesanal y costuras reforzadas. Elegancia atemporal.",
        price: 29.99,
        images: [
            "https://images.unsplash.com/photo-1624222247344-550fb60583dd?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop"
        ],
        sizes: ["85", "90", "95", "100", "105"],
        category: "accesorios",
        colors: ["Marrón", "Negro"],
        isNew: false,
        discount: 0
    }
];

export default PRODUCTS;
