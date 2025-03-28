import { useState, useEffect } from "react";
import { commonStyles } from "../styles/commonStyles";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
	Legend,
	ReferenceLine,
} from "recharts";
import { teamColors, teamNames, symbols } from "../data/TeamData";

// Tipos de datos
interface StockData {
	date: string;
	closingPrice: number;
	symbol: string;
}

type TimeframeType = "1W" | "1M" | "3M" | "6M" | "1Y" | "MAX";

interface NormalizedData {
	date: string;
	[key: string]: number | string;
}

interface ComparisonChartProps {
	initialData?: Record<string, StockData[]>;
	teamsToCompare?: string[];
	timeframe?: "1W" | "1M" | "3M" | "6M" | "1Y" | "MAX";
	metric?: "raw-price" | "percent-change" | "volume";
}

interface TooltipPayload {
	dataKey: string;
	value: number;
	color: string;
	name?: string;
}

const getCommonDates = (data: Record<string, StockData[]>) => {
	const datesByTeam = Object.values(data).map((teamData) =>
		teamData.map((item) => item.date)
	);

	// Encontrar fechas comunes
	let commonDates = datesByTeam[0];
	for (let i = 1; i < datesByTeam.length; i++) {
		commonDates = commonDates.filter((date) => datesByTeam[i].includes(date));
	}

	return commonDates;
};

// Procesar datos según porcentaje de cambio
const processPercentChangeData = (
	data: Record<string, StockData[]>,
	commonDates: string[]
) => {
	const normalizedData: NormalizedData[] = [];

	for (const symbol in data) {
		const teamData = data[symbol];
		const initialPrice =
			teamData.find((d) => d.date === commonDates[0])?.closingPrice || 0;

		for (const date of commonDates) {
			const dataPoint = teamData.find((d) => d.date === date);
			if (!dataPoint) continue;

			const percentChange =
				((dataPoint.closingPrice - initialPrice) / initialPrice) * 100;

			// Añadir o actualizar punto de datos
			const existingPoint = normalizedData.find((d) => d.date === date);
			if (existingPoint) {
				existingPoint[symbol] = parseFloat(percentChange.toFixed(2));
			} else {
				const newPoint: NormalizedData = { date };
				newPoint[symbol] = parseFloat(percentChange.toFixed(2));
				normalizedData.push(newPoint);
			}
		}
	}

	return normalizedData;
};

// Procesar datos de precio bruto
const processRawPriceData = (
	data: Record<string, StockData[]>,
	commonDates: string[]
) => {
	const normalizedData: NormalizedData[] = [];

	for (const date of commonDates) {
		const dataPoint: NormalizedData = { date };

		for (const symbol in data) {
			const price = data[symbol].find((d) => d.date === date)?.closingPrice;
			if (price !== undefined) {
				dataPoint[symbol] = price;
			}
		}

		normalizedData.push(dataPoint);
	}

	return normalizedData;
};

// Procesar datos de volumen
const processVolumeData = (
	data: Record<string, StockData[]>,
	commonDates: string[]
) => {
	const normalizedData: NormalizedData[] = [];

	for (const date of commonDates) {
		const dataPoint: NormalizedData = { date };

		for (const symbol in data) {
			const stockData = data[symbol].find((d) => d.date === date);
			if (stockData) {
				dataPoint[symbol] = Math.floor(
					stockData.closingPrice * 1000 * (0.8 + Math.random() * 0.4)
				);
			}
		}

		normalizedData.push(dataPoint);
	}

	return normalizedData;
};

// Función para crear datos simulados
const createMockData = (selectedTeams: string[]) => {
	const mockData: Record<string, StockData[]> = {};

	for (const symbol of selectedTeams) {
		const startDate = new Date("2022-01-01");
		const endDate = new Date();
		const days = Math.floor(
			(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
		);

		const stockData: StockData[] = [];
		let basePrice = 10 + Math.random() * 20;

		for (let i = 0; i < days; i += 7) {
			const currentDate = new Date(startDate);
			currentDate.setDate(startDate.getDate() + i);

			basePrice *= 1 + (Math.random() * 0.06 - 0.03); // +/- 3%

			stockData.push({
				date: currentDate.toISOString().split("T")[0],
				closingPrice: parseFloat(basePrice.toFixed(2)),
				symbol,
			});
		}

		mockData[symbol] = stockData;
	}

	return mockData;
};

const ComparisonChart = ({
	initialData,
	teamsToCompare = ["MANU", "JUVE.MI"],
	timeframe = "1Y",
	metric = "percent-change",
}: ComparisonChartProps) => {
	const [selectedTeams, setSelectedTeams] = useState<string[]>(teamsToCompare);
	const [comparisonData, setComparisonData] = useState<NormalizedData[]>([]);
	const [selectedMetric, setSelectedMetric] = useState(metric);
	const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const processData = (data: Record<string, StockData[]>) => {
			if (Object.keys(data).length === 0) return;

			// Encontrar fechas comunes
			const commonDates = getCommonDates(data);

			// Procesar datos según la métrica seleccionada
			let normalizedData: NormalizedData[] = [];

			if (selectedMetric === "percent-change") {
				normalizedData = processPercentChangeData(data, commonDates);
			} else if (selectedMetric === "raw-price") {
				normalizedData = processRawPriceData(data, commonDates);
			} else if (selectedMetric === "volume") {
				normalizedData = processVolumeData(data, commonDates);
			}

			// Ordenar por fecha
			normalizedData.sort(
				(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
			);

			setComparisonData(normalizedData);
		};

		const loadData = async () => {
			setIsLoading(true);

			try {
				if (initialData) {
					processData(initialData);
				} else {
					const mockData = createMockData(selectedTeams);
					processData(mockData);
				}
			} catch (error) {
				console.error("Error loading comparison data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadData();
	}, [selectedTeams, selectedTimeframe, selectedMetric, initialData]);

	// Configuración personalizada del tooltip
	const CustomTooltip = ({
		active,
		payload,
		label,
	}: {
		active?: boolean;
		payload?: TooltipPayload[];
		label?: string;
	}) => {
		if (active && payload && payload.length) {
			return (
				<div
					style={{
						backgroundColor: "#fff",
						padding: "10px",
						border: "1px solid #ddd",
						borderRadius: "5px",
						boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
					}}
				>
					<p style={{ margin: 0, fontWeight: "bold" }}>{`Date: ${label}`}</p>
					{payload.map((entry, index) => (
						<p
							key={`item-${index}`}
							style={{ margin: "5px 0", color: entry.color }}
						>
							{`${
								teamNames[entry.dataKey] || entry.dataKey
							}: ${entry.value.toFixed(2)}${
								selectedMetric === "percent-change"
									? "%"
									: selectedMetric === "volume"
									? " shares"
									: "$"
							}`}
						</p>
					))}
				</div>
			);
		}
		return null;
	};

	// Controlador para cambiar equipos seleccionados
	const handleTeamToggle = (symbol: string) => {
		setSelectedTeams((prev) =>
			prev.includes(symbol)
				? prev.filter((s) => s !== symbol)
				: [...prev, symbol]
		);
	};

	// Renderizar gráfico de comparación
	return (
		<div
			style={{
				...commonStyles.mainContainer,
			}}
		>
			{/* Selector de métricas */}
			<div
				style={{
					marginBottom: "20px",
					display: "flex",
					justifyContent: "center",
					gap: "15px",
				}}
			>
				<button
					onClick={() => setSelectedMetric("percent-change")}
					style={{
						...commonStyles.secondaryButton,
						backgroundColor:
							selectedMetric === "percent-change" ? "#3b82f6" : "#e5e7eb",
						color: selectedMetric === "percent-change" ? "white" : "#374151",
						fontWeight: selectedMetric === "percent-change" ? "bold" : "normal",
					}}
				>
					% Change
				</button>
				<button
					onClick={() => setSelectedMetric("raw-price")}
					style={{
						padding: "8px 15px",
						borderRadius: "6px",
						border: "none",
						backgroundColor:
							selectedMetric === "raw-price" ? "#3b82f6" : "#e5e7eb",
						color: selectedMetric === "raw-price" ? "white" : "#374151",
						cursor: "pointer",
						fontWeight: selectedMetric === "raw-price" ? "bold" : "normal",
					}}
				>
					Price
				</button>
				<button
					onClick={() => setSelectedMetric("volume")}
					style={{
						padding: "8px 15px",
						borderRadius: "6px",
						border: "none",
						backgroundColor:
							selectedMetric === "volume" ? "#3b82f6" : "#e5e7eb",
						color: selectedMetric === "volume" ? "white" : "#374151",
						cursor: "pointer",
						fontWeight: selectedMetric === "volume" ? "bold" : "normal",
					}}
				>
					Volume
				</button>
			</div>

			{/* Selector de equipos */}
			<div style={{ marginBottom: "20px" }}>
				<p style={{ marginBottom: "10px", textAlign: "center" }}>
					Select teams to compare:
				</p>
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "center",
						gap: "10px",
					}}
				>
					{symbols.map((symbol) => (
						<button
							key={symbol}
							onClick={() => handleTeamToggle(symbol)}
							style={{
								padding: "6px 12px",
								borderRadius: "6px",
								border: `2px solid ${teamColors[symbol].primary}`,
								backgroundColor: selectedTeams.includes(symbol)
									? teamColors[symbol].primary
									: "transparent",
								color: selectedTeams.includes(symbol)
									? teamColors[symbol].secondary
									: teamColors[symbol].primary,
								cursor: "pointer",
								display: "flex",
								alignItems: "center",
								gap: "5px",
							}}
						>
							<span
								style={{
									width: "12px",
									height: "12px",
									borderRadius: "50%",
									backgroundColor: teamColors[symbol].primary,
									display: "inline-block",
									marginRight: "5px",
								}}
							></span>
							{teamNames[symbol]}
						</button>
					))}
				</div>
			</div>

			{/* Gráfico de comparación */}
			{isLoading ? (
				<div style={{ textAlign: "center", padding: "30px" }}>
					Loading comparison data...
				</div>
			) : comparisonData.length > 0 ? (
				<ResponsiveContainer width="100%" height={400}>
					<LineChart
						data={comparisonData}
						margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
					>
						<CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
						<XAxis
							dataKey="date"
							tick={{ fill: "#666", fontSize: 12 }}
							tickMargin={10}
						/>
						<YAxis
							tick={{ fill: "#666", fontSize: 12 }}
							tickMargin={10}
							tickFormatter={(value) =>
								selectedMetric === "percent-change"
									? `${value}%`
									: selectedMetric === "volume"
									? `${(value / 1000).toFixed(0)}k`
									: `$${value}`
							}
						/>
						<Tooltip content={<CustomTooltip />} />
						<Legend />
						{selectedTeams.map((symbol) => (
							<Line
								key={symbol}
								type="monotone"
								dataKey={symbol}
								name={teamNames[symbol]}
								stroke={teamColors[symbol].primary}
								strokeWidth={2}
								dot={{ fill: teamColors[symbol].primary, r: 3 }}
								activeDot={{
									r: 5,
									stroke: teamColors[symbol].primary,
									strokeWidth: 1,
									fill: "white",
								}}
								animationDuration={1500}
							/>
						))}
						{selectedMetric === "percent-change" && (
							<ReferenceLine
								y={0}
								stroke="#666"
								strokeDasharray="3 3"
								label={{ value: "Baseline", position: "right", fill: "#666" }}
							/>
						)}
					</LineChart>
				</ResponsiveContainer>
			) : (
				<div style={{ textAlign: "center", padding: "30px" }}>
					No data available for comparison
				</div>
			)}

			{/* Selector de timeframe */}
			<div
				style={{
					marginTop: "20px",
					display: "flex",
					justifyContent: "center",
					gap: "10px",
				}}
			>
				{["1W", "1M", "3M", "6M", "1Y", "MAX"].map((period) => (
					<button
						key={period}
						onClick={() => setSelectedTimeframe(period as TimeframeType)}
						style={{
							padding: "6px 12px",
							borderRadius: "6px",
							border: "none",
							backgroundColor:
								selectedTimeframe === period ? "#3b82f6" : "#e5e7eb",
							color: selectedTimeframe === period ? "white" : "#374151",
							cursor: "pointer",
							fontWeight: selectedTimeframe === period ? "bold" : "normal",
						}}
					>
						{period}
					</button>
				))}
			</div>
		</div>
	);
};

export default ComparisonChart;
