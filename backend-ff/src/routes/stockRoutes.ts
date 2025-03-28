import { Router } from "express";
import { syncStocks, getStockData } from "../controllers/stockController";

// Crear el Router de Express
const router = Router();

// Ruta para sincronizar datos manualmente desde Yahoo Finance
router.get("/sync", syncStocks);

// Ruta para obtener los datos almacenados de una acción específica
router.get("/:symbol", getStockData);

export default router;
