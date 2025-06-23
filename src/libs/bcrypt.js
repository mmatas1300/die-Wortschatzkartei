import bcrypt from 'bcryptjs'

export const bcryptHash = async (chain)=>{
    return await bcrypt.hash(chain, 10);
}

export const bcryptCompare = async (formPassword, userFoundPassword)=>{ 
    return await bcrypt.compare(formPassword, userFoundPassword);
}