import { LandingPage } from "./pages/LandingPage";

//Componente de inicio
export function App() {
  return(
  <div> 
    <header>
      <h1>die Wortschatzkartei</h1>
    </header>
    <main>
      <LandingPage />
    </main>
  </div>);
}