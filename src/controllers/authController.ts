import express, { Request, Response } from "express";
import { encryptPassword, comparePasswords } from "../services/encryptPassword";
import prisma from "../models/prismaModel";
import { getToken } from "../services/token";

//controlador para la ruta de registro en la autenticación
export const register = async (req: Request, res: Response):Promise<void> => {
    const {email, password} = req.body;

    try {
        if (!email || !password){
            res.status(400).json({message: "El email y el password son requeridos:"});
            return
        }
        //hasheo la contraseña con bcrypt
        const encryptedPassword = await encryptPassword(password);

        //* Se inserta el nuevo usuario en la base de datos 
        //* acá pondríamos código SQL pero prisma hace eso por nosotros
        //! se usa el modelo prisma creado
        const insert = await prisma.usuarios.create({ //es hacer un insert en sql
            data:{  
                email,  //mandamos email
                password: encryptedPassword //mandamos la contraseña encriptada
            }
        });

        //*Damos el token para que ya ingrese directamente
        const token = getToken(insert);
        res.setHeader("authorization", `Bearer ${token}`);
        res.status(201).json({message: `Registro correcto. TOKEN: ${token}`});

    } catch (error:any) {
         //*error para cuando ya existe el email
         if (error?.code=="P2002" && error?.meta?.target?.includes("email")){
            res.status(400).json({message: "El email ingresado ya existe"});
        }
    }

};

//login
export const login = async(req:Request, res:Response):Promise<void> =>{
    const {email, password} = req.body;

    try {
        if (!email || !password){
            res.status(400).json({message: "El email y el password son requeridos:"});
            return
        }

        const dbUser = await prisma.usuarios.findUnique({where:{email}});
        if(!dbUser){
            res.status(404).json({message: "email no registrado"});
        }else{
            //comparar constraseñas hasheadas
            const equalPasswords = await comparePasswords(password, dbUser.password);
            if(equalPasswords==false){
                res.status(401).json({message:"Contraseña o usuario no coinciden"});
            }else{
                const token = getToken(dbUser);
                res.setHeader("authorization", `Bearer ${token}`);
                //*le mando tambien por el body para hacer pruebas
                res.status(200).json({message: `Sesión iniciada. TOKEN: ${token}`});
            }
        }



    } catch (error:any) {
        console.log(error);
    }

};


