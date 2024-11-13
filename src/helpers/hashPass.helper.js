import bcrypt from 'bcrypt'

export const hashPassword = async (newPassword) =>{
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    return hashPassword
}