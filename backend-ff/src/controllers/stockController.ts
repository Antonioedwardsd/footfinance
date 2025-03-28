import { Request, Response } from "express";
import { saveStockData } from "../services/stockService";
import Stock from "../models/StockModel";

// Acciones que vas a sincronizar
const SYMBOLS = ["MANU", "SLBEN.LS", "SCP.LS", "JUVE.MI", "BVB.DE"];

// Sincronizar datos desde Yahoo Finance
export const syncStocks = async (req: Request, res: Response) => {
	try {
		const results = await Promise.all(
			SYMBOLS.map(async (symbol) => ({
				symbol,
				savedRecords: await saveStockData(symbol),
			}))
		);

		res.status(200).json({
			message: "Stocks synchronized successfully",
			data: results,
		});
	} catch (error) {
		console.error("Error syncing stocks:", error);
		res.status(500).json({ message: "Error syncing stocks", error });
	}
};

// Obtener datos almacenados desde MongoDB
export const getStockData = async (req: Request, res: Response) => {
	try {
		const { symbol } = req.params;

		const data = await Stock.find({ symbol }).sort({ date: 1 });

		res.status(200).json(data);
	} catch (error) {
		console.error("Error retrieving stock data:", error);
		res.status(500).json({ message: "Error retrieving stock data", error });
	}
};
