import { signIn } from "next-auth/react";
import { sortAlphaCards } from "@/libs/sortArrays";

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

export const createMyCard = async (userId, card)=>{
	card._id = card.wort + userId + Date.now();
	try {
		const res = await fetch('/api/user/cards',{
			method: "PUT",
			body: JSON.stringify({userId: userId, card:{ ...card, level: 0, practiceDate: new Date("2000") }, update: "add"}),
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
export const getMyCards = async (userId)=>{
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

export const deleteMyCard = async (userId,cardId)=>{
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

export const resetMyCardLevel = async (userId,card)=>{
	card.level=0;
	card.practiceDate = new Date("2000");
	try {
		await fetch('/api/user/cards',{
			method: "PUT",
			body: JSON.stringify({userId: userId, card: card, update: "edit"}),
			headers: {"Content-type": "application/json"}
		})
	} catch (error) {
		console.log(error)
	}
};

export const editMyCard = async (userId, card)=>{
	try {
		await fetch('/api/user/cards',{
			method: "PUT",
			body: JSON.stringify({userId: userId, card: card, update: "edit"}),
			headers: {"Content-type": "application/json"}
		})
	} catch (error) {
		console.log(error)
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

export const getGameData = async (userId, query)=>{
	try {
		const res = await fetch('api/user/game-data',{
			method: "POST",
			body: JSON.stringify({userId: userId, query: query}),
			headers: {"Content-type": "application/json"}
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const saveMyProgress = async (userId, cards)=>{
	try {
		await fetch('/api/user/cards',{
			method: "PUT",
			body: JSON.stringify({userId: userId, cards: cards, update: "play"}),
			headers: {"Content-type": "application/json"}
		});
	} catch (error) {
		console.log(error);
	}
};

export const saveAppProgress = async (userId, progress)=>{
	try {
		await fetch('/api/user/game-data',{
			method: "PUT",
			body: JSON.stringify({userId: userId, progress: progress, update: "play"}),
			headers: {"Content-type": "application/json"}
		});
	} catch (error) {
		console.log(error);
	}
};

export const resetAppProgress = async (userId, cardId)=>{
	try {
		await fetch('/api/user/game-data',{
			method: "PUT",
			body: JSON.stringify({userId: userId, progress: [{cardId: cardId, level:0, practiceDate: new Date("2000")}], update: "reset"}),
			headers: {"Content-type": "application/json"}
		});
	} catch (error) {
		console.log(error)
	}
}