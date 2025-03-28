import React from "react";
import { commonStyles } from "../../styles/commonStyles";

interface StatCardProps {
	title: string;
	value: string;
	icon?: string;
	primaryColor: string;
}

/**
 * StatCard - Componente para mostrar estadísticas financieras
 *
 * Muestra una tarjeta con un título, valor y un icono opcional con animación
 * de hover y colores personalizados según el equipo.
 */
const StatCard: React.FC<StatCardProps> = ({
	title,
	value,
	icon,
	primaryColor,
}) => (
	<div
		style={{
			...commonStyles.card,
			display: "flex",
			alignItems: "center",
		}}
		onMouseOver={(e) => {
			e.currentTarget.style.transform = "translateY(-3px)";
			e.currentTarget.style.boxShadow = "0 6px 25px rgba(0,0,0,0.1)";
		}}
		onMouseOut={(e) => {
			e.currentTarget.style.transform = "translateY(0)";
			e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
		}}
	>
		{icon && (
			<div
				style={{
					width: "46px",
					height: "46px",
					borderRadius: "10px",
					backgroundColor: `${primaryColor}15`,
					color: primaryColor,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					fontSize: "20px",
					marginRight: "15px",
					flexShrink: 0,
				}}
			>
				{icon}
			</div>
		)}
		<div>
			<div style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "5px" }}>
				{title}
			</div>
			<div style={{ fontSize: "20px", fontWeight: "bold", color: "#1e293b" }}>
				{value}
			</div>
		</div>
	</div>
);

export default StatCard;
