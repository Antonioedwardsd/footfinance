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
import { commonStyles } from "../../styles/commonStyles";

interface ChartProps {
	data: { date: string; closingPrice: number }[];
	teamColor?: string;
}

const Chart = ({ data, teamColor = "#8884d8" }: ChartProps) => {
	const averagePrice =
		data.reduce((sum, item) => sum + item.closingPrice, 0) / data.length;

	// Configuración personalizada del tooltip
	const CustomTooltip = ({
		active,
		payload,
		label,
	}: {
		active?: boolean;
		payload?: { value: number }[];
		label?: string;
	}) => {
		if (active && payload && payload.length) {
			return (
				<div
					className="custom-tooltip"
					style={{
						backgroundColor: "#fff",
						padding: "10px",
						border: `1px solid ${teamColor}40`,
						borderRadius: "5px",
						boxShadow: `0 2px 5px ${teamColor}20`,
					}}
				>
					<p
						className="label"
						style={{ margin: 0, fontWeight: "bold" }}
					>{`${label}`}</p>
					<p style={{ margin: "5px 0", color: teamColor }}>
						{" "}
						{`Price: $${payload[0].value.toFixed(2)}`}
					</p>
				</div>
			);
		}
		return null;
	};

	return (
		<div
			style={{
				...commonStyles.sectionContainer,
				margin: "20px 0",
				border: `1px solid ${teamColor}15`,
			}}
		>
			<ResponsiveContainer width="100%" height={400}>
				<LineChart
					data={data}
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
						tickFormatter={(value) => `$${value}`}
					/>
					<Tooltip content={<CustomTooltip />} />
					<Legend
						wrapperStyle={{ paddingTop: "10px" }}
						formatter={() => (
							<span style={{ color: teamColor, fontWeight: 500 }}>
								Stock Price
							</span>
						)}
					/>
					<ReferenceLine
						y={averagePrice}
						label={{
							value: `Avg: $${averagePrice.toFixed(2)}`,
							position: "insideBottomRight",
							fill: "#666",
							fontSize: 12,
						}}
						stroke="#666"
						strokeDasharray="3 3"
					/>
					<Line
						type="monotone"
						dataKey="closingPrice"
						name="Closing Price"
						stroke={teamColor}
						strokeWidth={2}
						dot={{ fill: teamColor, r: 3, strokeWidth: 0 }}
						activeDot={{
							r: 5,
							stroke: teamColor,
							strokeWidth: 1,
							fill: "white",
						}}
						animationDuration={1500}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Chart;
