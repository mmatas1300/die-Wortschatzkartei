import bcrypt from 'bcryptjs'

export const bcryptHash = async (chain)=>{
    const chainHashed = await bcrypt.hash(chain, 10);
    return chainHashed;
}