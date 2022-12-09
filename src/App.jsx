import { LandingPage } from "./pages/LandingPage";
import { BrowserRouter as Router, Routes,  Route, Link} from "react-router-dom";

//Componente de inicio
export function App() {
  return <Router>
    <header>
      <h1>die Wortschatzkartei</h1>
    </header>
    <main>
      <Routes>
      <Route path="/die-Wortschatzkartei" element={<LandingPage/>} />
      </Routes>
    </main>
  </Router>
}