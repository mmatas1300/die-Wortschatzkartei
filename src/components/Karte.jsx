import style from '@/components/Karte.module.css'

function Karte(){
    return (
        <section className='flex justify-center items-center'>
        <div className={style.karte}>
            <div className={style.kartefront}>
                <p>Das Kind</p>

            </div>
            <div className={style.karteback}>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit delectus eum ipsum asperiores velit reiciendis facilis, error quisquam iste et laboriosam? Eum odio, dolorum quasi architecto impedit ullam! Quia, voluptatibus?</p>
            </div>
        </div>
        </section>


    );
}

export default Karte