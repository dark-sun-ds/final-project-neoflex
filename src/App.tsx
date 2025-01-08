import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer.tsx";
import { Home } from "./pages/Home/Home";
import { Loan } from "./pages/Loan/Loan.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.ts";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/loan" element={<Loan />}></Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
