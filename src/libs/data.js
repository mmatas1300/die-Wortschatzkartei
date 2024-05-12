//Worterbuch
export const getSearchAppCards = async (query) => {
	try {
		const res = await fetch(`/api/cards/search/${query}`);
		const cards = await res.json();
		return cards;
	} catch (error) {
		console.log(error);
	}
};

export const getSearchMyCards = async (query, userId) => {
	try {
		const res = await fetch(`/api/user/cards/search/${query}`, {
			method: "POST",
			body: JSON.stringify({ userId: userId }),
			headers: { "Content-type": "application/json" },
		});
		const cards = await res.json();
		return cards;
	} catch (error) {
		console.log(error);
	}
};

//Woterbuch letter page
export const getLetterAppCards = async (letter) => {
	try {
		const res = await fetch(`/api/cards/${letter}`);
		const cards = await res.json();
		return cards;
	} catch (error) {
		console.log(error);
	}
};

export const getLetterMyCards = async (letter, userId) => {
	try {
		const res = fetch(`/api/user/cards/${letter}`, {
			method: "POST",
			body: JSON.stringify({ userId: userId }),
			headers: { "Content-type": "application/json" },
		});
		const cards = await res.json();
		return cards;
		
	} catch (error) {
		console.log(error);
	}
};
