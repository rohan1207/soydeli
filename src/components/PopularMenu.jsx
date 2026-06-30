import React, { useState, useEffect } from 'react';
import { UtensilsCrossed, Fish, Leaf, CakeSlice, Beer } from 'lucide-react';
import AddToCartButton from './AddToCartButton';


// Import menu item images



  
  

const MenuItem = ({ item }) => (
  <div 
    className="relative flex items-center gap-6 mb-8 opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]"
    style={{
      animation: 'fadeInUp 0.5s ease-out forwards'
    }}
  >
    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
      <img src={item.images?.[0] || '/placeholder-dish.jpg'} alt={item.name} className="w-full h-full object-cover" />
    </div>
    <div className="flex-grow">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
        <div className="flex-grow mx-4 border-b-2 border-dotted border-gray-300"></div>
        <p className="font-bold text-gray-800 text-lg">₹{item.discountedPrice}</p>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed pr-24">{item.description}</p>
      <AddToCartButton item={item} />
    </div>
  </div>
);

// Import floating images


// Floating decorative elements
const FloatingCornDish = () => (
  <div
    className="absolute top-2 right-8 w-60 h-60 z-10"
    style={{
      animation: 'floatIn 2s ease-out forwards, float 4s ease-in-out infinite 2s'
    }}
  >
    <img 
      src="/indiandish.png" 
      alt="Floating Dish" 
      className="w-full h-full object-contain drop-shadow-2xl" 
    />
  </div>
);

const FloatingOnions = () => (
  <div
    className="absolute top-[60%] left-[-6%] w-80 h-80 z-10"
    style={{
      animation: 'floatIn 2s ease-out 0.5s forwards, floatSlow 5s ease-in-out infinite 2.5s'
    }}
  >
    <img 
      src="/onions.png" 
      alt="Floating Ingredients" 
      className="w-full h-full object-contain drop-shadow-2xl" 
    />
  </div>
);

const iconMap = {
  'Starters': UtensilsCrossed,
  'Indian Main Course': UtensilsCrossed,
  'Rice': UtensilsCrossed,
  'Breads': UtensilsCrossed,
  'Desserts': CakeSlice,
  'Salads': Leaf,
  'Soups': Leaf,
  'Beverages': Beer,
  'Juices': Beer,
  'Milkshakes': Beer,
  'default': UtensilsCrossed
};

const PopularMenu = () => {
  const [menuData, setMenuData] = useState({});
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/menu');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const groupedMenu = data.reduce((acc, item) => {
          const category = item.category || 'Uncategorized';
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(item);
          return acc;
        }, {});

        const uniqueCategories = Object.keys(groupedMenu).map(name => ({
          name,
          icon: iconMap[name] || iconMap.default,
        }));

        setMenuData(groupedMenu);
        setCategories(uniqueCategories);
        if (uniqueCategories.length > 0) {
          setActiveCategory(uniqueCategories[0].name);
        }
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch menu:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) return <div className="text-center py-20">Loading menu...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes floatIn {
          from {
            opacity: 0;
            transform: scale(0.8) rotate(-10deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(15px);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <section className="relative bg-gray-50 py-20 px-8 overflow-hidden min-h-screen">
        {/* Floating decorative elements */}
        <FloatingCornDish />
        <FloatingOnions />
       

        {/* Background dots pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-gray-400 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div 
            className="text-center mb-16 opacity-0"
            style={{ animation: 'slideDown 0.8s ease-out forwards' }}
          >
            <p className="text-soydeli-gold font-semibold tracking-[0.3em] text-sm mb-4">- CHOOSE DELICIOUS -</p>
            <h2 className="text-6xl font-black text-gray-900 tracking-wide">POPULAR MENU</h2>
          </div>

          {/* Category Navigation */}
          <div 
            className="flex justify-center gap-16 mb-20 opacity-0"
            style={{ animation: 'slideUp 0.8s ease-out 0.2s forwards' }}
          >
            {categories.map((category, index) => (
              <button 
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex flex-col items-center gap-3 transition-all duration-300 group cursor-pointer ${
                  activeCategory === category.name ? 'text-soydeli-gold' : 'text-gray-400 hover:text-gray-600'
                }`}
                style={{
                  animation: `slideUp 0.5s ease-out ${index * 0.1}s forwards`
                }}
              >
                <div className={`p-2 transition-all duration-300 hover:scale-105 active:scale-95 ${
                  activeCategory === category.name ? 'text-soydeli-gold' : 'text-gray-400 group-hover:text-gray-600'
                }`}>
                  <category.icon size={32} />
                </div>
                <span className="font-semibold text-sm tracking-wide">{category.name}</span>
                {activeCategory === category.name && (
                  <div className="w-full h-0.5 bg-soydeli-gold rounded-full transition-all duration-300" />
                )}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div 
            className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-2 opacity-0"
            style={{ animation: 'slideUp 0.8s ease-out 0.4s forwards' }}
            key={activeCategory}
          >
            {menuData[activeCategory] && menuData[activeCategory].map((item, index) => (
              <MenuItem key={`${activeCategory}-${index}`} item={item} />
            ))}
          </div>

          {/* View Menu Button */}
          <div 
            className="text-center mt-20 opacity-0"
            style={{ animation: 'slideUp 0.8s ease-out 0.6s forwards' }}
          >
            <button 
              className="border-2 border-soydeli-gold text-soydeli-gold px-12 py-4 font-bold tracking-[0.2em] text-sm hover:bg-soydeli-gold hover:text-white transition-all duration-300 rounded-md hover:scale-105 active:scale-95 hover:shadow-lg"
              style={{ boxShadow: 'none' }}
              onMouseEnter={(e) => e.target.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.3)'}
              onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
            >
              VIEW MENU
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularMenu;