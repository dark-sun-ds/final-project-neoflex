import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer.tsx";
import { Home } from "./pages/Home/Home";
import { Loan } from "./pages/Loan/Loan.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import NotFound from "./pages/NotFound/NotFound.tsx";
import LoanDetails from "./pages/LoanDetails/LoanDetails.tsx";
import LoanDocument from "./pages/LoanDocument/LoanDocument.tsx";
import LoanSign from "./pages/LoanSign/LoanSign.tsx";
import LoanCode from "./pages/LoanCode/LoanCode.tsx";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/loan" element={<Loan />}></Route>
            <Route path="/loan/:id" element={<LoanDetails />}></Route>
            <Route path="/loan/:id/document" element={<LoanDocument />}></Route>
            <Route
              path="/loan/:id/document/sign"
              element={<LoanSign />}
            ></Route>
            <Route
              path="/loan/:id/document/sign/code"
              element={<LoanCode />}
            ></Route>

            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
