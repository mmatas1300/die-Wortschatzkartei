export default function EmailTemplate(name,email,message){
    return (`
        <p>Hi, my name is <strong>${name}</strong> and my email is <strong>${email}</strong></p>
        <p>${message}</p>
    `);
} 