import React, { useState } from "react";
import { FaCheck, FaLeaf, FaTruck, FaPause, FaGift, FaCalendarAlt, FaBox } from "react-icons/fa";
import { motion } from "framer-motion";

const subscriptionPlans = [
	{
		id: "daily",
		name: "Daily Fresh",
		frequency: "Every Day",
		icon: <FaCalendarAlt className="text-3xl" />,
		price: 600,
		originalPrice: 840,
		savings: "20%",
		description: "Perfect for daily tofu lovers. Fresh Soydeli packs delivered every morning.",
		features: [
			"Fresh tofu every day",
			"Free delivery",
			"Cancel anytime",
			"Priority customer support",
			"Eco-friendly packaging",
			"Flexible pause options"
		],
		popular: false,
		color: "from-[#6AAF48] to-[#4B7A2F]",
		bgColor: "bg-[#E6F4EA]"
	},
	{
		id: "weekly",
		name: "Weekly Bundle",
		frequency: "Every Week",
		icon: <FaBox className="text-3xl" />,
		price: 420,
		originalPrice: 560,
		savings: "25%",
		description: "Most popular! A week's supply of Soydeli tofu delivered once.",
		features: [
			"7 days fresh tofu supply",
			"Free delivery",
			"Choose delivery day",
			"Cancel anytime",
			"Best value for families",
			"Recipe cards included",
			"Priority support"
		],
		popular: true,
		color: "from-[#6AAF48] to-[#4B7A2F]",
		bgColor: "bg-[#F4EAD7]"
	},
	{
		id: "monthly",
		name: "Monthly Stock",
		frequency: "Every Month",
		icon: <FaLeaf className="text-3xl" />,
		price: 1500,
		originalPrice: 2000,
		savings: "30%",
		description: "Maximum savings! Perfect for bulk buyers and meal preppers.",
		features: [
			"30 days tofu supply",
			"Free delivery",
			"Long shelf-life varieties",
			"Customize your box",
			"Cancel anytime",
			"Recipe book included",
			"VIP customer support",
			"Birthday bonus gifts"
		],
		popular: false,
		color: "from-[#6AAF48] to-[#4B7A2F]",
		bgColor: "bg-[#E6D9C3]"
	}
];

const tofuProducts = [
	{ id: 1, name: "Soydeli Masala Tofu", weight: "200g", image: "/product1.png" },
	{ id: 2, name: "Soydeli Extra Firm Tofu", weight: "200g", image: "/product2.png" },
	{ id: 3, name: "Soydeli Classic Plain Tofu", weight: "200g", image: "/product3.png" },
	{ id: 4, name: "Soydeli Family Pack", weight: "4×200g", image: "/product4.png" },
	{ id: 5, name: "Soydeli Bulk Box", weight: "10×200g", image: "/pro1.png" }
];

const SubscriptionPage = () => {
	const [selectedPlan, setSelectedPlan] = useState("weekly");
	const [selectedProducts, setSelectedProducts] = useState([1, 2]);
	const [deliveryDay, setDeliveryDay] = useState("monday");

	const handleProductToggle = (productId) => {
		setSelectedProducts(prev => 
			prev.includes(productId) 
				? prev.filter(id => id !== productId)
				: [...prev, productId]
		);
	};

	const currentPlan = subscriptionPlans.find(p => p.id === selectedPlan);

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#E6F4EA] via-[#F4EAD7] to-[#E6D9C3] py-12 px-4 sm:px-8">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12 mt-8"
				>
					<h1 className="text-4xl sm:text-6xl font-extrabold text-[#4B7A2F] mb-4 tracking-tight">
						Soydeli Subscription
					</h1>
					<p className="text-lg sm:text-xl text-[#6AAF48] font-medium mb-2">
						Never run out of fresh, high-protein tofu again!
					</p>
					<p className="text-sm sm:text-base text-[#7A5F47] max-w-2xl mx-auto">
						Choose your plan, pick your Soydeli variants, and enjoy hassle-free chilled delivery from Kolhapur.
					</p>
				</motion.div>

				{/* Benefits Bar */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
				>
					{[
						{ icon: <FaTruck />, text: "Free Delivery" },
						{ icon: <FaPause />, text: "Pause Anytime" },
						{ icon: <FaGift />, text: "Exclusive Perks" },
						{ icon: <FaLeaf />, text: "100% Fresh" }
					].map((benefit, idx) => (
						<div key={idx} className="bg-white rounded-2xl p-4 shadow-lg text-center">
							<div className="text-2xl text-[#6AAF48] mb-2 flex justify-center">{benefit.icon}</div>
							<p className="text-xs sm:text-sm font-semibold text-[#4B7A2F]">{benefit.text}</p>
						</div>
					))}
				</motion.div>

				{/* Subscription Plans */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					{subscriptionPlans.map((plan, idx) => (
						<motion.div
							key={plan.id}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: idx * 0.1 }}
							onClick={() => setSelectedPlan(plan.id)}
							className={`relative rounded-3xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
								selectedPlan === plan.id 
									? 'ring-4 ring-[#6AAF48] shadow-2xl' 
									: 'shadow-lg hover:shadow-xl'
							} ${plan.bgColor}`}
						>
							{plan.popular && (
								<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#6AAF48] text-white px-6 py-1 rounded-full text-xs font-bold shadow-md">
									MOST POPULAR
								</div>
							)}

							<div className={`bg-gradient-to-r ${plan.color} text-white p-4 rounded-2xl mb-4 flex items-center justify-center`}>
								{plan.icon}
							</div>

							<h3 className="text-2xl font-bold text-[#4B7A2F] mb-1 text-center">
								{plan.name}
							</h3>
							<p className="text-sm text-[#6AAF48] font-medium mb-4 text-center">
								{plan.frequency}
							</p>

							<div className="text-center mb-4">
								<div className="flex items-center justify-center gap-2">
									<span className="text-3xl font-bold text-[#4B7A2F]">₹{plan.price}</span>
									<span className="text-sm text-gray-500 line-through">₹{plan.originalPrice}</span>
								</div>
								<div className="bg-[#6AAF48] text-white px-3 py-1 rounded-full text-xs font-bold inline-block mt-2">
									Save {plan.savings}
								</div>
							</div>

							<p className="text-sm text-[#333333] mb-4 text-center min-h-[40px]">
								{plan.description}
							</p>

							<ul className="space-y-2 mb-6">
								{plan.features.map((feature, i) => (
									<li key={i} className="flex items-start gap-2 text-sm text-[#333333]">
										<FaCheck className="text-[#6AAF48] mt-1 flex-shrink-0" />
										<span>{feature}</span>
									</li>
								))}
							</ul>

							<button
								className={`w-full py-3 rounded-full font-bold transition-all duration-300 ${
									selectedPlan === plan.id
										? 'bg-[#6AAF48] text-white shadow-lg'
										: 'bg-white text-[#6AAF48] border-2 border-[#6AAF48] hover:bg-[#6AAF48] hover:text-white'
								}`}
							>
								{selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
							</button>
						</motion.div>
					))}
				</div>

				{/* Customization Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl mb-12"
				>
					<h2 className="text-2xl sm:text-3xl font-bold text-[#4B7A2F] mb-6 text-center">
						Customize Your Box
					</h2>

					{/* Product Selection */}
					<div className="mb-8">
						<h3 className="text-lg font-semibold text-[#4B7A2F] mb-4">
							Select Your Tofu Products
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{tofuProducts.map(product => (
								<div
									key={product.id}
									onClick={() => handleProductToggle(product.id)}
									className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
										selectedProducts.includes(product.id)
											? 'border-[#6AAF48] bg-[#E6F4EA] shadow-md'
											: 'border-[#DDDDDD] bg-white hover:border-[#6AAF48]'
									}`}
								>
									<div className="flex items-center gap-3">
										<div className={`w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden ${
											selectedProducts.includes(product.id) ? 'bg-white' : 'bg-[#E6F4EA]'
										}`}>
											<img 
												src={product.image} 
												alt={product.name}
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="flex-1">
											<p className="font-semibold text-[#4B7A2F] text-sm">{product.name}</p>
											<p className="text-xs text-gray-500">{product.weight}</p>
										</div>
										{selectedProducts.includes(product.id) && (
											<FaCheck className="text-[#6AAF48] text-xl" />
										)}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Delivery Day Selection (for weekly/monthly) */}
					{selectedPlan !== "daily" && (
						<div className="mb-8">
							<h3 className="text-lg font-semibold text-[#4B7A2F] mb-4">
								Choose Delivery Day
							</h3>
							<div className="grid grid-cols-3 sm:grid-cols-7 gap-3">
								{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
									<button
										key={day}
										onClick={() => setDeliveryDay(day.toLowerCase())}
										className={`py-3 px-2 rounded-xl font-medium text-sm transition-all duration-300 ${
											deliveryDay === day.toLowerCase()
												? 'bg-[#6AAF48] text-white shadow-lg'
												: 'bg-[#E6F4EA] text-[#4B7A2F] hover:bg-[#C3E9C3]'
										}`}
									>
										{day.slice(0, 3)}
									</button>
								))}
							</div>
						</div>
					)}

					{/* Summary */}
					<div className="bg-[#E6F4EA] rounded-2xl p-6">
						<h3 className="text-xl font-bold text-[#4B7A2F] mb-4">Your Subscription Summary</h3>
						<div className="space-y-2 mb-4">
							<div className="flex justify-between items-center">
								<span className="text-[#333333]">Plan:</span>
								<span className="font-semibold text-[#4B7A2F]">{currentPlan.name}</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-[#333333]">Frequency:</span>
								<span className="font-semibold text-[#4B7A2F]">{currentPlan.frequency}</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-[#333333]">Products Selected:</span>
								<span className="font-semibold text-[#4B7A2F]">{selectedProducts.length} items</span>
							</div>
							{selectedPlan !== "daily" && (
								<div className="flex justify-between items-center">
									<span className="text-[#333333]">Delivery Day:</span>
									<span className="font-semibold text-[#4B7A2F] capitalize">{deliveryDay}</span>
								</div>
							)}
							<div className="border-t-2 border-[#C3E9C3] pt-2 mt-2">
								<div className="flex justify-between items-center">
									<span className="text-lg font-bold text-[#4B7A2F]">Total:</span>
									<div className="text-right">
										<span className="text-2xl font-bold text-[#6AAF48]">₹{currentPlan.price}</span>
										<span className="text-sm text-gray-500 line-through ml-2">₹{currentPlan.originalPrice}</span>
									</div>
								</div>
							</div>
						</div>

						<button className="w-full bg-gradient-to-r from-[#6AAF48] to-[#4B7A2F] text-white py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
							Subscribe Now
						</button>
						
						<p className="text-xs text-center text-gray-500 mt-4">
							Cancel anytime • No hidden fees • Pause or skip deliveries easily
						</p>
					</div>
				</motion.div>

				{/* FAQ Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl"
				>
					<h2 className="text-2xl sm:text-3xl font-bold text-[#4B7A2F] mb-6 text-center">
						Frequently Asked Questions
					</h2>
					<div className="space-y-4">
						{[
							{ q: "How should I store Soydeli Tofu?", a: "Keep refrigerated at 4°C. Best consumed within 7 days of packaging for peak freshness." },
							{ q: "Can I pause my subscription?", a: "Yes! Pause or skip any delivery from your account dashboard — no penalties." },
							{ q: "What products can I choose?", a: "Pick from Masala, Extra Firm, Classic Plain, Family Pack, or Bulk Box variants." },
							{ q: "Is there a cancellation fee?", a: "No! Cancel your Soydeli subscription anytime with no hidden fees." }
						].map((faq, idx) => (
							<div key={idx} className="bg-[#E6F4EA] rounded-2xl p-5">
								<h4 className="font-bold text-[#4B7A2F] mb-2">{faq.q}</h4>
								<p className="text-[#333333] text-sm">{faq.a}</p>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default SubscriptionPage;