import { useState, useEffect } from "react";
import { FormattedStockData } from "../components/team/types";

export function useStockStatistics(data: FormattedStockData[]) {
	// Estado para almacenar las estadísticas calculadas
	const [statistics, setStatistics] = useState({
		currentPrice: 0,
		openingPrice: 0,
		highestPrice: 0,
		lowestPrice: 0,
		priceChange: 0,
		percentChange: 0,
		isPositive: false,
		volatility: 0,
	});

	// Efecto para recalcular cuando cambian los datos
	useEffect(() => {
		// Si no hay datos, mantenemos los valores por defecto
		if (!data.length) return;

		const currentPrice = data[data.length - 1].closingPrice;
		const openingPrice = data[0].closingPrice;
		const highestPrice = Math.max(...data.map((item) => item.closingPrice));
		const lowestPrice = Math.min(...data.map((item) => item.closingPrice));
		const priceChange = currentPrice - openingPrice;
		const percentChange = openingPrice ? (priceChange / openingPrice) * 100 : 0;
		const isPositive = priceChange >= 0;

		const volatility =
			data.length > 1
				? Math.sqrt(
						data
							.map((d) => d.closingPrice)
							.reduce((sum, price, i, prices) => {
								if (i === 0) return sum;
								const dailyReturn = (price - prices[i - 1]) / prices[i - 1];
								return sum + dailyReturn * dailyReturn;
							}, 0) /
							(data.length - 1)
				  ) * 100
				: 0;

		// Actualizar el estado con los nuevos cálculos
		setStatistics({
			currentPrice,
			openingPrice,
			highestPrice,
			lowestPrice,
			priceChange,
			percentChange,
			isPositive,
			volatility,
		});
	}, [data]); // Se ejecuta cuando cambia data

	return statistics;
}
