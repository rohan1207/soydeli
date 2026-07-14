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
		bgColor: "bg-soydeli-light"
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
			"Extended shelf-life fresh packs",
			"Free delivery",
			"Choose delivery day",
			"Cancel anytime",
			"Best value for families",
			"Recipe cards included",
			"Priority support"
		],
		popular: true,
		color: "from-[#6AAF48] to-[#4B7A2F]",
		bgColor: "bg-soydeli-surface"
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
		bgColor: "bg-soydeli-mint/40"
	}
];

const tofuProducts = [
	{ id: 1, name: "Masala Tofu", weight: "200g", image: "/masala_tofu.png" },
	{ id: 2, name: "Extra Firm Tofu", weight: "200g", image: "/extra_firm.png" },
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
		<div className="page-shell">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12 mt-8"
				>
					<p className="eyebrow">Soydeli Plans</p>
					<h1 className="section-title mb-4">Store Availability</h1>
					<p className="text-lg sm:text-xl text-soydeli-primary font-medium mb-2">
						Find fresh Soydeli Tofu at a store near you
					</p>
					<p className="section-desc max-w-2xl mx-auto">
						Find Soydeli at stores near you — fresh, high-protein tofu across India.
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
						<div key={idx} className="card-soydeli p-4 text-center">
							<div className="text-2xl text-soydeli-primary mb-2 flex justify-center">{benefit.icon}</div>
							<p className="text-xs sm:text-sm font-semibold text-soydeli-dark">{benefit.text}</p>
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
								<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-soydeli-primary text-white px-6 py-1 rounded-full text-xs font-bold shadow-md">
									MOST POPULAR
								</div>
							)}

							<div className={`bg-gradient-to-r ${plan.color} text-white p-4 rounded-2xl mb-4 flex flex-col items-center justify-center gap-2`}>
								{plan.icon}
								<h3 className="text-xl sm:text-2xl font-bold text-white text-center">
									{plan.name}
								</h3>
								<p className="text-sm text-white/90 font-medium text-center">
									{plan.frequency}
								</p>
							</div>

							<div className="text-center mb-4">
								<div className="flex items-center justify-center gap-2">
									<span className="text-3xl font-bold text-soydeli-dark">₹{plan.price}</span>
									<span className="text-sm text-gray-500 line-through">₹{plan.originalPrice}</span>
								</div>
								<div className="bg-soydeli-primary text-white px-3 py-1 rounded-full text-xs font-bold inline-block mt-2">
									Save {plan.savings}
								</div>
							</div>

							<p className="text-sm text-[#333333] mb-4 text-center min-h-[40px]">
								{plan.description}
							</p>

							<ul className="space-y-2 mb-6">
								{plan.features.map((feature, i) => (
									<li key={i} className="flex items-start gap-2 text-sm text-[#333333]">
										<FaCheck className="text-soydeli-primary mt-1 flex-shrink-0" />
										<span>{feature}</span>
									</li>
								))}
							</ul>

							<button
								className={`w-full py-3 rounded-full font-bold transition-all duration-300 ${
									selectedPlan === plan.id
										? 'bg-soydeli-primary text-white shadow-lg'
										: 'bg-white text-soydeli-primary border-2 border-soydeli-primary hover:bg-soydeli-primary hover:text-white'
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
					<h2 className="text-2xl sm:text-3xl font-bold text-soydeli-dark mb-6 text-center">
						Customize Your Box
					</h2>

					{/* Product Selection */}
					<div className="mb-8">
						<h3 className="text-lg font-semibold text-soydeli-dark mb-4">
							Select Your Tofu Products
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{tofuProducts.map(product => (
								<div
									key={product.id}
									onClick={() => handleProductToggle(product.id)}
									className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
										selectedProducts.includes(product.id)
											? 'border-soydeli-primary bg-soydeli-light shadow-md'
											: 'border-[#DDDDDD] bg-white hover:border-soydeli-primary'
									}`}
								>
									<div className="flex items-center gap-3">
										<div className={`w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden ${
											selectedProducts.includes(product.id) ? 'bg-white' : 'bg-soydeli-light'
										}`}>
											<img 
												src={product.image} 
												alt={product.name}
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="flex-1">
											<p className="font-semibold text-soydeli-dark text-sm">{product.name}</p>
											<p className="text-xs text-gray-500">{product.weight}</p>
										</div>
										{selectedProducts.includes(product.id) && (
											<FaCheck className="text-soydeli-primary text-xl" />
										)}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Delivery Day Selection (for weekly/monthly) */}
					{selectedPlan !== "daily" && (
						<div className="mb-8">
							<h3 className="text-lg font-semibold text-soydeli-dark mb-4">
								Choose Delivery Day
							</h3>
							<div className="grid grid-cols-3 sm:grid-cols-7 gap-3">
								{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
									<button
										key={day}
										onClick={() => setDeliveryDay(day.toLowerCase())}
										className={`py-3 px-2 rounded-xl font-medium text-sm transition-all duration-300 ${
											deliveryDay === day.toLowerCase()
												? 'bg-soydeli-primary text-white shadow-lg'
												: 'bg-soydeli-light text-soydeli-dark hover:bg-soydeli-mint'
										}`}
									>
										{day.slice(0, 3)}
									</button>
								))}
							</div>
						</div>
					)}

					{/* Summary */}
					<div className="bg-soydeli-light rounded-2xl p-6">
						<h3 className="text-xl font-bold text-soydeli-dark mb-4">Your Subscription Summary</h3>
						<div className="space-y-2 mb-4">
							<div className="flex justify-between items-center">
								<span className="text-[#333333]">Plan:</span>
								<span className="font-semibold text-soydeli-dark">{currentPlan.name}</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-[#333333]">Frequency:</span>
								<span className="font-semibold text-soydeli-dark">{currentPlan.frequency}</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-[#333333]">Products Selected:</span>
								<span className="font-semibold text-soydeli-dark">{selectedProducts.length} items</span>
							</div>
							{selectedPlan !== "daily" && (
								<div className="flex justify-between items-center">
									<span className="text-[#333333]">Delivery Day:</span>
									<span className="font-semibold text-soydeli-dark capitalize">{deliveryDay}</span>
								</div>
							)}
							<div className="border-t-2 border-[#C3E9C3] pt-2 mt-2">
								<div className="flex justify-between items-center">
									<span className="text-lg font-bold text-soydeli-dark">Total:</span>
									<div className="text-right">
										<span className="text-2xl font-bold text-soydeli-primary">₹{currentPlan.price}</span>
										<span className="text-sm text-gray-500 line-through ml-2">₹{currentPlan.originalPrice}</span>
									</div>
								</div>
							</div>
						</div>

						<button className="btn-primary w-full text-lg">
							Find Stores
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
					<h2 className="text-2xl sm:text-3xl font-bold text-soydeli-dark mb-6 text-center">
						Frequently Asked Questions
					</h2>
					<div className="space-y-4">
						{[
							{ q: "How should I store Soydeli Tofu?", a: "Keep refrigerated at 4°C. Vacuum-sealed packs offer extended shelf life when stored chilled." },
							{ q: "Can I pause my subscription?", a: "Yes! Pause or skip any delivery from your account dashboard — no penalties." },
							{ q: "What products can I choose?", a: "Choose from our two variants — Masala Tofu and Extra Firm Tofu." },
							{ q: "Is there a cancellation fee?", a: "No! Cancel your Soydeli subscription anytime with no hidden fees." }
						].map((faq, idx) => (
							<div key={idx} className="bg-soydeli-light rounded-2xl p-5">
								<h4 className="font-bold text-soydeli-dark mb-2">{faq.q}</h4>
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