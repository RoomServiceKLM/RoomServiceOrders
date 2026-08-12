import type { MenuCategoryMap } from "@/types/menu";

export const MENU: MenuCategoryMap = {
  "breakfast": {
    "label": "Desayuno",
    "sub": "07:00 – 12:00",
    "hours": "07:00 – 12:00",
    "sections": [
      {
        "title": "Breakfast Menu",
        "items": [
          {
            "id": "b-eggsben",
            "name": "Eggs Benedict",
            "desc": "Jamón, salsa holandesa, cebollino y pan brioche",
            "price": 15,
            "alg": "Gluten · Huevo · Lácteos · Cerdo"
          },
          {
            "id": "b-continental",
            "name": "Continental Breakfast",
            "desc": "Bebida caliente + zumo de naranja natural, selección de panadería, mantequilla y mermeladas",
            "price": 27,
            "alg": "Gluten · Lácteos · Frutos secos · Soja",
            "variant": {
              "label": "Bebida caliente",
              "options": [
                "Espresso",
                "Espresso doble",
                "Cortado",
                "Americano",
                "Café con leche",
                "Latte",
                "Cappuccino",
                "Té",
                "Chocolate caliente"
              ]
            }
          },
          {
            "id": "b-croque",
            "name": "Croque Madame",
            "desc": "Queso cheddar curado, pavo ahumado, huevo frito y mezclum",
            "price": 14,
            "alg": "Gluten · Huevo · Lácteos"
          },
          {
            "id": "b-acai",
            "name": "Açaí Bowl",
            "desc": "Frutas del bosque, plátano, kiwi, coco y granola casera",
            "price": 19,
            "alg": "Gluten · Frutos secos · Sésamo"
          },
          {
            "id": "b-frittata",
            "name": "Omelette Frittata",
            "desc": "Parmesano, calabacín baby, tomates cherry y albahaca",
            "price": 12,
            "alg": "Huevo · Lácteos"
          },
          {
            "id": "b-iberian",
            "name": "Iberian Charcuterie Selection",
            "desc": "Selección de charcutería ibérica para desayuno",
            "price": 22,
            "alg": "Cerdo · Sulfitos"
          },
          {
            "id": "b-pancakes",
            "name": "Fluffy Pancakes",
            "desc": "Praliné de chocolate, plátano, nata montada y caramelo",
            "price": 12,
            "alg": "Gluten · Huevo · Lácteos · Frutos secos"
          },
          {
            "id": "b-green",
            "name": "Green Healthy Omelette",
            "desc": "Clara de huevo, espinacas baby, salmón ahumado y espárragos",
            "price": 14,
            "alg": "Huevo · Pescado"
          },
          {
            "id": "b-fruit",
            "name": "Seasonal Fruit",
            "desc": "Fruta de temporada",
            "price": 14,
            "alg": "Ninguno declarado"
          },
          {
            "id": "b-croissant",
            "name": "Croissant",
            "desc": "Croissant de mantequilla casero; mixto con jamón o pavo y queso",
            "price": 7,
            "alg": "Gluten · Lácteos · Cerdo",
            "variant": {
              "label": "Tipo",
              "options": [
                "Simple — 7 €",
                "Mixto de jamón y queso — 11 €",
                "Mixto de pavo y queso — 11 €"
              ],
              "deltas": [
                0,
                4,
                4
              ]
            }
          },
          {
            "id": "b-yogurt",
            "name": "Yogurt Pastoret",
            "desc": "Yogurt Pastoret",
            "price": 6,
            "alg": "Lácteos",
            "variant": {
              "label": "Sabor",
              "options": [
                "Natural",
                "Fresa",
                "Melocotón",
                "Griego"
              ]
            }
          },
          {
            "id": "b-cereals",
            "name": "Cereals",
            "desc": "Elige tus cereales favoritos",
            "price": 8,
            "alg": "Gluten · Lácteos",
            "variant": {
              "label": "Acompañamiento",
              "options": [
                "Con leche",
                "Con yogur"
              ]
            }
          },
          {
            "id": "b-eggs",
            "name": "Eggs",
            "desc": "Huevos al gusto",
            "price": 11,
            "alg": "Huevo",
            "variant": {
              "label": "Elaboración",
              "options": [
                "Revueltos",
                "Fritos",
                "Pochados"
              ]
            }
          },
          {
            "id": "b-tortilla",
            "name": "Tortilla al gusto",
            "desc": "Tortilla con ingredientes a elegir",
            "price": 11,
            "alg": "Huevo",
            "variant": {
              "label": "Ingredientes",
              "multi": true,
              "options": [
                "Con jamón york",
                "Con queso",
                "Con espinacas",
                "Con tomate",
                "Con cebolla"
              ]
            }
          },
          {
            "id": "b-pastries",
            "name": "Pastries",
            "desc": "Pastelería casera (6 piezas), mantequilla y mermeladas",
            "price": 11,
            "alg": "Gluten · Huevo · Lácteos"
          },
          {
            "id": "b-bread",
            "name": "Bread",
            "desc": "Pan casero (4 piezas), mantequilla, mermeladas caseras y miel ecológica",
            "price": 8,
            "alg": "Gluten · Lácteos",
            "variant": {
              "label": "Pan",
              "options": [
                "Blanco",
                "Integral"
              ]
            }
          },
          {
            "id": "b-toast",
            "name": "Toast",
            "desc": "Tostadas (4 piezas), mantequilla, mermeladas caseras y miel ecológica",
            "price": 8,
            "alg": "Gluten · Lácteos",
            "variant": {
              "label": "Pan",
              "options": [
                "Blanco",
                "Integral"
              ]
            }
          },
          {
            "id": "b-sausages",
            "name": "Sausages, Bacon or Seasonal Vegetables",
            "desc": "A la plancha",
            "price": 8,
            "alg": "Cerdo · Sulfitos",
            "variant": {
              "label": "Elige una opción",
              "options": [
                "Salchichas",
                "Bacon",
                "Verduras de temporada"
              ]
            }
          },
          {
            "id": "b-cheese",
            "name": "Cheese Selection",
            "desc": "Selección de quesos para desayuno: cabra, oveja y vaca",
            "price": 18,
            "alg": "Lácteos"
          }
        ]
      }
    ]
  },
  "allday": {
    "label": "All Day Menu",
    "sub": "12:00 – 03:00",
    "hours": "12:00 – 03:00",
    "sections": [
      {
        "title": "Starters",
        "items": [
          {
            "id": "a-oysters",
            "name": "Oysters",
            "desc": "Precio por unidad · Pedido mínimo 2 unidades",
            "price": 9,
            "alg": "Moluscos",
            "min": 2,
            "priceNote": "9 €/ud"
          },
          {
            "id": "a-anchovy",
            "name": "Anchovy",
            "desc": "Selección de anchoas artesanales en conserva sobre lecho de tomate natural rallado",
            "price": 10,
            "alg": "Pescado · Sulfitos"
          },
          {
            "id": "a-sardine",
            "name": "Smoked Sardine Toast",
            "desc": "Deshuesadas con pan brioche enmantecado, queso de cabra fresco de Málaga y miel",
            "price": 18,
            "alg": "Gluten · Lácteos · Pescado"
          },
          {
            "id": "a-gazpacho",
            "name": "Andalusian Gazpacho",
            "desc": "Tomate ecológico, pepino y sardina ahumada",
            "price": 16,
            "alg": "Gluten · Pescado · Sulfitos"
          },
          {
            "id": "a-ham",
            "name": "Ham from Dehesa de los Monteros",
            "desc": "Pan de cristal, tomate rallado y aceite de oliva",
            "price": 39,
            "alg": "Gluten · Sulfitos · Cerdo"
          },
          {
            "id": "a-cheeseboard",
            "name": "Cheese Board",
            "desc": "Variedad de quesos de cabra, oveja y vaca",
            "price": 24,
            "alg": "Gluten · Frutos secos · Lácteos · Sulfitos"
          }
        ]
      },
      {
        "title": "Main Dishes",
        "items": [
          {
            "id": "a-pappardelle",
            "name": "Pappardelle Frutti Di Mare",
            "desc": "Salteada con mejillones, almejas, calamar, ajo, vino blanco y tomate",
            "price": 32,
            "alg": "Gluten · Huevo · Moluscos · Sulfitos"
          },
          {
            "id": "a-neapolitan",
            "name": "Neapolitan Pasta",
            "desc": "Salsa de tomate, infusión de albahaca fresca y AOVE",
            "price": 26,
            "alg": "Gluten",
            "variant": {
              "label": "Pasta",
              "options": [
                "Penne",
                "Spaghetti"
              ],
              "required": true
            }
          },
          {
            "id": "a-tuna",
            "name": "Barbate Bluefin Tuna Tartar",
            "desc": "Corte de cuchillo con mango de Axarquía y huevo frito",
            "price": 28,
            "alg": "Pescado · Huevo"
          },
          {
            "id": "a-tenderloin",
            "name": "Beef Tenderloin",
            "desc": "Centro de solomillo con puré de patata trufado y verduras de temporada",
            "price": 39,
            "alg": "Lácteos",
            "variant": {
              "label": "Punto de la carne",
              "options": [
                "Rare (muy poco hecha)",
                "Medium rare (poco hecha)",
                "Medium (al punto)",
                "Medium well (hecha)",
                "Well done (muy hecha)"
              ]
            }
          },
          {
            "id": "a-chicken",
            "name": "Chicken Tender",
            "desc": "Tiras de pollo crujientes con patatas fritas y salsas mayonesa, kétchup y mostaza",
            "price": 18,
            "alg": "Gluten · Huevo · Mostaza",
            "variant": {
              "label": "Salsas de acompañamiento",
              "multi": true,
              "options": [
                "Kétchup",
                "Mostaza",
                "Mayonesa"
              ],
              "required": true,
              "minSelections": 1
            }
          }
        ]
      },
      {
        "title": "Pizza",
        "items": [
          {
            "id": "a-margherita",
            "name": "Margherita Pizza",
            "desc": "Masa crujiente, base de tomate natural y mozzarella auténtica",
            "price": 30,
            "alg": "Gluten · Lácteos"
          },
          {
            "id": "a-4cheese",
            "name": "Four Andalusian Cheese Pizza",
            "desc": "Base crujiente, tomate natural y selección de quesos andaluces fundidos",
            "price": 32,
            "alg": "Gluten · Lácteos"
          },
          {
            "id": "a-pepperoni",
            "name": "Spicy Pepperoni Pizza",
            "desc": "Base crujiente, salsa de tomate natural, mozzarella fundida y pepperoni picante",
            "price": 28,
            "alg": "Gluten · Lácteos · Cerdo"
          }
        ]
      },
      {
        "title": "Sandwich & Burger",
        "items": [
          {
            "id": "a-burger",
            "name": "Homemade Beef Burger",
            "desc": "Ternera madurada, salsa Café de Paris, brioche, tomate, cheddar y bacon + patatas fritas",
            "price": 26,
            "alg": "Gluten · Lácteos · Mostaza · Cerdo",
            "variant": {
              "label": "Punto de la carne",
              "options": [
                "Rare (muy poco hecha)",
                "Medium rare (poco hecha)",
                "Medium (al punto)",
                "Medium well (hecha)",
                "Well done (muy hecha)"
              ]
            },
            "variant2": {
              "label": "Personalización",
              "multi": true,
              "options": [
                "Sin tomate",
                "Sin bacon",
                "Sin queso",
                "Sin salsa",
                "Salsa aparte"
              ]
            }
          },
          {
            "id": "a-club",
            "name": "Club Sandwich",
            "desc": "Triple decker con pollo, bacon, huevo, lechuga, tomate y mayonesa",
            "price": 21,
            "alg": "Gluten · Huevo · Cerdo",
            "variant": {
              "label": "Jamón",
              "options": [
                "Jamón cocido",
                "Jamón de pavo"
              ],
              "required": true
            },
            "variant2": {
              "label": "Preparación",
              "multi": true,
              "options": [
                "Sin bacon",
                "Sin mayonesa"
              ]
            }
          },
          {
            "id": "a-bikini",
            "name": "Bikini Kimpton Los Monteros",
            "desc": "Pastrami jugoso, rúcula y vinagreta de mostaza y miel en pan brioche",
            "price": 16,
            "alg": "Gluten · Mostaza"
          }
        ]
      },
      {
        "title": "Salads",
        "items": [
          {
            "id": "a-caesarp",
            "name": "Caesar Salad with Prawns",
            "desc": "Clásica Caesar con langostinos tigre, picatostes y parmesano",
            "price": 26,
            "alg": "Gluten · Huevo · Lácteos · Sulfitos · Crustáceos",
            "variant": {
              "label": "Preparación (puedes marcar varias)",
              "multi": true,
              "options": [
                "Sin anchoas",
                "Sin croutons (picatostes)",
                "Salsa aparte"
              ]
            }
          },
          {
            "id": "a-caesarc",
            "name": "Caesar Salad with Chicken",
            "desc": "Clásica Caesar con pollo a la parrilla, picatostes y parmesano",
            "price": 21,
            "alg": "Gluten · Huevo · Pescado · Lácteos · Sulfitos",
            "variant": {
              "label": "Preparación (puedes marcar varias)",
              "multi": true,
              "options": [
                "Sin anchoas",
                "Sin croutons (picatostes)",
                "Salsa aparte"
              ]
            }
          },
          {
            "id": "a-green",
            "name": "Green Salad",
            "desc": "Brotes tiernos, tomate cherry, pepino y vinagreta de mostaza y miel",
            "price": 21,
            "alg": "Mostaza · Sulfitos"
          }
        ]
      },
      {
        "title": "Desserts",
        "items": [
          {
            "id": "a-payoyo",
            "name": "Payoyo Cheesecake",
            "desc": "Queso Payoyo horneado, base de galleta, culis de mango o frutos rojos y chocolate blanco",
            "price": 16,
            "alg": "Gluten · Lácteos"
          },
          {
            "id": "a-sphere",
            "name": "Dark Chocolate, Hazelnut & Caramel Sphere",
            "desc": "Esfera de mousse de chocolate negro, base de financier y crema de avellana",
            "price": 16,
            "alg": "Gluten · Lácteos · Frutos secos"
          },
          {
            "id": "a-fruitplatter",
            "name": "Seasonal Fruit Plate",
            "desc": "Selección de fruta de temporada cortada",
            "price": 16,
            "alg": "Ninguno declarado"
          },
          {
            "id": "a-baileys",
            "name": "Three-phase Coffee with Baileys",
            "desc": "Bizcocho empapado en Baileys, ganache de Baileys con crema de café y cacao",
            "price": 16,
            "alg": "Gluten · Lácteos · Alcohol"
          },
          {
            "id": "a-pistachio",
            "name": "Pistachio Rocher with Raspberry Explosion",
            "desc": "Mousse de pistacho, corazón de frambuesa y arándanos, chocolate blanco dorado",
            "price": 16,
            "alg": "Gluten · Lácteos · Frutos secos"
          },
          {
            "id": "a-citrus",
            "name": "Citrus Creamy with Maria Biscuits",
            "desc": "Crema cítrica, merengue tostado y frutos rojos sobre galleta María",
            "price": 16,
            "alg": "Gluten · Huevo · Lácteos"
          },
          {
            "id": "a-sweetsin",
            "name": "Sweet Sin",
            "desc": "Chef's daily creation",
            "price": 16,
            "alg": "Consultar alérgenos con Room Service"
          }
        ]
      }
    ]
  },
  "night": {
    "label": "Night Menu",
    "sub": "03:00 – 07:00",
    "hours": "03:00 – 07:00",
    "sections": [
      {
        "title": "Night Menu",
        "items": [
          {
            "id": "n-burger",
            "name": "Homemade Beef Burger",
            "desc": "Ternera madurada, salsa Café de Paris, brioche, cheddar y bacon",
            "price": 34,
            "alg": "Gluten · Lácteos · Mostaza · Cerdo",
            "variant": {
              "label": "Punto de la carne",
              "options": [
                "Rare (muy poco hecha)",
                "Medium rare (poco hecha)",
                "Medium (al punto)",
                "Medium well (hecha)",
                "Well done (muy hecha)"
              ]
            },
            "variant2": {
              "label": "Preparación",
              "multi": true,
              "options": [
                "Sin cerdo (sin bacon)",
                "Sin salsa",
                "Salsa aparte"
              ]
            }
          },
          {
            "id": "n-lasagna",
            "name": "Bolognese Lasagna",
            "desc": "Ragú boloñesa con bechamel y queso gratinado",
            "price": 32,
            "alg": "Gluten · Huevo · Lácteos · Cerdo · Sulfitos"
          },
          {
            "id": "n-ham",
            "name": "Ham from Dehesa de los Monteros",
            "desc": "Pan de cristal y tomates confitados en aceite de oliva para compartir",
            "price": 39,
            "alg": "Gluten · Cerdo · Sulfitos"
          },
          {
            "id": "n-salmon",
            "name": "Smoked Salmon with Garnish",
            "desc": "Salmón ahumado, ensalada, alcaparras y crema de eneldo",
            "price": 18,
            "alg": "Pescado · Lácteos · Sulfitos"
          },
          {
            "id": "n-hcsandwich",
            "name": "Ham and Cheese Sandwich",
            "desc": "Sándwich de jamón y queso tostado con mantequilla",
            "price": 16,
            "alg": "Gluten · Lácteos · Cerdo",
            "variant": {
              "label": "Jamón",
              "options": [
                "Jamón cocido",
                "Jamón de pavo"
              ]
            }
          },
          {
            "id": "n-club",
            "name": "Club Sandwich Los Monteros",
            "desc": "Triple decker con pollo, bacon, huevo y verduras frescas",
            "price": 21,
            "alg": "Gluten · Huevo · Cerdo",
            "variant": {
              "label": "Preparación",
              "multi": true,
              "options": [
                "Sin cerdo (sin bacon)",
                "Sin mayonesa"
              ]
            },
            "variant2": {
              "label": "Jamón",
              "options": [
                "Jamón cocido",
                "Jamón de pavo"
              ]
            }
          },
          {
            "id": "n-bikini",
            "name": "Bikini Los Monteros",
            "desc": "Pastrami jugoso, rúcula y vinagreta de mostaza y miel",
            "price": 16,
            "alg": "Gluten · Mostaza"
          },
          {
            "id": "n-cheese",
            "name": "Cheese Platter",
            "desc": "Variedad de quesos de cabra, oveja y vaca con frutos secos y miel",
            "price": 26,
            "alg": "Gluten · Lácteos · Frutos secos"
          },
          {
            "id": "n-flan",
            "name": "Cream Flan",
            "desc": "Flan de crema casero con caramelo",
            "price": 16,
            "alg": "Huevo · Lácteos"
          },
          {
            "id": "n-baileys",
            "name": "Three-phase Coffee with Baileys",
            "desc": "Bizcocho empapado en Baileys con ganache y crema de café",
            "price": 16,
            "alg": "Gluten · Lácteos · Alcohol"
          },
          {
            "id": "n-pistachio",
            "name": "Pistachio Rocher with Raspberry Explosion",
            "desc": "Mousse de pistacho con corazón de frambuesa",
            "price": 16,
            "alg": "Gluten · Lácteos · Frutos secos"
          },
          {
            "id": "n-citrus",
            "name": "Citrus Creamy",
            "desc": "Crema cítrica, merengue tostado y frutos rojos sobre galleta",
            "price": 16,
            "alg": "Gluten · Huevo · Lácteos"
          }
        ]
      }
    ]
  },
  "kids": {
    "label": "Kids Menu",
    "sub": "Menú infantil",
    "hours": "Con la carta All Day Menu (12:00 – 03:00)",
    "sections": [
      {
        "title": "Kids Menu · Menú Infantil",
        "items": [
          {
            "id": "k-burger",
            "name": "Kids Beef Burger with Cheese",
            "desc": "Hamburguesa de ternera con queso, acompañada de patatas fritas",
            "price": 17,
            "alg": "—",
            "variant": {
              "label": "Punto de la carne",
              "options": [
                "Rare (muy poco hecha)",
                "Medium rare (poco hecha)",
                "Medium (al punto)",
                "Medium well (hecha)",
                "Well done (muy hecha)"
              ]
            }
          },
          {
            "id": "k-pizza",
            "name": "Mini Margherita Pizza",
            "desc": "Mini pizza margarita",
            "price": 19,
            "alg": "—"
          },
          {
            "id": "k-chicken",
            "name": "Crispy Chicken Fingers with French Fries",
            "desc": "Lágrimas de pollo con patatas fritas",
            "price": 18,
            "alg": "—"
          },
          {
            "id": "k-bolognese",
            "name": "Pasta Bolognese",
            "desc": "Pasta boloñesa",
            "price": 18,
            "alg": "—",
            "variant": {
              "label": "Pasta",
              "options": [
                "Penne",
                "Spaghetti"
              ]
            }
          },
          {
            "id": "k-napoletana",
            "name": "Pasta Napoletana",
            "desc": "Pasta napolitana",
            "price": 17,
            "alg": "—",
            "variant": {
              "label": "Pasta",
              "options": [
                "Penne",
                "Spaghetti"
              ]
            }
          },
          {
            "id": "k-chickenbreast",
            "name": "Chicken Breast with Vegetables",
            "desc": "Pechuga de pollo con verduras",
            "price": 18,
            "alg": "—"
          },
          {
            "id": "k-salmon",
            "name": "Salmon with Mashed Potatoes",
            "desc": "Salmón con puré de patatas",
            "price": 21,
            "alg": "—"
          },
          {
            "id": "k-tomato",
            "name": "Tomato Salad with EVOO",
            "desc": "Ensalada de tomate con AOVE",
            "price": 16,
            "alg": "—"
          }
        ]
      }
    ]
  },
  "drinks": {
    "label": "Bebidas",
    "sub": "Disponible 24 h",
    "hours": "Disponible 24 h",
    "sections": [
      {
        "title": "Refrescos",
        "items": [
          {
            "id": "d-cocacola",
            "name": "Coca-Cola",
            "price": 6,
            "alg": "—"
          },
          {
            "id": "d-cocacolazero",
            "name": "Coca-Cola Zero",
            "price": 6,
            "alg": "—"
          },
          {
            "id": "d-fantanaranja",
            "name": "Fanta Naranja",
            "price": 6,
            "alg": "—"
          },
          {
            "id": "d-fantalimon",
            "name": "Fanta Limón",
            "price": 6,
            "alg": "—"
          },
          {
            "id": "d-sprite",
            "name": "Sprite",
            "price": 6,
            "alg": "—"
          },
          {
            "id": "d-tonica",
            "name": "Tónica Fever Tree",
            "price": 6,
            "alg": "—"
          },
          {
            "id": "d-soda",
            "name": "Soda Fever Tree",
            "price": 6,
            "alg": "—"
          },
          {
            "id": "d-nestea",
            "name": "Nestea",
            "price": 6,
            "alg": "—"
          },
          {
            "id": "d-aquariuslimon",
            "name": "Aquarius Limón",
            "price": 6,
            "alg": "—"
          },
          {
            "id": "d-aquariusnaranja",
            "name": "Aquarius Naranja",
            "price": 6,
            "alg": "—"
          },
          {
            "id": "d-redbull",
            "name": "Red Bull",
            "price": 7,
            "alg": "—"
          }
        ]
      },
      {
        "title": "Aguas",
        "items": [
          {
            "id": "x-voss-still",
            "name": "Voss sin gas 375 ml",
            "desc": "Agua artesiana sin gas",
            "price": 7,
            "alg": "—"
          },
          {
            "id": "x-voss-sparkling",
            "name": "Voss con gas 375 ml",
            "desc": "Agua artesiana con gas",
            "price": 7,
            "alg": "—"
          },
          {
            "id": "x-panna",
            "name": "Acqua Panna 750 ml",
            "desc": "Agua sin gas",
            "price": 7,
            "alg": "—"
          },
          {
            "id": "x-pellegrino",
            "name": "San Pellegrino 750 ml",
            "desc": "Agua con gas",
            "price": 7,
            "alg": "—"
          }
        ]
      },
      {
        "title": "Zumos",
        "items": [
          {
            "id": "d-zumonaranja",
            "name": "Zumo de Naranja Natural",
            "desc": "Naranja recién exprimida",
            "price": 7,
            "alg": "—"
          },
          {
            "id": "d-zumopina",
            "name": "Zumo de Piña (botellín)",
            "price": 7,
            "alg": "—"
          },
          {
            "id": "d-zumomanzana",
            "name": "Zumo de Manzana (botellín)",
            "price": 7,
            "alg": "—"
          },
          {
            "id": "d-zumomelocoton",
            "name": "Zumo de Melocotón (botellín)",
            "price": 7,
            "alg": "—"
          },
          {
            "id": "d-zumotomate",
            "name": "Zumo de Tomate (botellín)",
            "price": 7,
            "alg": "—"
          },
          {
            "id": "d-zumoarandanos",
            "name": "Zumo de Arándanos (botellín)",
            "price": 7,
            "alg": "—"
          }
        ]
      },
      {
        "title": "Smoothies",
        "until1am": true,
        "items": [
          {
            "id": "d-bluemoon",
            "name": "Blue Moon",
            "desc": "Mango, plátano, açaí, arándanos",
            "price": 12,
            "alg": "—"
          },
          {
            "id": "d-tropical",
            "name": "Tropical",
            "desc": "Mango, papaya, piña",
            "price": 12,
            "alg": "—"
          },
          {
            "id": "d-energy",
            "name": "Energy",
            "desc": "Zanahoria, manzana, pera, jengibre",
            "price": 12,
            "alg": "—"
          },
          {
            "id": "d-vitality",
            "name": "Vitality",
            "desc": "Pepino, col rizada, piña, espinaca",
            "price": 12,
            "alg": "—"
          },
          {
            "id": "d-waterberry",
            "name": "Waterberry",
            "desc": "Sandía, mango, fresa, semillas de chía",
            "price": 12,
            "alg": "Sésamo (chía)"
          }
        ],
        "hours": "09:00 – 01:00"
      },
      {
        "title": "Cafés",
        "items": [
          {
            "id": "d-espressocoffee",
            "name": "Espresso",
            "price": 5.5,
            "alg": "—",
            "variant": {
              "label": "Tipo",
              "options": [
                "Normal",
                "Descafeinado"
              ]
            }
          },
          {
            "id": "d-doble",
            "name": "Espresso Doble",
            "price": 7,
            "alg": "—",
            "variant": {
              "label": "Tipo",
              "options": [
                "Normal",
                "Descafeinado"
              ]
            }
          },
          {
            "id": "d-cortado",
            "name": "Cortado",
            "price": 5.5,
            "alg": "Lácteos",
            "variant": {
              "label": "Tipo",
              "options": [
                "Normal",
                "Descafeinado"
              ]
            },
            "variant2": {
              "label": "Leche",
              "options": [
                "Normal",
                "Sin lactosa",
                "De avena",
                "De soja",
                "De almendra"
              ]
            }
          },
          {
            "id": "d-americano",
            "name": "Americano",
            "price": 5.5,
            "alg": "—",
            "variant": {
              "label": "Tipo",
              "options": [
                "Normal",
                "Descafeinado"
              ]
            }
          },
          {
            "id": "d-conleche",
            "name": "Café con Leche",
            "price": 6.5,
            "alg": "Lácteos",
            "variant": {
              "label": "Tipo",
              "options": [
                "Normal",
                "Descafeinado"
              ]
            },
            "variant2": {
              "label": "Leche",
              "options": [
                "Normal",
                "Sin lactosa",
                "De avena",
                "De soja",
                "De almendra"
              ]
            }
          },
          {
            "id": "d-latte",
            "name": "Latte",
            "price": 6.5,
            "alg": "Lácteos",
            "variant": {
              "label": "Tipo",
              "options": [
                "Normal",
                "Descafeinado"
              ]
            },
            "variant2": {
              "label": "Leche",
              "options": [
                "Normal",
                "Sin lactosa",
                "De avena",
                "De soja",
                "De almendra"
              ]
            }
          },
          {
            "id": "d-cappuccino",
            "name": "Cappuccino",
            "price": 7,
            "alg": "Lácteos",
            "variant": {
              "label": "Tipo",
              "options": [
                "Normal",
                "Descafeinado"
              ]
            },
            "variant2": {
              "label": "Leche",
              "options": [
                "Normal",
                "Sin lactosa",
                "De avena",
                "De soja",
                "De almendra"
              ]
            }
          },
          {
            "id": "d-flatwhite",
            "name": "Flat White",
            "price": 7,
            "alg": "Lácteos",
            "variant": {
              "label": "Tipo",
              "options": [
                "Normal",
                "Descafeinado"
              ]
            },
            "variant2": {
              "label": "Leche",
              "options": [
                "Normal",
                "Sin lactosa",
                "De avena",
                "De soja",
                "De almendra"
              ]
            }
          },
          {
            "id": "d-frappuccino",
            "name": "Frappuccino",
            "price": 10,
            "alg": "Lácteos",
            "variant2": {
              "label": "Leche",
              "options": [
                "Normal",
                "Sin lactosa",
                "De avena",
                "De soja",
                "De almendra"
              ]
            }
          },
          {
            "id": "d-vmilk",
            "name": "Vanilla Milkshake",
            "price": 10,
            "alg": "Lácteos",
            "variant2": {
              "label": "Leche",
              "options": [
                "Normal",
                "Sin lactosa",
                "De avena",
                "De soja",
                "De almendra"
              ]
            }
          },
          {
            "id": "d-cmilk",
            "name": "Chocolate Milkshake",
            "price": 10,
            "alg": "Lácteos",
            "variant2": {
              "label": "Leche",
              "options": [
                "Normal",
                "Sin lactosa",
                "De avena",
                "De soja",
                "De almendra"
              ]
            }
          },
          {
            "id": "d-icedmatcha",
            "name": "Iced Matcha",
            "price": 10,
            "alg": "—"
          },
          {
            "id": "d-matchacoco",
            "name": "Matcha Frappé with Coconut",
            "price": 10,
            "alg": "—"
          }
        ]
      },
      {
        "title": "Cervezas (botellín)",
        "items": [
          {
            "id": "d-corona",
            "name": "Coronita (botellín)",
            "price": 8,
            "alg": "Gluten · Alcohol"
          },
          {
            "id": "d-victoria",
            "name": "Victoria (botellín)",
            "price": 7,
            "alg": "Gluten · Alcohol"
          },
          {
            "id": "d-damm",
            "name": "Damm (botellín)",
            "price": 7,
            "alg": "Gluten · Alcohol"
          },
          {
            "id": "d-victoria00",
            "name": "Victoria 0.0 (botellín)",
            "price": 6,
            "alg": "Gluten"
          }
        ]
      },
      {
        "title": "Signature Cocktails",
        "until1am": true,
        "items": [
          {
            "id": "d-halloffame",
            "name": "Hall of Fame",
            "desc": "Vodka Grey Goose, passoa, palo santo, soda de vainilla, fruta de la pasión",
            "price": 22,
            "alg": "Alcohol"
          },
          {
            "id": "d-orangita",
            "name": "Orangita",
            "desc": "Tequila Patrón Silver, cordial de naranja, emulsionante",
            "price": 20,
            "alg": "Alcohol"
          },
          {
            "id": "d-berry",
            "name": "Berry Soirée",
            "desc": "Ginebra Bombay Sapphire, Italicus, shrub de fresa, soda",
            "price": 18,
            "alg": "Alcohol"
          },
          {
            "id": "d-havana",
            "name": "Havana Breeze",
            "desc": "Bacardí Blanco, cordial de menta, cardamomo verde, soda",
            "price": 18,
            "alg": "Alcohol"
          },
          {
            "id": "d-sonny",
            "name": "Sonny & Tubbs",
            "desc": "Piña colada de ron clarificada, espuma de hibisco",
            "price": 18,
            "alg": "Alcohol"
          }
        ],
        "hours": "09:00 – 01:00"
      },
      {
        "title": "Cocktails Clásicos",
        "until1am": true,
        "items": [
          {
            "id": "d-margarita",
            "name": "Margarita",
            "price": 18,
            "alg": "Alcohol"
          },
          {
            "id": "d-espresso",
            "name": "Espresso Martini",
            "price": 18,
            "alg": "Alcohol"
          },
          {
            "id": "d-pinacolada",
            "name": "Piña Colada",
            "price": 18,
            "alg": "Alcohol"
          },
          {
            "id": "d-daiquiri",
            "name": "Daiquiri",
            "price": 16,
            "alg": "Alcohol",
            "variant": {
              "label": "Sabor (+2 €)",
              "options": [
                "Clásico",
                "Fresa +2 €",
                "Fruta de la pasión +2 €",
                "Mango +2 €"
              ],
              "deltas": [
                0,
                2,
                2,
                2
              ]
            }
          },
          {
            "id": "d-moscow",
            "name": "Moscow Mule",
            "price": 18,
            "alg": "Alcohol"
          },
          {
            "id": "d-mojito",
            "name": "Mojito",
            "price": 16,
            "alg": "Alcohol",
            "variant": {
              "label": "Sabor (+2 €)",
              "options": [
                "Clásico",
                "Fruta de la pasión +2 €",
                "Fresa +2 €",
                "Mango +2 €"
              ],
              "deltas": [
                0,
                2,
                2,
                2
              ]
            }
          },
          {
            "id": "d-liit",
            "name": "Long Island Iced Tea",
            "price": 18,
            "alg": "Alcohol"
          },
          {
            "id": "d-bloody",
            "name": "Bloody Mary",
            "price": 18,
            "alg": "Alcohol"
          }
        ],
        "hours": "09:00 – 01:00"
      },
      {
        "title": "Mocktails (sin alcohol)",
        "until1am": true,
        "items": [
          {
            "id": "d-costalight",
            "name": "Costa Light",
            "desc": "Arándanos, berry e hibisco",
            "price": 14,
            "alg": "Sin alcohol"
          },
          {
            "id": "d-clockwork",
            "name": "A Clockwork Chill",
            "desc": "Gin 0.0, naranja, soda",
            "price": 14,
            "alg": "Sin alcohol"
          },
          {
            "id": "d-pinkgarden",
            "name": "Pink Garden",
            "desc": "Shrub de fresa, Martini Floreale, tónica",
            "price": 14,
            "alg": "Sin alcohol"
          },
          {
            "id": "d-savage",
            "name": "Savage",
            "desc": "Cordial de pomelo, Martini Vibrante, agave",
            "price": 14,
            "alg": "Sin alcohol"
          },
          {
            "id": "d-pineapple",
            "name": "Pineapple Grove",
            "desc": "Piña láctica, soda, romero",
            "price": 14,
            "alg": "Sin alcohol"
          },
          {
            "id": "d-applemist",
            "name": "Apple Mist",
            "desc": "Zumo de manzana clarificado, soda",
            "price": 14,
            "alg": "Sin alcohol"
          }
        ],
        "hours": "09:00 – 01:00"
      },
      {
        "title": "Spritz",
        "until1am": true,
        "items": [
          {
            "id": "d-aperol",
            "name": "Aperol Spritz",
            "price": 18,
            "alg": "Alcohol"
          },
          {
            "id": "d-hugo",
            "name": "Hugo Spritz",
            "price": 18,
            "alg": "Alcohol"
          },
          {
            "id": "d-floreale",
            "name": "Floreale Spritz",
            "price": 18,
            "alg": "Alcohol"
          },
          {
            "id": "d-fiero",
            "name": "Fiero Spritz",
            "price": 16,
            "alg": "Alcohol"
          },
          {
            "id": "d-virgin",
            "name": "Virgin Spritz",
            "desc": "Sin alcohol",
            "price": 14,
            "alg": "Sin alcohol"
          },
          {
            "id": "d-costa",
            "name": "Costa Spritz · Ars Collecta Blanc de Blanc",
            "desc": "Confirmar precio con bar antes de cerrar la comanda",
            "price": 0,
            "alg": "Alcohol",
            "priceNote": "Consultar"
          }
        ],
        "hours": "09:00 – 01:00"
      },
      {
        "title": "Sangría (por copa)",
        "until1am": true,
        "items": [
          {
            "id": "d-sangriatinto",
            "name": "Sangría de vino tinto (copa)",
            "price": 12,
            "alg": "Alcohol · Sulfitos"
          },
          {
            "id": "d-sangriablanco",
            "name": "Sangría de vino blanco (copa)",
            "price": 12,
            "alg": "Alcohol · Sulfitos"
          },
          {
            "id": "d-sangriarosado",
            "name": "Sangría de vino rosado (copa)",
            "price": 12,
            "alg": "Alcohol · Sulfitos"
          },
          {
            "id": "d-sangriaars",
            "name": "Bubbles Sangría Ars Collecta (copa)",
            "price": 15,
            "alg": "Alcohol · Sulfitos"
          },
          {
            "id": "d-sangrialp",
            "name": "Sangría Laurent Perrier Blanc de Blancs (copa)",
            "price": 28,
            "alg": "Alcohol · Sulfitos"
          }
        ],
        "hours": "09:00 – 01:00"
      },
      {
        "title": "Espumosos y Aperitivos",
        "until1am": true,
        "items": [
          {
            "id": "d-drymartini",
            "name": "Dry Martini",
            "price": 18,
            "alg": "Alcohol"
          },
          {
            "id": "d-negroni",
            "name": "Negroni",
            "price": 18,
            "alg": "Alcohol"
          },
          {
            "id": "d-martinirosso",
            "name": "Martini Rosso",
            "price": 12,
            "alg": "Alcohol"
          },
          {
            "id": "d-bellini",
            "name": "Bellini",
            "price": 14,
            "alg": "Alcohol"
          },
          {
            "id": "d-mimosa",
            "name": "Mimosa",
            "price": 14,
            "alg": "Alcohol",
            "variant": {
              "label": "Versión",
              "options": [
                "Clásico — 14 €",
                "Con Laurent Perrier +6 €"
              ],
              "deltas": [
                0,
                6
              ]
            }
          }
        ],
        "hours": "09:00 – 01:00"
      }
    ]
  },
  "extras": {
    "label": "Extras",
    "sub": "Suplementos",
    "hours": "Suplementos de servicio",
    "sections": [
      {
        "title": "Hielo",
        "items": [
          {
            "id": "x-hielo",
            "name": "Servicio de hielo",
            "desc": "Cubitera con hielo para la habitación",
            "price": 6,
            "alg": "—"
          }
        ]
      },
      {
        "title": "Extras",
        "items": [
          {
            "id": "x-pan",
            "name": "Servicio de pan",
            "desc": "Pan adicional",
            "price": 3,
            "alg": "—"
          },
          {
            "id": "x-pollo",
            "name": "Extra pollo",
            "desc": "Suplemento de pollo",
            "price": 6,
            "alg": "—"
          },
          {
            "id": "x-prawns",
            "name": "Extra prawns",
            "desc": "Suplemento de langostinos",
            "price": 6,
            "alg": "—"
          },
          {
            "id": "x-fries",
            "name": "Extra patatas fritas",
            "desc": "Ración extra de patatas fritas",
            "price": 6,
            "alg": "—"
          },
          {
            "id": "x-arroz",
            "name": "Extra arroz blanco",
            "desc": "Ración extra de arroz blanco",
            "price": 6,
            "alg": "—"
          },
          {
            "id": "x-consome",
            "name": "Consomé de pollo",
            "desc": "Consomé de pollo",
            "price": 18,
            "alg": "—"
          }
        ]
      },
      {
        "title": "Menaje adicional",
        "items": [
          {
            "id": "x-menaje",
            "name": "Menaje adicional",
            "desc": "Platos, bowls o cubiertos adicionales",
            "price": 6,
            "alg": "—",
            "maxQty": 1,
            "priceNote": "6 €"
          }
        ]
      }
    ]
  }
};
