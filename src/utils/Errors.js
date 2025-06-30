export class UserDefaultError extends Error{
    constructor(){
        super("Es ist ein Fehler aufgetreten! Bitte versuchen Sie es später noch einmal");
    }
}