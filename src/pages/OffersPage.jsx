import React, { useState, useEffect } from "react";
import { FaUserFriends, FaGift, FaBoxOpen, FaRegStar, FaLeaf, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const offers = [
	{
		id: 1,
		title: "Daily Fresh Packs",
		subtitle: "Find fresh tofu at stores near you",
		description: "Pick up fresh Soydeli Tofu from your nearest retail store with exclusive in-store offers.",
		discount: "Save 20%",
		icon: <FaLeaf className="text-3xl text-[#6AAF48]" />,
		color: "from-soydeli-surface to-soydeli-mint",
		features: [
			"Available at retail stores",
			"Chilled supply chain",
			"Fresh 200g packs",
			"Pan India availability",
		],
		validUntil: "Ongoing",
		minOrder: "No minimum",
		ctaText: "Find a Store",
	},
	{
		id: 2,
		title: "Refer a Friend",
		subtitle: "Share & Save Together",
		description: "Invite friends to Soydeli Tofu and both get discounts on your next order.",
		discount: "₹100 OFF Each",
		icon: <FaUserFriends className="text-3xl text-[#6AAF48]" />,
		color: "from-soydeli-surface to-soydeli-light",
		features: [
			"Easy referral link",
			"Stackable with other offers",
			"Unlimited referrals",
			"Instant rewards",
		],
		validUntil: "Ongoing",
		minOrder: "Minimum order ₹500",
		ctaText: "Get Referral Link",
	},
	{
		id: 3,
		title: "Bulk Buy Savings",
		subtitle: "Stock Up & Save",
		description: "Order in bulk for parties, events, or meal prep and unlock special pricing.",
		discount: "Up to 30% OFF",
		icon: <FaBoxOpen className="text-3xl text-[#6AAF48]" />,
		color: "from-soydeli-mint/50 to-soydeli-surface",
		features: [
			"Custom bulk packs",
			"Free shipping over ₹2000",
			"Perfect for families & events",
			"Long shelf-life tofu",
		],
		validUntil: "Ongoing",
		minOrder: "Minimum order ₹1500",
		ctaText: "Order in Bulk",
	},
	{
		id: 4,
		title: "First Order Bonus",
		subtitle: "Welcome to Soydeli!",
		description: "Get a special discount on your very first order. Taste the difference!",
		discount: "15% OFF",
		icon: <FaGift className="text-3xl text-[#6AAF48]" />,
		color: "from-soydeli-primary/20 to-soydeli-surface",
		features: [
			"No code needed",
			"Valid for new users",
			"Fast delivery",
			"Try any product",
		],
		validUntil: "First order only",
		minOrder: "No minimum",
		ctaText: "Claim Offer",
	},
	{
		id: 5,
		title: "Loyalty Rewards",
		subtitle: "Earn as You Shop",
		description: "Collect points with every purchase and redeem for discounts or free products.",
		discount: "Earn Points",
		icon: <FaRegStar className="text-3xl text-[#6AAF48]" />,
		color: "from-soydeli-surface to-soydeli-primary/30",
		features: [
			"Redeem for free tofu",
			"Birthday bonus points",
			"Special member-only deals",
			"Track rewards easily",
		],
		validUntil: "Ongoing",
		minOrder: "No minimum",
		ctaText: "Join Rewards",
	},
];

const OffersPage = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	useEffect(() => {
		if (!isAutoPlaying) return;
		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % offers.length);
		}, 5000);
		return () => clearInterval(timer);
	}, [isAutoPlaying]);

	const handlePrev = () => {
		setIsAutoPlaying(false);
		setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
	};

	const handleNext = () => {
		setIsAutoPlaying(false);
		setCurrentIndex((prev) => (prev + 1) % offers.length);
	};

	const handleClaimOffer = (offer) => {
		alert(`🎉 ${offer.title} activated!\n\nThis would normally redirect to checkout or apply the offer to your cart.`);
	};

	const handleDotClick = (index) => {
		setIsAutoPlaying(false);
		setCurrentIndex(index);
	};

	return (
		<div className="page-shell flex flex-col items-center justify-center">
			<div className="max-w-5xl w-full mx-auto">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12 mt-14"
				>
					<p className="eyebrow">Special Deals</p>
					<h2 className="section-title mb-3">Exclusive Offers</h2>
					<p className="section-desc max-w-2xl mx-auto text-lg sm:text-xl">
						Save more, eat better, and enjoy fresh tofu every day!
					</p>
				</motion.div>

				{/* Main Offer Card with Navigation */}
				<div className="relative">
					{/* Navigation Buttons */}
					<button
						onClick={handlePrev}
						className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 z-10 btn-icon hover:bg-soydeli-primary hover:text-white hover:border-soydeli-primary"
						aria-label="Previous offer"
					>
						<FaChevronLeft className="text-xl" />
					</button>

					<button
						onClick={handleNext}
						className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 z-10 btn-icon hover:bg-soydeli-primary hover:text-white hover:border-soydeli-primary"
						aria-label="Next offer"
					>
						<FaChevronRight className="text-xl" />
					</button>

					{/* Offer Card */}
					<AnimatePresence mode="wait">
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ duration: 0.4 }}
							className={`rounded-3xl p-6 sm:p-10 bg-gradient-to-r ${offers[currentIndex].color} shadow-2xl`}
						>
							<div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
								{/* Icon */}
								<div className="flex-shrink-0 bg-white p-6 rounded-full shadow-lg">
									{offers[currentIndex].icon}
								</div>

								{/* Content */}
								<div className="flex-1 text-center sm:text-left">
									<h3 className="text-3xl sm:text-4xl font-bold text-soydeli-dark mb-2">
										{offers[currentIndex].title}
									</h3>
									<p className="text-base sm:text-lg text-soydeli-primary font-semibold mb-3">
										{offers[currentIndex].subtitle}
									</p>
									<p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
										{offers[currentIndex].description}
									</p>

									{/* Features */}
									<div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
										{offers[currentIndex].features.map((feature, i) => (
											<span
												key={i}
												className="bg-white/80 text-soydeli-dark px-3 py-1.5 rounded-full text-xs font-medium shadow-sm"
											>
												{feature}
											</span>
										))}
									</div>

									{/* Discount & Details */}
									<div className="flex flex-wrap items-center gap-3 mb-5 justify-center sm:justify-start">
										<span className="bg-soydeli-primary text-white px-5 py-2.5 rounded-full font-bold text-base shadow-md">
											{offers[currentIndex].discount}
										</span>
										<div className="flex flex-col text-xs text-gray-600">
											<span className="font-medium">⏰ {offers[currentIndex].validUntil}</span>
											<span>🛒 {offers[currentIndex].minOrder}</span>
										</div>
									</div>

									{/* CTA Button */}
									<button
										onClick={() => handleClaimOffer(offers[currentIndex])}
										className="btn-primary"
									>
										{offers[currentIndex].ctaText} →
									</button>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Pagination Dots */}
				<div className="flex justify-center gap-2 mt-8">
					{offers.map((_, index) => (
						<button
							key={index}
							onClick={() => handleDotClick(index)}
							className={`h-3 rounded-full transition-all duration-300 ${
								index === currentIndex
									? "w-8 bg-soydeli-primary"
									: "w-3 bg-soydeli-mint hover:bg-soydeli-primary/50"
							}`}
							aria-label={`Go to offer ${index + 1}`}
						/>
					))}
				</div>

				

				{/* Quick View All Offers */}
				<div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{offers.map((offer, index) => (
						<motion.button
							key={offer.id}
							onClick={() => handleDotClick(index)}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className={`p-4 rounded-2xl text-left transition-all duration-300 ${
								index === currentIndex
									? "bg-white shadow-lg ring-2 ring-[#6AAF48]"
									: "bg-white/60 hover:bg-white hover:shadow-md"
							}`}
						>
							<div className="flex items-center gap-3 mb-2">
								<div className="bg-gradient-to-r from-[#E6F4EA] to-[#C3E9C3] p-2 rounded-lg">
									{React.cloneElement(offer.icon, { className: "text-xl text-[#6AAF48]" })}
								</div>
								<div className="flex-1">
									<h4 className="font-bold text-[#4B7A2F] text-sm">{offer.title}</h4>
									<p className="text-xs text-[#6AAF48]">{offer.discount}</p>
								</div>
							</div>
						</motion.button>
					))}
				</div>
			</div>
		</div>
	);
};

export default OffersPage;