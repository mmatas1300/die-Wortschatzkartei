function ContactPage() {
    return(
        <div className="bg-blue-gray-600 w-80 mt-20 mx-auto">
            <form className="flex flex-col justify-center items-center">
                <h1>KONTAKT</h1>
                <p>Sie möchten mit uns in Kontakt treten?</p>
                <p>Wir freuen uns über Ihre Nachricht</p>
                <label htmlFor="name" className="self-start">Name:</label>
                <input type="text" />
                <label htmlFor="email">E-Mail-Adresse</label>
                <input type="email" />
                <label htmlFor="message">Nachricht</label>
                <textarea name="message" id="message" cols="30" rows="10"></textarea>
                <button>Nachricht senden</button>
            </form>
        </div>
    );
}

export default ContactPage