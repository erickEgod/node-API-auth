import jwt from "jsonwebtoken";
import {Usuarios} from "../models/usuariosTableInterface";

const secretWord = process.env.SECRET_WORD || "tgod";

//usuarios:Usuarios (usa el interfaz creado en models para lo que es un usuario)
export const getToken = (usuario:Usuarios):String => {
    return jwt.sign({
        id: usuario.id,
        email: usuario.email,
        password: usuario.password
    }, secretWord, {expiresIn: "1h"} );
};




