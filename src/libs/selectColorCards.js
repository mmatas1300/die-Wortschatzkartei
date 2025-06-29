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