import { UtensilsCrossed, Fish, Leaf, CakeSlice, Beer } from 'lucide-react';

// Import menu item images - Using Unsplash for placeholder images

// Rice Items
const vegBiryani = 'https://images.unsplash.com/photo-1563379091339-03246963d96a?w=400&h=300&fit=crop';
const vegPulao = 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&h=300&fit=crop';
const jeeraRice = 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop';
const plainRice = 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&h=300&fit=crop';
const kashmiriPulao = 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop';
const hyderabadiBiryani = 'https://images.unsplash.com/photo-1563379091339-03246963d96a?w=400&h=300&fit=crop';
const paneerBiryani = 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&h=300&fit=crop';
const mushroomBiryani = 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop';

// Mocktails
const mintMojito = 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop';
const blueLagoon = 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop';
const pinaCola = 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop';
const watermelonCooler = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop';

// Juices
const orangeJuice = 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop';
const watermelonJuice = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop';
const limeJuice = 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=400&h=300&fit=crop';
const mangoJuice = 'https://images.unsplash.com/photo-1605027990121-3b2c6c7cb9eb?w=400&h=300&fit=crop';
const pineappleJuice = 'https://images.unsplash.com/photo-1589203659831-f1dccf5516c2?w=400&h=300&fit=crop';

// Desserts
const gulabJamun = 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop';
const rasmalai = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop';
const kesarKulfi = 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop';
const iceCream = 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=300&fit=crop';

// Milkshakes
const chocolateMilkshake = 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop';
const strawberryMilkshake = 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop';
const vanillaMilkshake = 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop';
const mangoMilkshake = 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop';

// Sandwiches
const vegGrilledSandwich = 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop';
const cheeseSandwich = 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&h=300&fit=crop';
const vegSandwich = 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop';
const clubSandwich = 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&h=300&fit=crop';

// Dosa & Uttapa
const masalaDosa = 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop';
const onionUttapa = 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop';
const plainDosa = 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop';
const ravaDosa = 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop';

// Breakfast
const poha = 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop';
const upma = 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop';
const idliSambar = 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop';
const vadaPav = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop';

// Salad & Raita
const greenSalad = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop';
const boondiRaita = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop';
const russianSalad = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop';
const fruitSalad = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop';
const sproutSalad = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop';

// Papad
const masalaPapad = 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop';
const roastedPapad = 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop';
const plainPapad = 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop';

// Main Course
const paneerButterMasala = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop';
const dalTadka = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop';
const choleMasala = 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop';
const mixVeg = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop';
const vegKolhapuri = 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop';
const vegHyderabadi = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop';
const vegMakhani = 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop';
const vegKadhai = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop';
const navratanKorma = 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop';

// Starters
const samosa = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop';
const kachori = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop';
const alooChat = 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop';
const dahiPuri = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop';
const bhelPuri = 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop';
const sevPuri = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop';
const paniPuri = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop';
const dahiVada = 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop';
const rajKachori = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop';
const misalPav = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop';

// Soups
const tomatoSoup = 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop';
const mixVegSoup = 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop';
const sweetCornSoup = 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop';
const hotSourSoup = 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop';

// Hot Dogs
const vegHotDog = 'https://images.unsplash.com/photo-1612392062798-2397cd760c95?w=400&h=300&fit=crop';
const cheeseHotDog = 'https://images.unsplash.com/photo-1612392062798-2397cd760c95?w=400&h=300&fit=crop';
const specialHotDog = 'https://images.unsplash.com/photo-1612392062798-2397cd760c95?w=400&h=300&fit=crop';

// Rotis & Breads
const phulkaRoti = 'https://images.unsplash.com/photo-1574653853027-5dea2706fca3?w=400&h=300&fit=crop';
const tandoorRoti = 'https://images.unsplash.com/photo-1574653853027-5dea2706fca3?w=400&h=300&fit=crop';
const butterRoti = 'https://images.unsplash.com/photo-1574653853027-5dea2706fca3?w=400&h=300&fit=crop';
const naan = 'https://images.unsplash.com/photo-1574653853027-5dea2706fca3?w=400&h=300&fit=crop';
const butterNaan = 'https://images.unsplash.com/photo-1574653853027-5dea2706fca3?w=400&h=300&fit=crop';
const garlicNaan = 'https://images.unsplash.com/photo-1574653853027-5dea2706fca3?w=400&h=300&fit=crop';
const stuffedNaan = 'https://images.unsplash.com/photo-1574653853027-5dea2706fca3?w=400&h=300&fit=crop';
const cheeseNaan = 'https://images.unsplash.com/photo-1574653853027-5dea2706fca3?w=400&h=300&fit=crop';
const kashmiriNaan = 'https://images.unsplash.com/photo-1574653853027-5dea2706fca3?w=400&h=300&fit=crop';

// Beverages
const tea = 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop';
const coffee = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop';
const lassi = 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop';
const buttermilk = 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop';
const coldDrink = 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=300&fit=crop';

export {
  // Rice
  vegBiryani,
  vegPulao,
  jeeraRice,
  plainRice,
  kashmiriPulao,
  hyderabadiBiryani,
  paneerBiryani,
  mushroomBiryani,
  
  // Mocktails
  mintMojito,
  blueLagoon,
  pinaCola,
  watermelonCooler,
  
  // Juices
  orangeJuice,
  watermelonJuice,
  limeJuice,
  mangoJuice,
  pineappleJuice,
  
  // Desserts
  gulabJamun,
  rasmalai,
  kesarKulfi,
  iceCream,
  
  // Milkshakes
  chocolateMilkshake,
  strawberryMilkshake,
  vanillaMilkshake,
  mangoMilkshake,
  
  // Sandwiches
  vegGrilledSandwich,
  cheeseSandwich,
  vegSandwich,
  clubSandwich,
  
  // Dosa & Uttapa
  masalaDosa,
  onionUttapa,
  plainDosa,
  ravaDosa,
  
  // Breakfast
  poha,
  upma,
  idliSambar,
  vadaPav,
  
  // Salad & Raita
  greenSalad,
  boondiRaita,
  russianSalad,
  fruitSalad,
  sproutSalad,
  
  // Papad
  masalaPapad,
  roastedPapad,
  plainPapad,
  
  // Main Course
  paneerButterMasala,
  dalTadka,
  choleMasala,
  mixVeg,
  vegKolhapuri,
  vegHyderabadi,
  vegMakhani,
  vegKadhai,
  navratanKorma,
  
  // Starters
  samosa,
  kachori,
  alooChat,
  dahiPuri,
  bhelPuri,
  sevPuri,
  paniPuri,
  dahiVada,
  rajKachori,
  misalPav,
  
  // Soups
  tomatoSoup,
  mixVegSoup,
  sweetCornSoup,
  hotSourSoup,
  
  // Hot Dogs
  vegHotDog,
  cheeseHotDog,
  specialHotDog,
  
  // Rotis & Breads
  phulkaRoti,
  tandoorRoti,
  butterRoti,
  naan,
  butterNaan,
  garlicNaan,
  stuffedNaan,
  cheeseNaan,
  kashmiriNaan,
  
  // Beverages
  tea,
  coffee,
  lassi,
  buttermilk,
  coldDrink,
};


export const menuCategories = [
    { name: 'All', icon: UtensilsCrossed, active: true },
    { name: 'Rice', icon: UtensilsCrossed },
    { name: 'Beverages', icon: Beer },
    { name: 'Dessert', icon: CakeSlice },
    
    { name: 'Breakfast', icon: UtensilsCrossed },
   
    { name: 'Main Course', icon: Leaf },
    { name: 'Starters', icon: UtensilsCrossed },
  
    { name: 'Hot Dogs', icon: UtensilsCrossed },
    { name: 'Rotis & Breads', icon: UtensilsCrossed },
    
  ];
  
  export const menuItems = {
    All: [
      // All items will be populated from individual categories
    ],
    
    Rice: [
      { 
        name: 'Veg Biryani', 
        description: 'Aromatic rice cooked with fresh vegetables and rich spices.', 
        price: '₹140', 
        image: vegBiryani
      },
      { 
        name: 'Veg Pulao', 
        description: 'Fragrant basmati rice cooked with mixed vegetables.', 
        price: '₹110', 
        image: vegPulao
      },
      { 
        name: 'Jeera Rice', 
        description: 'Basmati rice flavored with cumin seeds.', 
        price: '₹90', 
        image: jeeraRice
      },
      { 
        name: 'Plain Rice', 
        description: 'Simple steamed basmati rice.', 
        price: '₹80', 
        image: plainRice
      },
      { 
        name: 'Kashmiri Pulao', 
        description: 'Aromatic rice with dry fruits and saffron.', 
        price: '₹130', 
        image: kashmiriPulao
      },
      { 
        name: 'Hyderabadi Biryani', 
        description: 'Special Hyderabadi style vegetable biryani.', 
        price: '₹160', 
        image: hyderabadiBiryani
      },
      { 
        name: 'Paneer Biryani', 
        description: 'Aromatic rice cooked with paneer and spices.', 
        price: '₹170', 
        image: paneerBiryani
      },
      { 
        name: 'Mushroom Biryani', 
        description: 'Flavorful rice with fresh mushrooms and herbs.', 
        price: '₹165', 
        image: mushroomBiryani
      },
    ],
    
    Beverages: [
      { 
        name: 'Mint Mojito', 
        description: 'Refreshing blend of mint, lemon, and soda.', 
        price: '₹90', 
        image: mintMojito
      },
      { 
        name: 'Blue Lagoon', 
        description: 'Citrus-flavored mocktail with a refreshing twist.', 
        price: '₹110', 
        image: blueLagoon
      },
      { 
        name: 'Virgin Pina Colada', 
        description: 'Tropical blend of pineapple and coconut.', 
        price: '₹120', 
        image: pinaCola
      },
      { 
        name: 'Watermelon Cooler', 
        description: 'Fresh watermelon juice with mint and lime.', 
        price: '₹100', 
        image: watermelonCooler
      },
      { 
        name: 'Fresh Orange Juice', 
        description: 'Freshly squeezed oranges served chilled.', 
        price: '₹100', 
        image: orangeJuice
      },
      { 
        name: 'Watermelon Juice', 
        description: 'Sweet and hydrating watermelon juice.', 
        price: '₹90', 
        image: watermelonJuice
      },
      { 
        name: 'Fresh Lime Juice', 
        description: 'Tangy lime juice with salt or sugar.', 
        price: '₹30', 
        image: limeJuice
      },
      { 
        name: 'Mango Juice', 
        description: 'Fresh seasonal mango juice.', 
        price: '₹120', 
        image: mangoJuice
      },
      { 
        name: 'Pineapple Juice', 
        description: 'Sweet and tangy pineapple juice.', 
        price: '₹110', 
        image: pineappleJuice
      },
      { 
        name: 'Chocolate Milkshake', 
        description: 'Rich and creamy chocolate milkshake.', 
        price: '₹130', 
        image: chocolateMilkshake
      },
      { 
        name: 'Strawberry Milkshake', 
        description: 'Fresh strawberry blended with milk and ice cream.', 
        price: '₹120', 
        image: strawberryMilkshake
      },
      { 
        name: 'Vanilla Milkshake', 
        description: 'Classic vanilla flavored milkshake.', 
        price: '₹110', 
        image: vanillaMilkshake
      },
      { 
        name: 'Mango Milkshake', 
        description: 'Creamy mango milkshake with fresh fruit.', 
        price: '₹140', 
        image: mangoMilkshake
      },
    ],
    
   
    
    Dessert: [
      { 
        name: 'Gulab Jamun', 
        description: 'Soft fried milk balls soaked in sugar syrup.', 
        price: '₹90', 
        image: gulabJamun
      },
      { 
        name: 'Rasmalai', 
        description: 'Soft paneer patties soaked in saffron-flavored milk.', 
        price: '₹120', 
        image: rasmalai
      },
      { 
        name: 'Kesar Kulfi', 
        description: 'Frozen dessert flavored with saffron and cardamom.', 
        price: '₹100', 
        image: kesarKulfi
      },
      { 
        name: 'Ice Cream', 
        description: 'Vanilla, chocolate, or strawberry ice cream.', 
        price: '₹80', 
        image: iceCream
      },
    ],
    
  
    
   
    
    Breakfast: [
        { 
            name: 'Masala Dosa', 
            description: 'Crispy dosa stuffed with spiced potato filling.', 
            price: '₹100', 
            image: masalaDosa
          },
          { 
            name: 'Onion Uttapa', 
            description: 'Thick uttapa topped with onions and spices.', 
            price: '₹90', 
            image: onionUttapa
          },
          { 
            name: 'Plain Dosa', 
            description: 'Crispy plain dosa served with chutney and sambar.', 
            price: '₹80', 
            image: plainDosa
          },
          { 
            name: 'Rava Dosa', 
            description: 'Crispy semolina dosa with onions and spices.', 
            price: '₹110', 
            image: ravaDosa
          },
        { 
            name: 'Veg Grilled Sandwich', 
            description: 'Grilled bread stuffed with vegetables and cheese.', 
            price: '₹70', 
            image: vegGrilledSandwich
          },
          { 
            name: 'Cheese Sandwich', 
            description: 'Soft bread with melted cheese.', 
            price: '₹80', 
            image: cheeseSandwich
          },
          { 
            name: 'Veg Sandwich', 
            description: 'Fresh vegetables with chutney in soft bread.', 
            price: '₹60', 
            image: vegSandwich
          },
          { 
            name: 'Club Sandwich', 
            description: 'Multi-layered sandwich with vegetables and cheese.', 
            price: '₹90', 
            image: clubSandwich
          },
      { 
        name: 'Poha', 
        description: 'Flattened rice cooked with onions, peas, and spices.', 
        price: '₹50', 
        image: poha
      },
      { 
        name: 'Upma', 
        description: 'Semolina cooked with vegetables and mild spices.', 
        price: '₹60', 
        image: upma
      },
      { 
        name: 'Idli Sambar', 
        description: 'Steamed rice cakes served with sambar and chutney.', 
        price: '₹70', 
        image: idliSambar
      },
      { 
        name: 'Vada Pav', 
        description: 'Spiced potato fritter in soft bun with chutneys.', 
        price: '₹25', 
        image: vadaPav
      },
    ],
    
  
    
    'Main Course': [
      { 
        name: 'Paneer Butter Masala', 
        description: 'Creamy tomato-based curry with soft paneer cubes.', 
        price: '₹200', 
        image: paneerButterMasala
      },
      { 
        name: 'Dal Tadka', 
        description: 'Yellow lentils cooked with Indian spices and tempered with ghee.', 
        price: '₹150', 
        image: dalTadka
      },
      { 
        name: 'Chole Masala', 
        description: 'Chickpeas cooked in spicy and tangy gravy.', 
        price: '₹160', 
        image: choleMasala
      },
      { 
        name: 'Mix Veg', 
        description: 'Assorted vegetables cooked in rich gravy.', 
        price: '₹120', 
        image: mixVeg
      },
      { 
        name: 'Veg Kolhapuri', 
        description: 'Spicy Kolhapuri style mixed vegetable curry.', 
        price: '₹130', 
        image: vegKolhapuri
      },
      { 
        name: 'Veg Hyderabadi', 
        description: 'Royal Hyderabadi style vegetable preparation.', 
        price: '₹135', 
        image: vegHyderabadi
      },
      { 
        name: 'Veg Makhani', 
        description: 'Rich and creamy vegetable curry in butter gravy.', 
        price: '₹140', 
        image: vegMakhani
      },
      { 
        name: 'Veg Kadhai', 
        description: 'Mixed vegetables cooked in traditional kadhai style.', 
        price: '₹130', 
        image: vegKadhai
      },
      { 
        name: 'Navratan Korma', 
        description: 'Nine vegetable royal curry with rich gravy.', 
        price: '₹145', 
        image: navratanKorma
      },
    ],
    
    Starters: [
        { 
            name: 'Masala Papad', 
            description: 'Crispy papad topped with onions, tomatoes, and tangy masala.', 
            price: '₹25', 
            image: masalaPapad
          },
          { 
            name: 'Roasted Papad', 
            description: 'Plain roasted papad served with chutney.', 
            price: '₹20', 
            image: roastedPapad
          },
          { 
            name: 'Plain Papad', 
            description: 'Simple crispy papad.', 
            price: '₹15', 
            image: plainPapad
          },
      { 
        name: 'Samosa', 
        description: 'Crispy fried pastry stuffed with spiced potatoes.', 
        price: '₹25', 
        image: samosa
      },
      { 
        name: 'Kachori', 
        description: 'Deep-fried snack with spiced lentil filling.', 
        price: '₹20', 
        image: kachori
      },
      { 
        name: 'Aloo Chat', 
        description: 'Spiced potato chat with tangy chutneys.', 
        price: '₹35', 
        image: alooChat
      },
      { 
        name: 'Dahi Puri', 
        description: 'Crispy puris filled with yogurt and chutneys.', 
        price: '₹40', 
        image: dahiPuri
      },
      { 
        name: 'Bhel Puri', 
        description: 'Mumbai street food with puffed rice and chutneys.', 
        price: '₹35', 
        image: bhelPuri
      },
      { 
        name: 'Sev Puri', 
        description: 'Crispy puris topped with sev and chutneys.', 
        price: '₹40', 
        image: sevPuri
      },
      { 
        name: 'Pani Puri', 
        description: 'Crispy shells filled with spiced water and fillings.', 
        price: '₹35', 
        image: paniPuri
      },
      { 
        name: 'Dahi Vada', 
        description: 'Soft lentil dumplings in creamy yogurt.', 
        price: '₹45', 
        image: dahiVada
      },
      { 
        name: 'Raj Kachori', 
        description: 'Large crispy kachori with various fillings and chutneys.', 
        price: '₹55', 
        image: rajKachori
      },
      { 
        name: 'Misal Pav', 
        description: 'Spicy curry of sprouted lentils served with pav.', 
        price: '₹55', 
        image: misalPav
      },
      { 
        name: 'Green Salad', 
        description: 'Fresh mix of cucumber, tomato, and onions.', 
        price: '₹60', 
        image: greenSalad
      },
      { 
        name: 'Boondi Raita', 
        description: 'Crispy boondi mixed with chilled yogurt.', 
        price: '₹70', 
        image: boondiRaita
      },
      { 
        name: 'Russian Salad', 
        description: 'Mixed vegetables with mayonnaise dressing.', 
        price: '₹80', 
        image: russianSalad
      },
      { 
        name: 'Fruit Salad', 
        description: 'Fresh seasonal fruits with chaat masala.', 
        price: '₹90', 
        image: fruitSalad
      },
      { 
        name: 'Sprout Salad', 
        description: 'Healthy sprouts with onions, tomatoes, and lime.', 
        price: '₹70', 
        image: sproutSalad
      },
      { 
        name: 'Tomato Soup', 
        description: 'Rich and creamy tomato soup with herbs.', 
        price: '₹45', 
        image: tomatoSoup
      },
      { 
        name: 'Mix Veg Soup', 
        description: 'Nutritious soup with assorted vegetables.', 
        price: '₹50', 
        image: mixVegSoup
      },
      { 
        name: 'Sweet Corn Soup', 
        description: 'Creamy soup with sweet corn kernels.', 
        price: '₹50', 
        image: sweetCornSoup
      },
      { 
        name: 'Hot and Sour Soup', 
        description: 'Spicy and tangy Chinese-style soup.', 
        price: '₹55', 
        image: hotSourSoup
      },
    ],
    
   
    
    'Hot Dogs': [
      { 
        name: 'Veg Hot Dog', 
        description: 'Vegetarian hot dog with fresh vegetables.', 
        price: '₹70', 
        image: vegHotDog
      },
      { 
        name: 'Cheese Hot Dog', 
        description: 'Hot dog topped with melted cheese.', 
        price: '₹80', 
        image: cheeseHotDog
      },
      { 
        name: 'Special Hot Dog', 
        description: 'Premium hot dog with special toppings.', 
        price: '₹90', 
        image: specialHotDog
      },
    ],
    
    'Rotis & Breads': [
      { 
        name: 'Phulka Roti', 
        description: 'Soft whole wheat flatbread.', 
        price: '₹12', 
        image: phulkaRoti
      },
      { 
        name: 'Tandoor Roti', 
        description: 'Wheat flatbread cooked in tandoor.', 
        price: '₹15', 
        image: tandoorRoti
      },
      { 
        name: 'Butter Roti', 
        description: 'Roti brushed with fresh butter.', 
        price: '₹18', 
        image: butterRoti
      },
      { 
        name: 'Naan', 
        description: 'Soft leavened bread from tandoor.', 
        price: '₹35', 
        image: naan
      },
      { 
        name: 'Butter Naan', 
        description: 'Naan brushed with butter.', 
        price: '₹40', 
        image: butterNaan
      },
      { 
        name: 'Garlic Naan', 
        description: 'Naan topped with fresh garlic and herbs.', 
        price: '₹45', 
        image: garlicNaan
      },
      { 
        name: 'Stuffed Naan', 
        description: 'Naan stuffed with spiced vegetables.', 
        price: '₹55', 
        image: stuffedNaan
      },
      { 
        name: 'Cheese Naan', 
        description: 'Naan stuffed with melted cheese.', 
        price: '₹60', 
        image: cheeseNaan
      },
      { 
        name: 'Kashmiri Naan', 
        description: 'Sweet naan stuffed with dry fruits and coconut.', 
        price: '₹65', 
        image: kashmiriNaan
      },
    ],
    
    
  };
  
  // Auto-populate the 'All' category with items from all other categories
  menuItems.All = Object.keys(menuItems)
    .filter(category => category !== 'All')
    .flatMap(category => menuItems[category]);