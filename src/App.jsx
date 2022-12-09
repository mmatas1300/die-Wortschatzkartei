//Componente de inicio
export function App() {
  return(
  <div> 
    <header>
      <h1>die Wortschatzkartei</h1>
    </header>
    <main>
      <ul className="mainMenu">
        <li className="levelCard lcA1">A1</li>
        <li className="levelCard lcA2">A2</li>
        <li className="levelCard lcB1">B1</li>
      </ul>
    </main>
    <footer>
      2023
    </footer>
  </div> 
  );
}