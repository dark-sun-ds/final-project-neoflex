import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer.tsx";
import { Home } from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="container">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
