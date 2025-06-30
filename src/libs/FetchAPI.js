import { signIn } from "next-auth/react";

export const signup = async (email, password) => {
	try {
		const response = await fetch('/api/auth/signup', {
			method: "POST",
			body: JSON.stringify({ email: email, password: password }),
			headers: { "Content-type": "application/json" }
		});
		return await response.json();
	} catch (error) {
		console.log(error);
	}
};

//signIn
export const signin = async (email, password) => {
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

//Worterbuch
export const getAppCardsByQuery = async (query) => {
	const resp = await fetch(`/api/cards/search/${query}`);
	if (resp.status != 200)
		throw new Error("Es ist ein Fehler aufgetreten! Bitte versuchen Sie es später noch einmal.");
	return await resp.json();
};

export const getUserCardsByQuery = async (userId, query) => {
	const resp = await fetch(`/api/user/cards/search/${query}`, {
		method: "POST",
		body: JSON.stringify({ userId: userId }),
		headers: { "Content-type": "application/json" },
	});
	if (resp.status != 200)
		throw new Error("Es ist ein Fehler aufgetreten! Bitte versuchen Sie es später noch einmal");
	return await resp.json();
};

//Woterbuch letter page
export const getAppCardsByFirstLetter = async (firstLetter) => {
	const resp = await fetch(`/api/cards/starts-with/${firstLetter}`);
	if (resp.status != 200)
		throw new Error("Es ist ein Fehler aufgetreten! Bitte versuchen Sie es später noch einmal");
	return await resp.json();
};

export const getUserCardsByFirstLetter = async (userId, firstLetter) => {
	const resp = await fetch(`/api/user/cards/starts-with/${firstLetter}`, {
		method: "POST",
		body: JSON.stringify({ userId: userId }),
		headers: { "Content-type": "application/json" },
	});
	if (resp.status != 200)
		throw new Error("Es ist ein Fehler aufgetreten! Bitte versuchen Sie es später noch einmal");
	return await resp.json();
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

//verwalten und uben
export const updateUserCard = async (userId, card) => {
	try {
		const res = await fetch('/api/user/cards', {
			method: "PUT",
			body: JSON.stringify({ userId: userId, card: card }),
			headers: { "Content-type": "application/json" }
		});
		const data = await res.json();
		if (!res.ok) return data;
		return null;
	} catch (error) {
		console.log(error)
	}
};

export const getUserCards = async (userId) => {
	try {
		const res = await fetch('/api/user/cards', {
			method: "POST",
			body: JSON.stringify({ userId: userId }),
			headers: { "Content-type": "application/json" }
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error)
	}
};

export const deleteUserCard = async (userId, cardId) => {
	try {
		await fetch('/api/user/cards', {
			method: "DELETE",
			body: JSON.stringify({ userId: userId, cardId: cardId }),
			headers: { "Content-type": "application/json" }
		});
	} catch (error) {
		console.log(error);
	}
};

//Uben
export const getAppCards = async () => {
	try {
		const res = await fetch('/api/cards');
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error)
	}
};

export const getUserLastGame = async (userId) => {
	try {
		const res = await fetch('api/user/last-game', {
			method: "POST",
			body: JSON.stringify({ userId: userId }),
			headers: { "Content-type": "application/json" }
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getUserStreak = async (userId) => {
	try {
		const res = await fetch('api/user/streak', {
			method: "POST",
			body: JSON.stringify({ userId: userId }),
			headers: { "Content-type": "application/json" }
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};


export const getUserProgressAppCards = async (userId) => {
	try {
		const res = await fetch('/api/user/progress-app-cards', {
			method: "POST",
			body: JSON.stringify({ userId: userId }),
			headers: { "Content-type": "application/json" }
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const saveUserCardsProgress = async (userId, cards) => {
	try {
		await fetch('/api/user/cards/progress', {
			method: "PUT",
			body: JSON.stringify({ userId: userId, cards: cards, date: new Date().setHours(0, 0, 0) }),
			headers: { "Content-type": "application/json" }
		});
	} catch (error) {
		console.log(error);
	}
};

export const saveAppCardsProgress = async (userId, progress) => {
	try {
		await fetch('/api/user/progress-app-cards/save', {
			method: "PUT",
			body: JSON.stringify({ userId: userId, progress: progress, date: new Date().setHours(0, 0, 0) }),
			headers: { "Content-type": "application/json" }
		});
	} catch (error) {
		console.log(error);
	}
};

export const resetAppCardProgress = async (userId, cardId) => {
	try {
		await fetch('/api/user/progress-app-cards', {
			method: "PUT",
			body: JSON.stringify({ userId: userId, progress: [{ cardId: cardId, level: 0, practiceDate: new Date("2000") }] }),
			headers: { "Content-type": "application/json" }
		});
	} catch (error) {
		console.log(error)
	}
}

//CardPons
export const getPonsInfo = async (userId, word) => {
	const resp = await fetch('/api/pons', {
		method: "POST",
		body: JSON.stringify({ userId: userId, query: word }),
		headers: { "Content-type": "application/json" }
	});
	if (resp.status != 200)
		throw new Error("Please verify your secret number or card");
	return await resp.json();
}

//Kontakt
export const sendEmail = async (email) => {
	const resp = await fetch('/api/contact', {
		method: "POST",
		body: JSON.stringify({ message: email }),
		headers: { "Content-type": "application/json" }
	});
	if (resp.status != 202)
		throw new Error("Es ist ein Fehler aufgetreten! Bitte versuchen Sie es später noch einmal");
}