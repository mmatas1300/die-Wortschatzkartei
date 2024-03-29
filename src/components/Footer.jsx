
const Footer = () => {
    const today = new Date();
    return (
    <footer className="mt-8 mx-auto">
      <hr class="h-px w-96 mx-auto bg-red-card border-0 "></hr>
      <div className="p-4 text-center">
        {today.getFullYear()} - Die Wortschatzkartei
        
      </div>
    </footer>
    );
}

export default Footer