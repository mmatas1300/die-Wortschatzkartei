import { signIn } from "next-auth/react";

const sortAlphaCards = (cards) => {
	return cards.sort((a, b) => a.wort.localeCompare(b.wort));
}

//Worterbuch
export const getSearchAppCards = async (query) => {
	try {
		const res = await fetch(`/api/cards/search/${query}`);
		const cards = await res.json();
		return sortAlphaCards(cards);
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
		return sortAlphaCards(cards);
	} catch (error) {
		console.log(error);
	}
};

//Woterbuch letter page
export const getLetterAppCards = async (letter) => {
	try {
		const res = await fetch(`/api/cards/${letter}`);
		const cards = await res.json();
		return sortAlphaCards(cards);
	} catch (error) {
		console.log(error);
	}
};

export const getLetterMyCards = async (letter, userId) => {
	try {
		const res = await fetch(`/api/user/cards/${letter}`, {
			method: "POST",
			body: JSON.stringify({ userId: userId }),
			headers: { "Content-type": "application/json" },
		});
		const cards = await res.json();
		return sortAlphaCards(cards);
	} catch (error) {
		console.log(error);
	}
};

//Konto
export const updateMyAccount = async (config, userId) => {
	try {
		await fetch('/api/user/config', {
			method: "PUT",
			body: JSON.stringify({ userId: userId, config: config, }),
			headers: { "Content-type": "application/json" }
		});
	} catch (error) {
		console.log(error);
	}
};


//login
export const registrieren = async (email, password) => {
	try {
		const response = await fetch('/api/auth/signup', {
			method: "POST",
			body: JSON.stringify({ email: email, password: password }),
			headers: { "Content-type": "application/json" }
		});
		const data = await response.json();
		if(!response.ok) return data;
		return null; 
	} catch (error) {
		console.log(error);
	}
};

//signIn
export const anmelden = async (email, password)=>{
	try {
        const res = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false
        });
		return res;
    } catch (error) {
        console.log(error)
    }
};