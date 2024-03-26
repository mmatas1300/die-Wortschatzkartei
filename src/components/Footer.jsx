
const Footer = () => {
    const today = new Date();
    return (
<footer className="mt-8 mx-auto">
      <div className="p-4 text-center">
        {today.getFullYear()} - Die Wortschatzkartei
      </div>
    </footer>
    );
}

export default Footer