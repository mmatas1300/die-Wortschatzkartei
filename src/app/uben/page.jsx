import Karte from "@/components/Karte";


function UbenPage() {

    const myKarten = [{
        type: "Nomen-MUF",
        wort: "Student",
        manner: "Studenten",
        frau: "Studentin",
        frauen: "Studentinnen",
        bild: "https://s1.eestatic.com/2023/09/28/sociedad/educacion/797931011_236391858_1706x960.jpg",
        verwandte: "Studieren | die Schule",
        beispiel: "Ich bin Student",
        ubersetzung: "Student | Estudiante"
    },
    {
        type: "Nomen-das",
        wort: "Kind",
        plural: "Kinder",
        bild: "https://images.vexels.com/media/users/3/205519/isolated/preview/fbc3cf2c3eef6e7f3a4faa436b8eb20b-caracter-de-pluma-de-nino-sonriente.png",
        verwandte: "Jungen",
        beispiel: "Wo sind die Kinder?",
        ubersetzung: "Child | Niño"
    },
    {
        type: "Adjektiv",
        wort: "Nett",
        bild: "https://fundacionrelacionessanas.org/wp-content/uploads/2023/04/bc840a2b-40f1-ef78-6c71-050e5f8716d2.jpg",
        verwandte: "Schnell",
        beispiel: "Mein Mann ist so nett.",
        ubersetzung: "Nice | Amable"
    },
    {
        type: "Verb",
        wort: "Haben",
        prasens: ["Habe", "Hast", "Hat", "Haben", "Habt", "Haben"],
        prateritum: ["Hatte", "Hattest", "Hatte", "Hatten", "Hattet", "Hatten"],
        partizip2: "gehabt",
        bild: "https://wp.es.aleteia.org/wp-content/uploads/sites/7/2015/03/7uyvcq6w3xfvlpffvt-dyi_d00whuv4s61jcwqqfemw0xa5ksza9k1moozipaak04fuoi8xv_1liovthummc0mdnzmlp.jpg",
        verwandte: "",
        beispiel: "Ich habe hunger.",
        ubersetzung: "Tener | Haber"
    }
    ]




    return (
        <div className="flex flex-col justify-center items-center mt-12">
            {myKarten.map((karte) => {
                return (<div className="my-5"><Karte {...karte}  /></div>)
            })}
        </div>
    );


}

export default UbenPage