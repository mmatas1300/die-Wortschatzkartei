//Componente de inicio
export function App() {
  return(
  <div> 
    <header>
      <h1>die Wortschatzkartei</h1>
    </header>
    <main>
      <div className="mainMenu">
        <ul className="levelCard lcA1">
          <li>A1</li>
          <li className="levelTopics">Lebensmittel</li>
          <li className="levelTopics">Berufe</li>
        </ul>
        <ul className="levelCard lcA2">A2</ul>
        <ul className="levelCard lcB1">B1</ul>
      </div>
    </main>
    <footer>
      2023
    </footer>
  </div> 
  );
}