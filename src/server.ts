//!Al ser la aplicación que se ejecuta primero debe tener el dotenv
//*SOlo se usa para abrir el puerto que escuchará

import dotenv from "dotenv";
import app from "./app";
import prisma from "./models/prismaModel";

dotenv.config();

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    console.log(`Escuchando desde el puerto ${port}`);
});


// Función para cerrar la conexión de Prisma
async function closePrismaConnection() {
    try {
        await prisma.$disconnect();
        console.log('Conexión a Prisma cerrada correctamente');
    } catch (error) {
        console.error('Error al cerrar la conexión a Prisma:', error);
    }
}

// Eventos del sistema para cerrar conexiones
process.on('SIGINT', async () => {
    await closePrismaConnection();  // Cierra la conexión a la base de datos
    server.close(() => {            // Cierra el servidor Express
        console.log('Servidor cerrado');
        process.exit(0);            // Termina el proceso de forma segura
    });
});

process.on('SIGTERM', async () => {
    await closePrismaConnection();  // Cierra la conexión a la base de datos
    server.close(() => {            // Cierra el servidor Express
        console.log('Servidor cerrado');
        process.exit(0);            // Termina el proceso de forma segura
    });
});









