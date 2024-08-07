import bcrypt from "bcrypt";

const salt_rounds:number = 10;

//función para encriptar contraseña
export const encryptPassword = async (password:string):Promise<string> => {
    return await bcrypt.hash(password, salt_rounds);
};


//funcion para comparar contraseñas encriptadas

export const comparePasswords = async(password:string, encryptedPassword:string):Promise<boolean> => {
    return await bcrypt.compare(password, encryptedPassword);
};

