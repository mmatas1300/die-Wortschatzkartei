import { LandingPage } from "./pages/LandingPage";
import { BrowserRouter as Router, Routes,  Route, Link} from "react-router-dom";
import { CardsReel } from "./pages/CardsReel";

//Componente de inicio
export function App() {
  return <Router>
    <main>
      <Routes>
      <Route path="/die-Wortschatzkartei" element={<LandingPage/>} />
      <Route path="/die-Wortschatzkartei/:letterId" element={<CardsReel/>} />
      </Routes>
    </main>
  </Router>
}