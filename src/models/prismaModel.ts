//*Modelo de la tabla usuario en prisma 
//*esta se creará luego con prisma init desde el cmd. Pero necesita este script para poder inctroducirlo en la app

import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

//exportamos la tabla "usuarios" de la base de datos creada en prisma
export default prisma;


