//Componente de inicio
export function App() {
  return(
  <div> 
    <header>
      <h1>die Wortschatzkartei</h1>
    </header>
    <main>

      <div className="mainMenu">

        <div className="levelCard lcA1">
          <p>A1</p>
          <ul className="levelTopics">
            <li>Lebensmittel</li>
            <li>Berufe</li>
          </ul>
        </div>



        <div className="levelCard lcA2">
          <p>A2</p>
          <ul className="levelTopics">
            <li>Lebensmittel</li>
            <li>Berufe</li>
          </ul>
        </div>



        <div className="levelCard lcB1">
          <p>B1</p>
          <ul className="levelTopics">

          </ul>
        </div>
      </div>


    </main>
    <footer>
      2023
    </footer>
  </div> 
  );
}