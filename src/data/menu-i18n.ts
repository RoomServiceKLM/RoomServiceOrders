export type MenuLanguage = 'es' | 'en'

type LocalizedText = Record<MenuLanguage, string>

type LocalizedItem = {
  name: LocalizedText
  desc?: LocalizedText
}

export const ITEM_I18N: Record<string, LocalizedItem> = {
  'b-eggsben': {
    name: { es: 'Huevos Benedict', en: 'Eggs Benedict' },
    desc: {
      es: 'Jamón, salsa holandesa, cebollino y pan brioche',
      en: 'Ham, hollandaise sauce, chives and brioche bread',
    },
  },
  'b-continental': {
    name: { es: 'Desayuno continental', en: 'Continental Breakfast' },
    desc: {
      es: 'Bebida caliente + zumo de naranja natural, selección de panadería, mantequilla y mermeladas',
      en: 'Hot drink + freshly squeezed orange juice, bakery selection, butter and jams',
    },
  },
  'b-croque': {
    name: { es: 'Croque Madame', en: 'Croque Madame' },
    desc: {
      es: 'Queso cheddar curado, pavo ahumado, huevo frito y mezclum',
      en: 'Mature cheddar cheese, smoked turkey, fried egg and mixed leaves',
    },
  },
  'b-acai': {
    name: { es: 'Bowl de açaí', en: 'Açaí Bowl' },
    desc: {
      es: 'Frutas del bosque, plátano, kiwi, coco y granola casera',
      en: 'Berries, banana, kiwi, coconut and homemade granola',
    },
  },
  'b-frittata': {
    name: { es: 'Tortilla frittata', en: 'Omelette Frittata' },
    desc: {
      es: 'Parmesano, calabacín baby, tomates cherry y albahaca',
      en: 'Parmesan, baby courgette, cherry tomatoes and basil',
    },
  },
  'b-iberian': {
    name: { es: 'Selección de charcutería ibérica', en: 'Iberian Charcuterie Selection' },
    desc: {
      es: 'Selección de charcutería ibérica para desayuno',
      en: 'Breakfast selection of Iberian cured meats',
    },
  },
  'b-pancakes': {
    name: { es: 'Tortitas esponjosas', en: 'Fluffy Pancakes' },
    desc: {
      es: 'Praliné de chocolate, plátano, nata montada y caramelo',
      en: 'Chocolate praline, banana, whipped cream and caramel',
    },
  },
  'b-green': {
    name: { es: 'Tortilla verde saludable', en: 'Green Healthy Omelette' },
    desc: {
      es: 'Clara de huevo, espinacas baby, salmón ahumado y espárragos',
      en: 'Egg white, baby spinach, smoked salmon and asparagus',
    },
  },
  'b-fruit': {
    name: { es: 'Fruta de temporada', en: 'Seasonal Fruit' },
    desc: { es: 'Fruta de temporada', en: 'Seasonal fruit' },
  },
  'b-croissant': {
    name: { es: 'Croissant', en: 'Croissant' },
    desc: {
      es: 'Croissant de mantequilla casero; mixto con jamón o pavo y queso',
      en: 'Homemade butter croissant; filled with ham or turkey and cheese',
    },
  },
  'b-yogurt': {
    name: { es: 'Yogur Pastoret', en: 'Pastoret Yogurt' },
    desc: { es: 'Yogur Pastoret', en: 'Pastoret yogurt' },
  },
  'b-cereals': {
    name: { es: 'Cereales', en: 'Cereals' },
    desc: { es: 'Elige tus cereales favoritos', en: 'Choose your favourite cereals' },
  },
  'b-eggs': {
    name: { es: 'Huevos', en: 'Eggs' },
    desc: { es: 'Huevos al gusto', en: 'Eggs cooked to your liking' },
  },
  'b-tortilla': {
    name: { es: 'Tortilla al gusto', en: 'Custom Omelette' },
    desc: {
      es: 'Tortilla con ingredientes a elegir',
      en: 'Omelette with your choice of ingredients',
    },
  },
  'b-pastries': {
    name: { es: 'Bollería', en: 'Pastries' },
    desc: {
      es: 'Pastelería casera (6 piezas), mantequilla y mermeladas',
      en: 'Homemade pastries (6 pieces), butter and jams',
    },
  },
  'b-bread': {
    name: { es: 'Pan', en: 'Bread' },
    desc: {
      es: 'Pan casero (4 piezas), mantequilla, mermeladas caseras y miel ecológica',
      en: 'Homemade bread (4 pieces), butter, homemade jams and organic honey',
    },
  },
  'b-toast': {
    name: { es: 'Tostadas', en: 'Toast' },
    desc: {
      es: 'Tostadas (4 piezas), mantequilla, mermeladas caseras y miel ecológica',
      en: 'Toast (4 pieces), butter, homemade jams and organic honey',
    },
  },
  'b-sausages': {
    name: { es: 'Salchichas, bacon o verduras de temporada', en: 'Sausages, Bacon or Seasonal Vegetables' },
    desc: { es: 'A la plancha', en: 'Grilled' },
  },
  'b-cheese': {
    name: { es: 'Selección de quesos', en: 'Cheese Selection' },
    desc: {
      es: 'Selección de quesos para desayuno: cabra, oveja y vaca',
      en: 'Breakfast cheese selection: goat, sheep and cow cheeses',
    },
  },
  'a-oysters': {
    name: { es: 'Ostras', en: 'Oysters' },
    desc: {
      es: 'Precio por unidad · Pedido mínimo 2 unidades',
      en: 'Price per unit · Minimum order 2 units',
    },
  },
  'a-anchovy': {
    name: { es: 'Anchoas', en: 'Anchovies' },
    desc: {
      es: 'Selección de anchoas artesanales en conserva sobre lecho de tomate natural rallado',
      en: 'Selection of artisan preserved anchovies on a bed of grated fresh tomato',
    },
  },
  'a-sardine': {
    name: { es: 'Tosta de sardina ahumada', en: 'Smoked Sardine Toast' },
    desc: {
      es: 'Deshuesadas con pan brioche enmantecado, queso de cabra fresco de Málaga y miel',
      en: 'Deboned sardines on buttered brioche with fresh Málaga goat cheese and honey',
    },
  },
  'a-gazpacho': {
    name: { es: 'Gazpacho andaluz', en: 'Andalusian Gazpacho' },
    desc: {
      es: 'Tomate ecológico, pepino y sardina ahumada',
      en: 'Organic tomato, cucumber and smoked sardine',
    },
  },
  'a-ham': {
    name: { es: 'Jamón de la Dehesa de los Monteros', en: 'Ham from Dehesa de los Monteros' },
    desc: {
      es: 'Pan de cristal, tomate rallado y aceite de oliva',
      en: 'Crystal bread, grated tomato and olive oil',
    },
  },
  'a-cheeseboard': {
    name: { es: 'Tabla de quesos', en: 'Cheese Board' },
    desc: {
      es: 'Variedad de quesos de cabra, oveja y vaca',
      en: 'Selection of goat, sheep and cow cheeses',
    },
  },
  'a-pappardelle': {
    name: { es: 'Pappardelle Frutti di Mare', en: 'Pappardelle Frutti Di Mare' },
    desc: {
      es: 'Salteada con mejillones, almejas, calamar, ajo, vino blanco y tomate',
      en: 'Sautéed with mussels, clams, squid, garlic, white wine and tomato',
    },
  },
  'a-neapolitan': {
    name: { es: 'Pasta napolitana', en: 'Neapolitan Pasta' },
    desc: {
      es: 'Salsa de tomate, infusión de albahaca fresca y AOVE',
      en: 'Tomato sauce, fresh basil infusion and extra virgin olive oil',
    },
  },
  'a-tuna': {
    name: { es: 'Tartar de atún rojo de Barbate', en: 'Barbate Bluefin Tuna Tartar' },
    desc: {
      es: 'Corte de cuchillo con mango de Axarquía y huevo frito',
      en: 'Knife-cut tuna with Axarquía mango and fried egg',
    },
  },
  'a-tenderloin': {
    name: { es: 'Solomillo de ternera', en: 'Beef Tenderloin' },
    desc: {
      es: 'Centro de solomillo con puré de patata trufado y verduras de temporada',
      en: 'Centre-cut tenderloin with truffled mashed potato and seasonal vegetables',
    },
  },
  'a-chicken': {
    name: { es: 'Tiras de pollo crujientes', en: 'Chicken Tenders' },
    desc: {
      es: 'Tiras de pollo crujientes con patatas fritas y salsas mayonesa, kétchup y mostaza',
      en: 'Crispy chicken strips with French fries and mayonnaise, ketchup and mustard sauces',
    },
  },
  'a-margherita': {
    name: { es: 'Pizza margarita', en: 'Margherita Pizza' },
    desc: {
      es: 'Masa crujiente, base de tomate natural y mozzarella auténtica',
      en: 'Crispy dough, fresh tomato base and authentic mozzarella',
    },
  },
  'a-4cheese': {
    name: { es: 'Pizza de cuatro quesos andaluces', en: 'Four Andalusian Cheese Pizza' },
    desc: {
      es: 'Base crujiente, tomate natural y selección de quesos andaluces fundidos',
      en: 'Crispy base, fresh tomato and a selection of melted Andalusian cheeses',
    },
  },
  'a-pepperoni': {
    name: { es: 'Pizza de pepperoni picante', en: 'Spicy Pepperoni Pizza' },
    desc: {
      es: 'Base crujiente, salsa de tomate natural, mozzarella fundida y pepperoni picante',
      en: 'Crispy base, fresh tomato sauce, melted mozzarella and spicy pepperoni',
    },
  },
  'a-burger': {
    name: { es: 'Hamburguesa casera de ternera', en: 'Homemade Beef Burger' },
    desc: {
      es: 'Ternera madurada, salsa Café de Paris, brioche, tomate, cheddar y bacon + patatas fritas',
      en: 'Aged beef, Café de Paris sauce, brioche, tomato, cheddar and bacon + French fries',
    },
  },
  'a-club': {
    name: { es: 'Sándwich club', en: 'Club Sandwich' },
    desc: {
      es: 'Triple decker con pollo, bacon, huevo, lechuga, tomate y mayonesa',
      en: 'Triple-decker with chicken, bacon, egg, lettuce, tomato and mayonnaise',
    },
  },
  'a-bikini': {
    name: { es: 'Bikini Kimpton Los Monteros', en: 'Bikini Kimpton Los Monteros' },
    desc: {
      es: 'Pastrami jugoso, rúcula y vinagreta de mostaza y miel en pan brioche',
      en: 'Juicy pastrami, rocket and honey-mustard vinaigrette on brioche bread',
    },
  },
  'a-caesarp': {
    name: { es: 'Ensalada César con langostinos', en: 'Caesar Salad with Prawns' },
    desc: {
      es: 'Clásica Caesar con langostinos tigre, picatostes y parmesano',
      en: 'Classic Caesar with tiger prawns, croutons and Parmesan',
    },
  },
  'a-caesarc': {
    name: { es: 'Ensalada César con pollo', en: 'Caesar Salad with Chicken' },
    desc: {
      es: 'Clásica Caesar con pollo a la parrilla, picatostes y parmesano',
      en: 'Classic Caesar with grilled chicken, croutons and Parmesan',
    },
  },
  'a-green': {
    name: { es: 'Ensalada verde', en: 'Green Salad' },
    desc: {
      es: 'Brotes tiernos, tomate cherry, pepino y vinagreta de mostaza y miel',
      en: 'Tender leaves, cherry tomato, cucumber and honey-mustard vinaigrette',
    },
  },
  'a-payoyo': {
    name: { es: 'Tarta de queso Payoyo', en: 'Payoyo Cheesecake' },
    desc: {
      es: 'Queso Payoyo horneado, base de galleta, culis de mango o frutos rojos y chocolate blanco',
      en: 'Baked Payoyo cheese, biscuit base, mango or red berry coulis and white chocolate',
    },
  },
  'a-sphere': {
    name: { es: 'Esfera de chocolate negro, avellana y caramelo', en: 'Dark Chocolate, Hazelnut & Caramel Sphere' },
    desc: {
      es: 'Esfera de mousse de chocolate negro, base de financier y crema de avellana',
      en: 'Dark chocolate mousse sphere, financier base and hazelnut cream',
    },
  },
  'a-fruitplatter': {
    name: { es: 'Plato de fruta de temporada', en: 'Seasonal Fruit Plate' },
    desc: {
      es: 'Selección de fruta de temporada cortada',
      en: 'Selection of sliced seasonal fruit',
    },
  },
  'a-baileys': {
    name: { es: 'Trifásico de café con Baileys', en: 'Three-phase Coffee with Baileys' },
    desc: {
      es: 'Bizcocho empapado en Baileys, ganache de Baileys con crema de café y cacao',
      en: 'Sponge soaked in Baileys, Baileys ganache with coffee cream and cocoa',
    },
  },
  'a-pistachio': {
    name: { es: 'Rocher de pistacho con explosión de frambuesa', en: 'Pistachio Rocher with Raspberry Explosion' },
    desc: {
      es: 'Mousse de pistacho, corazón de frambuesa y arándanos, chocolate blanco dorado',
      en: 'Pistachio mousse, raspberry and blueberry centre, golden white chocolate',
    },
  },
  'a-citrus': {
    name: { es: 'Cremoso de cítricos con galleta María', en: 'Citrus Creamy with Maria Biscuits' },
    desc: {
      es: 'Crema cítrica, merengue tostado y frutos rojos sobre galleta María',
      en: 'Citrus cream, toasted meringue and red berries over Maria biscuit',
    },
  },
  'a-sweetsin': {
    name: { es: 'Dulce pecado', en: 'Sweet Sin' },
    desc: {
      es: 'Creación del día',
      en: "Chef's daily creation",
    },
  },
  'n-burger': {
    name: { es: 'Hamburguesa casera de ternera', en: 'Homemade Beef Burger' },
    desc: {
      es: 'Ternera madurada, salsa Café de Paris, brioche, cheddar y bacon',
      en: 'Aged beef, Café de Paris sauce, brioche, cheddar and bacon',
    },
  },
  'n-lasagna': {
    name: { es: 'Lasaña boloñesa', en: 'Bolognese Lasagna' },
    desc: {
      es: 'Ragú boloñesa con bechamel y queso gratinado',
      en: 'Bolognese ragù with béchamel and gratinated cheese',
    },
  },
  'n-ham': {
    name: { es: 'Jamón de la Dehesa de los Monteros', en: 'Ham from Dehesa de los Monteros' },
    desc: {
      es: 'Pan de cristal y tomates confitados en aceite de oliva para compartir',
      en: 'Crystal bread and tomatoes confit in olive oil, to share',
    },
  },
  'n-salmon': {
    name: { es: 'Salmón ahumado con guarnición', en: 'Smoked Salmon with Garnish' },
    desc: {
      es: 'Salmón ahumado, ensalada, alcaparras y crema de eneldo',
      en: 'Smoked salmon, salad, capers and dill cream',
    },
  },
  'n-hcsandwich': {
    name: { es: 'Sándwich de jamón y queso', en: 'Ham and Cheese Sandwich' },
    desc: {
      es: 'Sándwich de jamón y queso tostado con mantequilla',
      en: 'Toasted ham and cheese sandwich with butter',
    },
  },
  'n-club': {
    name: { es: 'Sándwich club Los Monteros', en: 'Club Sandwich Los Monteros' },
    desc: {
      es: 'Triple decker con pollo, bacon, huevo y verduras frescas',
      en: 'Triple-decker with chicken, bacon, egg and fresh vegetables',
    },
  },
  'n-bikini': {
    name: { es: 'Bikini Los Monteros', en: 'Bikini Los Monteros' },
    desc: {
      es: 'Pastrami jugoso, rúcula y vinagreta de mostaza y miel',
      en: 'Juicy pastrami, rocket and honey-mustard vinaigrette',
    },
  },
  'n-cheese': {
    name: { es: 'Tabla de quesos', en: 'Cheese Platter' },
    desc: {
      es: 'Variedad de quesos de cabra, oveja y vaca con frutos secos y miel',
      en: 'Selection of goat, sheep and cow cheeses with nuts and honey',
    },
  },
  'n-flan': {
    name: { es: 'Flan de crema', en: 'Cream Flan' },
    desc: {
      es: 'Flan de crema casero con caramelo',
      en: 'Homemade cream flan with caramel',
    },
  },
  'n-baileys': {
    name: { es: 'Trifásico de café con Baileys', en: 'Three-phase Coffee with Baileys' },
    desc: {
      es: 'Bizcocho empapado en Baileys con ganache y crema de café',
      en: 'Sponge soaked in Baileys with ganache and coffee cream',
    },
  },
  'n-pistachio': {
    name: { es: 'Rocher de pistacho con explosión de frambuesa', en: 'Pistachio Rocher with Raspberry Explosion' },
    desc: {
      es: 'Mousse de pistacho con corazón de frambuesa',
      en: 'Pistachio mousse with a raspberry centre',
    },
  },
  'n-citrus': {
    name: { es: 'Cremoso de cítricos', en: 'Citrus Creamy' },
    desc: {
      es: 'Crema cítrica, merengue tostado y frutos rojos sobre galleta',
      en: 'Citrus cream, toasted meringue and red berries over biscuit',
    },
  },
  'k-burger': {
    name: { es: 'Hamburguesa infantil de ternera con queso', en: 'Kids Beef Burger with Cheese' },
    desc: {
      es: 'Hamburguesa de ternera con queso, acompañada de patatas fritas',
      en: 'Beef burger with cheese, served with French fries',
    },
  },
  'k-pizza': {
    name: { es: 'Mini pizza margarita', en: 'Mini Margherita Pizza' },
    desc: { es: 'Mini pizza margarita', en: 'Mini Margherita pizza' },
  },
  'k-chicken': {
    name: { es: 'Lágrimas de pollo crujientes con patatas fritas', en: 'Crispy Chicken Fingers with French Fries' },
    desc: { es: 'Lágrimas de pollo con patatas fritas', en: 'Chicken fingers with French fries' },
  },
  'k-bolognese': {
    name: { es: 'Pasta boloñesa', en: 'Pasta Bolognese' },
    desc: { es: 'Pasta boloñesa', en: 'Bolognese pasta' },
  },
  'k-napoletana': {
    name: { es: 'Pasta napolitana', en: 'Pasta Napoletana' },
    desc: { es: 'Pasta napolitana', en: 'Neapolitan pasta' },
  },
  'k-chickenbreast': {
    name: { es: 'Pechuga de pollo con verduras', en: 'Chicken Breast with Vegetables' },
    desc: { es: 'Pechuga de pollo con verduras', en: 'Chicken breast with vegetables' },
  },
  'k-salmon': {
    name: { es: 'Salmón con puré de patatas', en: 'Salmon with Mashed Potatoes' },
    desc: { es: 'Salmón con puré de patatas', en: 'Salmon with mashed potatoes' },
  },
  'k-tomato': {
    name: { es: 'Ensalada de tomate con AOVE', en: 'Tomato Salad with EVOO' },
    desc: {
      es: 'Ensalada de tomate con aceite de oliva virgen extra',
      en: 'Tomato salad with extra virgin olive oil',
    },
  },
  'd-fantanaranja': {
    name: { es: 'Fanta Naranja', en: 'Orange Fanta' },
  },
  'd-fantalimon': {
    name: { es: 'Fanta Limón', en: 'Lemon Fanta' },
  },
  'd-tonica': {
    name: { es: 'Tónica Fever Tree', en: 'Fever Tree Tonic Water' },
  },
  'd-aquariuslimon': {
    name: { es: 'Aquarius Limón', en: 'Lemon Aquarius' },
  },
  'd-aquariusnaranja': {
    name: { es: 'Aquarius Naranja', en: 'Orange Aquarius' },
  },
  'x-voss-still': {
    name: { es: 'Voss sin gas 375 ml', en: 'Still Voss 375 ml' },
    desc: { es: 'Agua artesiana sin gas', en: 'Still artesian water' },
  },
  'x-voss-sparkling': {
    name: { es: 'Voss con gas 375 ml', en: 'Sparkling Voss 375 ml' },
    desc: { es: 'Agua artesiana con gas', en: 'Sparkling artesian water' },
  },
  'x-panna': {
    name: { es: 'Acqua Panna 750 ml', en: 'Acqua Panna 750 ml' },
    desc: { es: 'Agua sin gas', en: 'Still water' },
  },
  'x-pellegrino': {
    name: { es: 'San Pellegrino 750 ml', en: 'San Pellegrino 750 ml' },
    desc: { es: 'Agua con gas', en: 'Sparkling water' },
  },
  'd-zumonaranja': {
    name: { es: 'Zumo de naranja natural', en: 'Fresh Orange Juice' },
    desc: { es: 'Naranja recién exprimida', en: 'Freshly squeezed orange' },
  },
  'd-zumopina': {
    name: { es: 'Zumo de piña (botellín)', en: 'Pineapple Juice (small bottle)' },
  },
  'd-zumomanzana': {
    name: { es: 'Zumo de manzana (botellín)', en: 'Apple Juice (small bottle)' },
  },
  'd-zumomelocoton': {
    name: { es: 'Zumo de melocotón (botellín)', en: 'Peach Juice (small bottle)' },
  },
  'd-zumotomate': {
    name: { es: 'Zumo de tomate (botellín)', en: 'Tomato Juice (small bottle)' },
  },
  'd-zumoarandanos': {
    name: { es: 'Zumo de arándanos (botellín)', en: 'Cranberry Juice (small bottle)' },
  },
  'd-bluemoon': {
    name: { es: 'Blue Moon', en: 'Blue Moon' },
    desc: { es: 'Mango, plátano, açaí, arándanos', en: 'Mango, banana, açaí, blueberries' },
  },
  'd-tropical': {
    name: { es: 'Tropical', en: 'Tropical' },
    desc: { es: 'Mango, papaya, piña', en: 'Mango, papaya, pineapple' },
  },
  'd-energy': {
    name: { es: 'Energy', en: 'Energy' },
    desc: { es: 'Zanahoria, manzana, pera, jengibre', en: 'Carrot, apple, pear, ginger' },
  },
  'd-vitality': {
    name: { es: 'Vitality', en: 'Vitality' },
    desc: { es: 'Pepino, col rizada, piña, espinaca', en: 'Cucumber, kale, pineapple, spinach' },
  },
  'd-waterberry': {
    name: { es: 'Waterberry', en: 'Waterberry' },
    desc: { es: 'Sandía, mango, fresa, semillas de chía', en: 'Watermelon, mango, strawberry, chia seeds' },
  },
  'd-doble': {
    name: { es: 'Espresso doble', en: 'Double Espresso' },
  },
  'd-conleche': {
    name: { es: 'Café con leche', en: 'Coffee with Milk' },
  },
  'd-vmilk': {
    name: { es: 'Batido de vainilla', en: 'Vanilla Milkshake' },
  },
  'd-cmilk': {
    name: { es: 'Batido de chocolate', en: 'Chocolate Milkshake' },
  },
  'd-icedmatcha': {
    name: { es: 'Matcha frío', en: 'Iced Matcha' },
  },
  'd-matchacoco': {
    name: { es: 'Frappé de matcha con coco', en: 'Matcha Frappé with Coconut' },
  },
  'd-corona': {
    name: { es: 'Coronita (botellín)', en: 'Coronita (bottle)' },
  },
  'd-victoria': {
    name: { es: 'Victoria (botellín)', en: 'Victoria (bottle)' },
  },
  'd-damm': {
    name: { es: 'Damm (botellín)', en: 'Damm (bottle)' },
  },
  'd-victoria00': {
    name: { es: 'Victoria 0.0 (botellín)', en: 'Victoria 0.0 (bottle)' },
  },
  'd-halloffame': {
    name: { es: 'Hall of Fame', en: 'Hall of Fame' },
    desc: {
      es: 'Vodka Grey Goose, Passoa, palo santo, soda de vainilla, fruta de la pasión',
      en: 'Grey Goose vodka, Passoa, palo santo, vanilla soda, passion fruit',
    },
  },
  'd-orangita': {
    name: { es: 'Orangita', en: 'Orangita' },
    desc: {
      es: 'Tequila Patrón Silver, cordial de naranja, emulsionante',
      en: 'Patrón Silver tequila, orange cordial, emulsifier',
    },
  },
  'd-berry': {
    name: { es: 'Berry Soirée', en: 'Berry Soirée' },
    desc: {
      es: 'Ginebra Bombay Sapphire, Italicus, shrub de fresa, soda',
      en: 'Bombay Sapphire gin, Italicus, strawberry shrub, soda',
    },
  },
  'd-havana': {
    name: { es: 'Havana Breeze', en: 'Havana Breeze' },
    desc: {
      es: 'Bacardí Blanco, cordial de menta, cardamomo verde, soda',
      en: 'Bacardí Blanco, mint cordial, green cardamom, soda',
    },
  },
  'd-sonny': {
    name: { es: 'Sonny & Tubbs', en: 'Sonny & Tubbs' },
    desc: {
      es: 'Piña colada de ron clarificada, espuma de hibisco',
      en: 'Clarified rum piña colada, hibiscus foam',
    },
  },
  'd-costalight': {
    name: { es: 'Costa Light', en: 'Costa Light' },
    desc: { es: 'Arándanos, berry e hibisco', en: 'Cranberries, berries and hibiscus' },
  },
  'd-clockwork': {
    name: { es: 'A Clockwork Chill', en: 'A Clockwork Chill' },
    desc: { es: 'Gin 0.0, naranja, soda', en: '0.0 gin, orange, soda' },
  },
  'd-pinkgarden': {
    name: { es: 'Pink Garden', en: 'Pink Garden' },
    desc: { es: 'Shrub de fresa, Martini Floreale, tónica', en: 'Strawberry shrub, Martini Floreale, tonic' },
  },
  'd-savage': {
    name: { es: 'Savage', en: 'Savage' },
    desc: { es: 'Cordial de pomelo, Martini Vibrante, agave', en: 'Grapefruit cordial, Martini Vibrante, agave' },
  },
  'd-pineapple': {
    name: { es: 'Pineapple Grove', en: 'Pineapple Grove' },
    desc: { es: 'Piña láctica, soda, romero', en: 'Lactic pineapple, soda, rosemary' },
  },
  'd-applemist': {
    name: { es: 'Apple Mist', en: 'Apple Mist' },
    desc: { es: 'Zumo de manzana clarificado, soda', en: 'Clarified apple juice, soda' },
  },
  'd-virgin': {
    name: { es: 'Virgin Spritz', en: 'Virgin Spritz' },
    desc: { es: 'Sin alcohol', en: 'Alcohol-free' },
  },
  'd-costa': {
    name: { es: 'Costa Spritz · Ars Collecta Blanc de Blanc', en: 'Costa Spritz · Ars Collecta Blanc de Blanc' },
    desc: {
      es: 'Confirmar precio con bar antes de cerrar la comanda',
      en: 'Confirm the price with the bar before closing the order',
    },
  },
  'd-sangriatinto': {
    name: { es: 'Sangría de vino tinto (copa)', en: 'Red Wine Sangria (glass)' },
  },
  'd-sangriablanco': {
    name: { es: 'Sangría de vino blanco (copa)', en: 'White Wine Sangria (glass)' },
  },
  'd-sangriarosado': {
    name: { es: 'Sangría de vino rosado (copa)', en: 'Rosé Wine Sangria (glass)' },
  },
  'd-sangriaars': {
    name: { es: 'Bubbles Sangría Ars Collecta (copa)', en: 'Bubbles Sangria Ars Collecta (glass)' },
  },
  'd-sangrialp': {
    name: { es: 'Sangría Laurent Perrier Blanc de Blancs (copa)', en: 'Laurent Perrier Blanc de Blancs Sangria (glass)' },
  },
  'x-hielo': {
    name: { es: 'Servicio de hielo', en: 'Ice Service' },
    desc: { es: 'Cubitera con hielo para la habitación', en: 'Ice bucket for the room' },
  },
  'x-pan': {
    name: { es: 'Servicio de pan', en: 'Bread Service' },
    desc: { es: 'Pan adicional', en: 'Additional bread' },
  },
  'x-pollo': {
    name: { es: 'Extra de pollo', en: 'Extra Chicken' },
    desc: { es: 'Suplemento de pollo', en: 'Chicken supplement' },
  },
  'x-prawns': {
    name: { es: 'Extra de langostinos', en: 'Extra Prawns' },
    desc: { es: 'Suplemento de langostinos', en: 'Prawn supplement' },
  },
  'x-fries': {
    name: { es: 'Extra de patatas fritas', en: 'Extra French Fries' },
    desc: { es: 'Ración extra de patatas fritas', en: 'Extra portion of French fries' },
  },
  'x-arroz': {
    name: { es: 'Extra de arroz blanco', en: 'Extra White Rice' },
    desc: { es: 'Ración extra de arroz blanco', en: 'Extra portion of white rice' },
  },
  'x-consome': {
    name: { es: 'Consomé de pollo', en: 'Chicken Consommé' },
    desc: { es: 'Consomé de pollo', en: 'Chicken consommé' },
  },
  'x-menaje': {
    name: { es: 'Menaje adicional', en: 'Additional Tableware' },
    desc: { es: 'Platos, bowls o cubiertos adicionales', en: 'Additional plates, bowls or cutlery' },
  },
}

export const SECTION_I18N: Record<string, LocalizedText> = {
  'Breakfast Menu': { es: 'Menú de desayuno', en: 'Breakfast Menu' },
  Starters: { es: 'Entrantes', en: 'Starters' },
  'Main Dishes': { es: 'Platos principales', en: 'Main Dishes' },
  Pizza: { es: 'Pizzas', en: 'Pizza' },
  'Sandwich & Burger': { es: 'Sándwiches y hamburguesas', en: 'Sandwiches & Burgers' },
  Salads: { es: 'Ensaladas', en: 'Salads' },
  Desserts: { es: 'Postres', en: 'Desserts' },
  'Night Menu': { es: 'Menú de noche', en: 'Night Menu' },
  'Kids Menu · Menú Infantil': { es: 'Menú infantil', en: 'Kids Menu' },
  Refrescos: { es: 'Refrescos', en: 'Soft Drinks' },
  Aguas: { es: 'Aguas', en: 'Waters' },
  Zumos: { es: 'Zumos', en: 'Juices' },
  Smoothies: { es: 'Smoothies', en: 'Smoothies' },
  Cafés: { es: 'Cafés', en: 'Coffee' },
  'Cervezas (botellín)': { es: 'Cervezas (botellín)', en: 'Bottled Beers' },
  'Signature Cocktails': { es: 'Cócteles de autor', en: 'Signature Cocktails' },
  'Cocktails Clásicos': { es: 'Cócteles clásicos', en: 'Classic Cocktails' },
  'Mocktails (sin alcohol)': { es: 'Mocktails (sin alcohol)', en: 'Mocktails (Alcohol-Free)' },
  Spritz: { es: 'Spritz', en: 'Spritz' },
  'Sangría (por copa)': { es: 'Sangría (por copa)', en: 'Sangria (by the Glass)' },
  'Espumosos y Aperitivos': { es: 'Espumosos y aperitivos', en: 'Sparkling Wine & Aperitifs' },
  Hielo: { es: 'Hielo', en: 'Ice' },
  Extras: { es: 'Extras', en: 'Extras' },
  'Menaje adicional': { es: 'Menaje adicional', en: 'Additional Tableware' },
}

export const VARIANT_LABEL_I18N: Record<string, LocalizedText> = {
  Acompañamiento: { es: 'Acompañamiento', en: 'Accompaniment' },
  'Salsas de acompañamiento': {
    es: 'Salsas de acompañamiento',
    en: 'Accompaniment sauces',
  },
  'Bebida caliente': { es: 'Bebida caliente', en: 'Hot drink' },
  Elaboración: { es: 'Elaboración', en: 'Preparation' },
  'Elige una opción': { es: 'Elige una opción', en: 'Choose an option' },
  Ingredientes: { es: 'Ingredientes', en: 'Ingredients' },
  Jamón: { es: 'Jamón', en: 'Ham' },
  Leche: { es: 'Leche', en: 'Milk' },
  Pan: { es: 'Pan', en: 'Bread' },
  Pasta: { es: 'Pasta', en: 'Pasta' },
  Personalización: { es: 'Personalización', en: 'Customisation' },
  Preparación: { es: 'Preparación', en: 'Preparation' },
  'Preparación (puedes marcar varias)': {
    es: 'Preparación (puedes marcar varias)',
    en: 'Preparation (you can select several)',
  },
  'Punto de la carne': { es: 'Punto de la carne', en: 'Meat doneness' },
  Sabor: { es: 'Sabor', en: 'Flavour' },
  'Sabor (+2 €)': { es: 'Sabor (+2 €)', en: 'Flavour (+€2)' },
  Tipo: { es: 'Tipo', en: 'Type' },
  Versión: { es: 'Versión', en: 'Version' },
}

export const VARIANT_OPTION_I18N: Record<string, LocalizedText> = {
  Espresso: { es: 'Espresso', en: 'Espresso' },
  'Espresso doble': { es: 'Espresso doble', en: 'Double espresso' },
  Cortado: { es: 'Cortado', en: 'Cortado' },
  Americano: { es: 'Americano', en: 'Americano' },
  'Café con leche': { es: 'Café con leche', en: 'Coffee with milk' },
  Latte: { es: 'Latte', en: 'Latte' },
  Cappuccino: { es: 'Cappuccino', en: 'Cappuccino' },
  Té: { es: 'Té', en: 'Tea' },
  'Chocolate caliente': { es: 'Chocolate caliente', en: 'Hot chocolate' },
  'Simple — 7 €': { es: 'Simple — 7 €', en: 'Plain — €7' },
  'Mixto de jamón y queso — 11 €': { es: 'Mixto de jamón y queso — 11 €', en: 'Ham and cheese — €11' },
  'Mixto de pavo y queso — 11 €': { es: 'Mixto de pavo y queso — 11 €', en: 'Turkey and cheese — €11' },
  Natural: { es: 'Natural', en: 'Natural' },
  Fresa: { es: 'Fresa', en: 'Strawberry' },
  Melocotón: { es: 'Melocotón', en: 'Peach' },
  Griego: { es: 'Griego', en: 'Greek' },
  'Con leche': { es: 'Con leche', en: 'With milk' },
  'Con yogur': { es: 'Con yogur', en: 'With yogurt' },
  Revueltos: { es: 'Revueltos', en: 'Scrambled' },
  Fritos: { es: 'Fritos', en: 'Fried' },
  Pochados: { es: 'Pochados', en: 'Poached' },
  'Con jamón york': { es: 'Con jamón york', en: 'With cooked ham' },
  'Con queso': { es: 'Con queso', en: 'With cheese' },
  'Con espinacas': { es: 'Con espinacas', en: 'With spinach' },
  'Con tomate': { es: 'Con tomate', en: 'With tomato' },
  'Con cebolla': { es: 'Con cebolla', en: 'With onion' },
  Blanco: { es: 'Blanco', en: 'White' },
  Integral: { es: 'Integral', en: 'Wholemeal' },
  Salchichas: { es: 'Salchichas', en: 'Sausages' },
  Bacon: { es: 'Bacon', en: 'Bacon' },
  'Verduras de temporada': { es: 'Verduras de temporada', en: 'Seasonal vegetables' },
  Penne: { es: 'Penne', en: 'Penne' },
  Spaghetti: { es: 'Spaghetti', en: 'Spaghetti' },
  'Rare (muy poco hecha)': { es: 'Muy poco hecha', en: 'Rare' },
  'Medium rare (poco hecha)': { es: 'Poco hecha', en: 'Medium rare' },
  'Medium (al punto)': { es: 'Al punto', en: 'Medium' },
  'Medium well (hecha)': { es: 'Hecha', en: 'Medium well' },
  'Well done (muy hecha)': { es: 'Muy hecha', en: 'Well done' },
  'Sin tomate': { es: 'Sin tomate', en: 'No tomato' },
  'Sin bacon': { es: 'Sin bacon', en: 'No bacon' },
  'Sin queso': { es: 'Sin queso', en: 'No cheese' },
  'Sin salsa': { es: 'Sin salsa', en: 'No sauce' },
  'Sin mayonesa': { es: 'Sin mayonesa', en: 'No mayonnaise' },
  Kétchup: { es: 'Kétchup', en: 'Ketchup' },
  Mostaza: { es: 'Mostaza', en: 'Mustard' },
  Mayonesa: { es: 'Mayonesa', en: 'Mayonnaise' },
  'Jamón cocido': { es: 'Jamón cocido', en: 'Cooked ham' },
  'Jamón de pavo': { es: 'Jamón de pavo', en: 'Turkey ham' },
  'Sin anchoas': { es: 'Sin anchoas', en: 'No anchovies' },
  'Sin croutons (picatostes)': { es: 'Sin picatostes', en: 'No croutons' },
  'Salsa aparte': { es: 'Salsa aparte', en: 'Sauce on the side' },
  Normal: { es: 'Normal', en: 'Regular' },
  'Sin cerdo (sin bacon)': { es: 'Sin cerdo (sin bacon)', en: 'No pork (no bacon)' },
  Descafeinado: { es: 'Descafeinado', en: 'Decaf' },
  'Sin lactosa': { es: 'Sin lactosa', en: 'Lactose-free' },
  'De avena': { es: 'De avena', en: 'Oat' },
  'De soja': { es: 'De soja', en: 'Soy' },
  'De almendra': { es: 'De almendra', en: 'Almond' },
  Clásico: { es: 'Clásico', en: 'Classic' },
  'Fresa +2 €': { es: 'Fresa +2 €', en: 'Strawberry +€2' },
  'Fruta de la pasión +2 €': { es: 'Fruta de la pasión +2 €', en: 'Passion fruit +€2' },
  'Mango +2 €': { es: 'Mango +2 €', en: 'Mango +€2' },
  'Clásico — 14 €': { es: 'Clásico — 14 €', en: 'Classic — €14' },
  'Con Laurent Perrier +6 €': { es: 'Con Laurent Perrier +6 €', en: 'With Laurent Perrier +€6' },
}

export const PRICE_NOTE_I18N: Record<string, LocalizedText> = {
  Consultar: { es: 'Consultar', en: 'Ask price' },
}
