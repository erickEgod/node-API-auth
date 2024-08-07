import express from "express";
import authRouter from "./routes/authRoutes";
import homeRouter from "./routes/homeRoutes"
const app = express();


app.use(express.json());

//ruta de autenticación
app.use("/auth",authRouter );
app.use("/home",homeRouter);
//ruta de api

export default app;

