import { LandingPage } from "./pages/LandingPage";
import { HashRouter, Routes,  Route, Link} from "react-router-dom";
import { CardsSlidePage } from "./pages/CardsSlidePage";

//Componente de inicio
export function App() {
  return <HashRouter>
    <main>
      <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/:letterId" element={<CardsSlidePage/>} />
      </Routes>
    </main>
    <div class="breaker"></div>
    <footer>
      <p>© 2023</p>
    </footer>
  </HashRouter>
}