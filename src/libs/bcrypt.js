import bcrypt from 'bcryptjs'

export const bcryptHash = async (chain)=>{
    const chainHashed = await bcrypt.hash(chain, 10);
    return chainHashed;
}

export const bcryptCompare = async (formPassword, userFoundPassword)=>{
    const passwordMatch = await bcrypt.compare(formPassword, userFoundPassword);
    return passwordMatch;
}