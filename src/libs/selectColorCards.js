export const selectColorCard = (type) => {
    switch (type) {
        case "Nomen-das":
            return "bg-green-card";
        case "Nomen-der":
            return "bg-blue-card";
        case "Nomen-die":
            return "bg-red-card";
        case "Nomen-pl":
            return "bg-yellow-card";
        case "Nomen-MUF":
            return "bg-gradient-to-r from-blue-card to-red-card";
        case "Verb":
            return `bg-orange-card`;
        default:
            return "bg-purple-card";
    }
};

export const selectColorChart = (type) => {
    switch (type) {
        case "Nomen-das":
            return "--green-card";
        case "Nomen-der":
            return "--blue-card";
        case "Nomen-die":
            return "--red-card";
        case "Nomen-pl":
            return "--yellow-card";
        case "Nomen-MUF":
            return "--blue-card";
        case "Verb":
            return `--orange-card`;
        default:
            return "--purple-card";
    }
};