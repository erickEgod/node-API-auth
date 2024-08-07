//!OPERACIONES CRUD 
import express, { Request, Response } from "express";
import prisma from "../models/prismaModel";
import { encryptPassword } from "../services/encryptPassword";


export const getAll = async (req: Request, res: Response):Promise<void> => {
    
    try {
        const all = await prisma.usuarios.findMany();
        res.status(200).json(all);

    } catch (error:any) {
        console.log(error);
    }
};


export const getOne = async(req:Request, res: Response):Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        const one = await prisma.usuarios.findUnique({where:{id}});
        if (!one){
            res.status(404).json({message:"Id de usuario no encontrado"});
        }else{
            res.status(200).json(one);
        }
    } catch (error:any) {
        console.log(error);
    }
};




export const putCrud = async (req:Request, res: Response):Promise<void> => {
    const id = parseInt(req.params.id);
    const {email, password} = req.body;
    try {
        if(!email || !password) {
            res.status(400).json({message:"El email y password nuevos son requeridos"});
        }else{

            //código para comprobar si ya existe el email al momento de hacer put o patch
            const isDuplicate = await prisma.usuarios.findUnique({where:{email}});
            if (isDuplicate) {
                res.status(400).json({message:"Email ya registrado"});
            }else{
                const encryptedPassword = await encryptPassword(password);
                const put = await prisma.usuarios.update({where:{id},
                    data: {
                    email,
                    password:encryptedPassword
                    }
                })
                res.status(201).json(`Usuario modificado`);  
            }
       
        }
        
    } catch (error:any) {
        
        if (error?.code=="P2025" && error?.meta?.cause?.includes("found")){
            res.status(400).json({message: "El id no existe"});
        }
    }
};


export const patchCrud = async (req:Request, res: Response):Promise<void> => {
    const id = parseInt(req.params.id);
    const {email, password} = req.body;
    try {
        if(!email && !password){
            res.status(400).json({message:"Envíe el email o el password nuevos para modificarlo"});
        }else if (email && password){
            res.status(400).json({message:"Para cambiar ambos parámetros use la operación 'PUT'"});
        }else if(!email && password){
            const encryptedPassword = await encryptPassword(password);
            const patchPassword = await prisma.usuarios.update({where:{id},
            data:{
                password:encryptedPassword
            }})
            res.status(200).json({message: "Contraseña modificada"});
        }else if(email && !password){
            //código para comprobar si ya existe el email al momento de hacer put o patch
            const isDuplicate = await prisma.usuarios.findUnique({where:{email}});
            if (isDuplicate) {
                res.status(400).json({message:"Email ya registrado"});
            }else{
                const patchEmail = await prisma.usuarios.update({where:{id},
                    data:{
                        email
                    }})  
                res.status(200).json({message: "Email modificado"});
            }
        }
        
    } catch (error:any) {
        if (error?.code=="P2025" && error?.meta?.cause?.includes("found")){
            res.status(400).json({message: "El id no existe"});
        }
    }
};


export const deleteCrud = async (req:Request, res: Response):Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        if(!id){
            res.status(400).json({message:"Envíe el id del usuario a ser eliminado"});
        }else{
            const del = await prisma.usuarios.delete({where:{id}})
            res.status(200).json({message:"Usuario eliminado"});
        }

    } catch (error:any) {
        //*error para cuando ya existe el email
        if (error?.code=="P2025" && error?.meta?.cause?.includes("exist")){
            res.status(400).json({message: "El id no existe"});
        }
    }
};

