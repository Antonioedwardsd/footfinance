import React from "react";
import { AdditionalInfo, TeamInfo } from "../team/types";
import TeamSelector from "../ui/TeamSelector";

interface HeroSectionProps {
	symbol: string;
	teamName: string;
	teamInfo: TeamInfo;
	additionalInfo?: AdditionalInfo;
	primaryColor: string;
	secondaryColor: string;
	currentPrice: number;
	percentChange: number;
	isPositive: boolean;
	onBackClick: () => void;
	symbols: string[];
	teamNames: Record<string, string>;
	teamLogos: Record<string, string>;
	onSymbolChange: (symbol: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
	symbol,
	teamName,
	teamInfo,
	additionalInfo,
	primaryColor,
	secondaryColor,
	currentPrice,
	percentChange,
	isPositive,
	onBackClick,
	symbols,
	teamNames,
	teamLogos,
	onSymbolChange,
}) => {
	return (
		<div
			style={{
				width: "100%",
				background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
				color: secondaryColor,
				padding: "40px 20px 40px",
				position: "relative",
				overflow: "hidden",
				borderRadius: "20px 20px 0 0",
				boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
			}}
		>
			<div
				style={{
					maxWidth: "1200px",
					margin: "0 auto",
					position: "relative",
					zIndex: 5,
					display: "flex",
					flexDirection: "column",
					gap: "20px", // Espacio entre filas
				}}
			>
				{/* FILA 1: Botón Back y Selector */}
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						width: "100%",
						marginBottom: "5px",
					}}
				>
					{/* COLUMNA 1-1: Botón Back */}
					<button
						onClick={onBackClick}
						style={{
							backgroundColor: "rgba(255,255,255,0.2)",
							color: secondaryColor,
							border: "none",
							padding: "8px 15px",
							borderRadius: "20px",
							fontSize: "16px",
							fontWeight: "bold",
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
							backdropFilter: "blur(5px)",
							transition: "all 0.2s ease",
							marginTop: "-40px",
						}}
						onMouseOver={(e) => {
							e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)";
							e.currentTarget.style.transform = "translateX(-3px)";
						}}
						onMouseOut={(e) => {
							e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
							e.currentTarget.style.transform = "translateX(0)";
						}}
					>
						← Back to Dashboard
					</button>

					{/* COLUMNA 1-2: Selector de equipos */}
					<div
						style={{
							width: "350px",
							background: "rgba(255,255,255,0.25)",
							borderRadius: "12px",
							padding: "10px",
							zIndex: 50,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<label
							htmlFor="team-hero-selector"
							style={{
								display: "block",
								marginBottom: "6px",
								fontWeight: "bold",
								fontSize: "16px",
							}}
						>
							Change to other team:
						</label>
						<TeamSelector
							symbols={symbols}
							selectedSymbol={symbol}
							onSelect={onSymbolChange}
							teamNames={teamNames}
							teamLogos={teamLogos}
							id="team-hero-selector"
						/>
					</div>
				</div>

				{/* FILA 2: Info del equipo y Current Price */}
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start",
						gap: "30px",
					}}
				>
					{/* COLUMNA 2-1: Información del equipo */}
					<div
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
						}}
					>
						{/* Logo y nombre del equipo */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								marginBottom: "10px",
								marginTop: "-40px",
							}}
						>
							{additionalInfo?.logo && (
								<img
									src={additionalInfo.logo}
									alt={`${teamName} logo`}
									style={{
										height: "70px",
										marginRight: "20px",
										filter: `drop-shadow(0 4px 6px rgba(0,0,0,0.1)) drop-shadow(0 0 10px ${primaryColor}40)`,
										transition: "transform 0.3s ease, filter 0.3s ease",
									}}
									onMouseOver={(e) => {
										e.currentTarget.style.transform = "scale(1.05)";
										e.currentTarget.style.filter = `drop-shadow(0 4px 8px rgba(0,0,0,0.15)) drop-shadow(0 0 15px ${primaryColor}60)`;
									}}
									onMouseOut={(e) => {
										e.currentTarget.style.transform = "scale(1)";
										e.currentTarget.style.filter = `drop-shadow(0 4px 6px rgba(0,0,0,0.1)) drop-shadow(0 0 10px ${primaryColor}40)`;
									}}
								/>
							)}
							<h1
								style={{
									fontSize: "48px",
									margin: "0",
									fontWeight: "bold",
									textShadow: "0 2px 10px rgba(0,0,0,0.2)",
								}}
							>
								{teamName}
							</h1>
						</div>

						{/* Símbolos bursátiles y detalles */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "15px",
								marginBottom: "15px",
							}}
						>
							<span
								style={{
									backgroundColor: "rgba(255,255,255,0.2)",
									padding: "5px 12px",
									borderRadius: "20px",
									backdropFilter: "blur(5px)",
									fontSize: "14px",
									fontWeight: "bold",
								}}
							>
								{symbol}
							</span>
							<span
								style={{
									display: "flex",
									alignItems: "center",
									gap: "15px",
									fontWeight: "500",
								}}
							>
								<span style={{ opacity: 0.8 }}>•</span> {teamInfo.league}
								<span style={{ opacity: 0.8 }}>•</span> {teamInfo.country}
							</span>
						</div>

						{/* Descripción del equipo */}
						<p
							style={{
								fontSize: "16px",
								lineHeight: "1.6",
								maxWidth: "100%", // Ahora puede usar todo el ancho disponible
								marginBottom: "15px",
								textShadow: "0 1px 2px rgba(0,0,0,0.1)",
							}}
						>
							{additionalInfo?.description || "No description available."}
						</p>
					</div>

					{/* COLUMNA 2-2: Current Stock Price */}
					<div
						style={{
							width: "350px", // Mismo ancho que el selector
							alignSelf: "flex-start", // Se alinea con la parte superior
						}}
					>
						<div
							style={{
								width: "100%",
								backgroundColor: "rgba(255,255,255,0.15)",
								backdropFilter: "blur(10px)",
								padding: "20px",
								borderRadius: "15px",
								boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
								textAlign: "center",
							}}
						>
							<div
								style={{
									fontSize: "14px",
									marginBottom: "5px",
									opacity: 0.9,
								}}
							>
								Current Stock Price
							</div>
							<div
								style={{
									fontSize: "32px",
									fontWeight: "bold",
									marginBottom: "10px",
									textShadow: "0 2px 5px rgba(0,0,0,0.2)",
								}}
							>
								${currentPrice.toFixed(2)}
							</div>
							<div
								style={{
									display: "inline-block",
									backgroundColor: isPositive
										? "rgba(0,255,0,0.2)"
										: "rgba(255,0,0,0.2)",
									color: isPositive ? "rgba(0,255,0,0.9)" : "rgba(255,0,0,0.9)",
									padding: "8px 12px",
									borderRadius: "20px",
									fontSize: "14px",
									fontWeight: "bold",
								}}
							>
								{isPositive ? "↑" : "↓"} {Math.abs(percentChange).toFixed(2)}%
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Patrón decorativo de fondo (sin cambios) */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${secondaryColor.replace(
						"#",
						"%23"
					)}' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					opacity: 0.1,
					zIndex: 1,
				}}
			></div>
		</div>
	);
};

export default HeroSection;
