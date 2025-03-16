import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import InfoSection from "./components/InfoSection";
import MostSearched from "./components/Most_Searched";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <MostSearched />
      <InfoSection />
      <Footer />
    </div>
  );
}
