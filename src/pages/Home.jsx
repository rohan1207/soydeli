import React from "react";
import Hero from "../components/Hero";
import SecondSection from "../components/second_Section";
import WhyChooseUs from "../components/WhyChooseUs";
import PopularDishes from "../components/PopularDishes";
import HomeGallery from "../components/HomeGallery";
import Ribbon from "../components/Ribbon";
import OwnerMessage from "../components/OwnerMessage";

const Home = () => {
  return (
    <div>
      <Hero />
      <SecondSection />
      <WhyChooseUs />
      <PopularDishes />
      <HomeGallery />
      <Ribbon />
      <OwnerMessage />
    </div>
  );
};

export default Home;
