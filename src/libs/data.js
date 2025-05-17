import { signIn } from "next-auth/react";


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

export const getUserCardsByQuery = async (query, userId) => {
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
		return sortAlphaCards(cards);
	} catch (error) {
		console.log(error);
	}
};

export const getUserCardsByFirstLetter = async (userId, firstLetter) => {
	try {
		const res = await fetch(`/api/user/cards/${firstLetter}`, {
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

//Konto
export const updateUserConfig = async (userId, config) => {
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
export const signup = async (email, password) => {
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

//Karteneditor
export const createAppCard = async (card, userId)=>{
	try {
		const res = await fetch('/api/cards',{
			method: "POST",
			body: JSON.stringify({...card, userId: userId}),
			headers: {"Content-type": "application/json"}
		});
		const data = await res.json();
		if(!res.ok) return data;
		return null; 
	} catch (error) {
		console.log(error);
	}
};

//verwalten und uben
export const updateUserCard = async (userId, card)=>{
	try {
		const res = await fetch('/api/user/cards',{
			method: "PUT",
			body: JSON.stringify({userId: userId, card: card}),
			headers: {"Content-type": "application/json"}
		});
		const data = await res.json();
		if(!res.ok) return data;
		return null;
	} catch (error) {
		console.log(error)
	}
};

export const getUserCards = async (userId)=>{
	try {
		const res = await fetch('/api/user/cards',{
			method: "POST",
			body: JSON.stringify({userId: userId}),
			headers: {"Content-type": "application/json"}
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error)
	}
};

export const deleteUserCard = async (userId,cardId)=>{
	try {
		await fetch('/api/user/cards',{
			method: "DELETE",
			body: JSON.stringify({userId: userId, cardId: cardId}),
			headers: {"Content-type": "application/json"}
		});
	} catch (error) {
		console.log(error);
	}
};

//Uben
export const getAppCards = async ()=>{
	try {
		const res = await fetch('/api/cards');
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error)
	}
};

export const getUserLastGame = async (userId)=>{
	try {
		const res = await fetch('api/user/last-game',{
			method: "POST",
			body: JSON.stringify({userId: userId}),
			headers: {"Content-type": "application/json"}
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getUserStreak = async (userId)=>{
	try {
		const res = await fetch('api/user/streak',{
			method: "POST",
			body: JSON.stringify({userId: userId}),
			headers: {"Content-type": "application/json"}
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};


export const getUserProgress = async (userId)=>{
	try {
		const res = await fetch('/api/user/progress',{
			method: "POST",
			body: JSON.stringify({userId: userId}),
			headers: {"Content-type": "application/json"}
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const saveUserCardsProgress = async (userId, cards)=>{
	try {
		await fetch('/api/user/cards/progress',{
			method: "PUT",
			body: JSON.stringify({userId: userId, cards: cards, date: new Date().setHours(0,0,0)}),
			headers: {"Content-type": "application/json"}
		});
	} catch (error) {
		console.log(error);
	}
};

export const saveAppCardsProgress = async (userId, progress)=>{
	try {
		await fetch('/api/user/progress/save',{
			method: "PUT",
			body: JSON.stringify({userId: userId, progress: progress, date: new Date().setHours(0,0,0)}),
			headers: {"Content-type": "application/json"}
		});
	} catch (error) {
		console.log(error);
	}
};

export const resetAppCardProgress = async (userId, cardId)=>{
	try {
		await fetch('/api/user/progress',{
			method: "PUT",
			body: JSON.stringify({userId: userId, progress: [{cardId: cardId, level:0, practiceDate: new Date("2000")}]}),
			headers: {"Content-type": "application/json"}
		});
	} catch (error) {
		console.log(error)
	}
}

//KartePons
export const getPons = async (userId,wort)=>{
	try {
		const resp = await fetch('/api/pons',{
			method: "POST",
			body: JSON.stringify({userId: userId, query: wort}),
			headers: {"Content-type": "application/json"}
		});
		const data = await resp.json();
		return data;
	} catch (error) {
		console.log(error)
	}
}
