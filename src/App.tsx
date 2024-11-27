import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer.tsx";
import { Home } from "./pages/Home/Home";
function App() {
  return (
    <div className="container">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
