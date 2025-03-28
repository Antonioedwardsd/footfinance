import yahooFinance from "yahoo-finance2";
import Stock from "../models/StockModel";

// Función para obtener datos históricos del último año para un símbolo específico
export const fetchStockData = async (symbol: string) => {
	// Calcular fechas exactas para el último año
	const endDate = new Date();
	const startDate = new Date();
	startDate.setFullYear(endDate.getFullYear() - 1);

	const queryOptions = {
		period1: startDate,
		period2: endDate,
		interval: "1d" as const, // Al usar as const, TypeScript entiende que interval siempre será el valor exacto '1d'
	};

	const result = await yahooFinance.chart(symbol, queryOptions);

	if (!result) throw new Error(`No data found for ${symbol}`);

	const formattedData = result.quotes.map((day) => ({
		symbol,
		date: day.date,
		closingPrice: day.close,
	}));

	return formattedData;
};

// Función para guardar esos datos en la base de datos
export const saveStockData = async (symbol: string) => {
	const data = await fetchStockData(symbol);

	for (const record of data) {
		await Stock.updateOne(
			{ symbol: record.symbol, date: record.date },
			{ $set: record },
			{ upsert: true }
		);
	}

	return data.length;
};
