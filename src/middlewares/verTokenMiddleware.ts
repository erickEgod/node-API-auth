//middleware para verificar que el token sea el correcto

import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretWord = process.env.SECRET_WORD || "tgod";

export const authenticationToken = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const authHeader = req.headers["authorization"];
    const token = authHeader  && authHeader.split(" ")[1];

    if (!token) res.status(401).json({message: "NO AUTORIZADO"});
    else {
        jwt.verify(token, secretWord, (error, decoded) =>{
            if (error) {
                return res.status(403).json({message: "No tienes acceso a este recurso"})
            }else{
                
                next();
            }
        })
    }

};




