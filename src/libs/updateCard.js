export const updateCard = (formData,type) => {
    if (formData.get('wortNomen')) {
        const updateCard = {
            type: type,
            wort: formData.get('wortNomen'),
            plural: formData.get('plural'),
            bild: formData.get('bild'),
            verwandte: formData.get('verwandte'),
            beispiel: formData.get('beispiel'),
            ubersetzung: formData.get('ubersetzung')
        }
        return updateCard
    }

    else if (formData.get('wortAndere')) {
        const updateCard = {
            type: formData.get('typeAndere'),
            wort: formData.get('wortAndere'),
            bild: formData.get('bild'),
            verwandte: formData.get('verwandte'),
            beispiel: formData.get('beispiel'),
            ubersetzung: formData.get('ubersetzung')
        }
        return updateCard
    }

    else if (formData.get('wortMUF')) {
        const updateCard = {
            type: "Nomen-MUF",
            wort: formData.get('wortMUF'),
            manner: formData.get('manner'),
            frau: formData.get('frau'),
            frauen: formData.get('frauen'),
            bild: formData.get('bild'),
            verwandte: formData.get('verwandte'),
            beispiel: formData.get('beispiel'),
            ubersetzung: formData.get('ubersetzung')
        }
        return updateCard
    }

    else if (formData.get('wortVerb')) {
        const updateCard = {
            type: "Verb",
            wort: formData.get('wortVerb'),
            prasens: [formData.get('ps1'), formData.get('ps2'), formData.get('ps3'), formData.get('ps4'), formData.get('ps5'), formData.get('ps6')],
            prateritum: [formData.get('pm1'), formData.get('pm2'), formData.get('pm3'), formData.get('pm4'), formData.get('pm5'), formData.get('pm6')],
            partizip2: formData.get('partizip2'),
            bild: formData.get('bild'),
            verwandte: formData.get('verwandte'),
            beispiel: formData.get('beispiel'),
            ubersetzung: formData.get('ubersetzung')
        }
        if (formData.get('pm1') === "") {
            updateCard.prateritum = [];
        }
        return updateCard
    }
};