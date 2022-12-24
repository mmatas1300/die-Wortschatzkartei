import { LandingPage } from "./pages/LandingPage";
import { HashRouter, Routes,  Route} from "react-router-dom";
import { CardsSlidePage } from "./pages/CardsSlidePage";
import ScrollToTop from "./components/ScrollToTop";

export function App() {
  return <HashRouter>
    <ScrollToTop />
    <main>
      <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/:letterId" element={<CardsSlidePage/>} />
      </Routes>
    </main>
    <div className="breaker"></div>
    <footer>
      <p>© 2023</p>
    </footer>
  </HashRouter>
}