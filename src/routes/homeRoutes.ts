//!Métodos CRUD
import express from "express";
import { authenticationToken } from "../middlewares/verTokenMiddleware";
import { getAll, getOne, putCrud, patchCrud, deleteCrud } from "../CRUD/CRUDoperations";

const router = express.Router();

//ruta para mostrar el home cuando se registró correctamente
router.get("/", authenticationToken, getAll);
router.get("/:id", authenticationToken, getOne );
router.put("/:id", authenticationToken, putCrud );
router.patch("/:id", authenticationToken, patchCrud );
router.delete("/:id", authenticationToken, deleteCrud );


export default router;