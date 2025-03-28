import React from "react";
import StatCard from "../common/StatCard";

interface FinancialSectionProps {
	openingPrice: number;
	highestPrice: number;
	lowestPrice: number;
	percentChange: number;
	isPositive: boolean;
	volatility: number;
	primaryColor: string;
}

const FinancialSection: React.FC<FinancialSectionProps> = ({
	openingPrice,
	highestPrice,
	lowestPrice,
	volatility,
	primaryColor,
}) => {
	return (
		<div style={{ marginBottom: "40px" }}>
			<h2
				style={{
					fontSize: "24px",
					color: "#2c3e50",
					marginBottom: "20px",
					paddingBottom: "10px",
					borderBottom: `2px solid ${primaryColor}30`,
				}}
			>
				Financial Performance
			</h2>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
					gap: "20px",
				}}
			>
				<StatCard
					title="Opening Price"
					value={`$${openingPrice.toFixed(2)}`}
					primaryColor={primaryColor}
					icon="📊"
				/>
				<StatCard
					title="Highest Price"
					value={`$${highestPrice.toFixed(2)}`}
					primaryColor={primaryColor}
					icon="📈"
				/>
				<StatCard
					title="Lowest Price"
					value={`$${lowestPrice.toFixed(2)}`}
					primaryColor={primaryColor}
					icon="📉"
				/>

				<StatCard
					title="Volatility"
					value={`${volatility.toFixed(2)}%`}
					primaryColor={primaryColor}
					icon="🔄"
				/>
			</div>
		</div>
	);
};

export default FinancialSection;
