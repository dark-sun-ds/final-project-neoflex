import "./Home.css";
import { ChooseDesignSection } from "../../components/ChooseDesignSection/ChooseDesignSection.tsx";
import { FeaturesSection } from "../../components/FeaturesSection/FeaturesSection.tsx";
import { ConverterArticle } from "../../components/ConverterArticle/ConverterArticle.tsx";
import { OurLocationsSection } from "../../components/OurLocationsSection/OurLocationsSection.tsx";
import { SubscribeSection } from "../../components/SubscribeSection/SubscribeSection.tsx";
import { NewsSection } from "../../components/NewsSection/NewsSection.tsx";

export const Home = () => {
  return (
    <div className="home">
      <ChooseDesignSection />
      <FeaturesSection />
      <ConverterArticle />
      <OurLocationsSection />
      <NewsSection/>
      <SubscribeSection />
    </div>
  );
};
