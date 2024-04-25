function KontaktPage() {


    return(
    <div className="flex flex-col justify-center items-center">
        <div className="bg-red-card rounded-3xl overflow-hidden w-96 max-w-full mt-12">
            <form action="https://formsubmit.co/fd1bcb62bc2401733e36b575bd39902c" method="POST" className="flex flex-col justify-center items-center w-80 py-7 m-auto">
                <h1>Kontakt</h1>
                <p>Sie möchten mit uns in Kontakt treten?</p>
                <label htmlFor="name" className="self-start">Name:</label>
                <input type="text" placeholder="Name" name="name" required />
                <label htmlFor="email">E-Mail-Adresse:</label>
                <input type="email" placeholder="E-Mail-Adresse" name="email" required />
                <label htmlFor="message">Nachricht:</label>
                <textarea name="message" id="message" cols="30" rows="10" placeholder='Wir freuen uns über Ihre Nachricht' required></textarea>
                <button>Nachricht senden</button>
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="https://die-wortschatzkartei.vercel.app/kontakt/success" />   
            </form>
        </div>
    </div>
    );
}

export default KontaktPage