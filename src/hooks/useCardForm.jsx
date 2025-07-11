import { useState } from "react";

export const useCardForm = (defaultFields) => {
    const [formFields, setFormFields] = useState(defaultFields);
    const [formColor, setFormColor] = useState("bg-green-card");

    const setForm = (fields, color) => {
        setFormFields(fields);
        setFormColor(color);
    };
    return {formColor, formFields, setForm};
};