import style from '@/app/ui/dashboard.module.css'

function ContactPage() {
    return(
    <section className="flex justify-center items-center mt-12">
        <div className={style['kontakt']}>
            <form className="flex flex-col justify-center items-center w-80 py-7 m-auto">
                <h1 className='text-xl'>Kontakt</h1>
                <p>Sie möchten mit uns in Kontakt treten?</p>
                <label htmlFor="name" className="self-start">Name:</label>
                <input type="text" placeholder="Name" name="name" />
                <label htmlFor="email">E-Mail-Adresse:</label>
                <input type="email" placeholder="E-Mail-Adresse" name="email" />
                <label htmlFor="message">Nachricht:</label>
                <textarea name="message" id="message" cols="30" rows="10" placeholder='Wir freuen uns über Ihre Nachricht'></textarea>
                <button>Nachricht senden</button>
            </form>
        </div>
    </section>
    );
}

export default ContactPage