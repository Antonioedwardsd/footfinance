import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ComparisonChart from "../../pages/ComparisonChart";
import TeamSelector from "../ui/TeamSelector";
import {
	teamNames,
	teamUrls,
	teamLogos,
	teamColors,
	symbols,
} from "../../data/TeamData";

const Dashboard = () => {
	const [selectedSymbol, setSelectedSymbol] = useState(symbols[0]);
	const [activeSymbol, setActiveSymbol] = useState<string | null>(null);
	const navigate = useNavigate();

	// Navegar a los detalles del equipo cuando cambia la selección
	const handleSymbolChange = (symbol: string) => {
		setSelectedSymbol(symbol);
		navigate(teamUrls[symbol]);
	};

	// Navegar al hacer clic en una tarjeta de equipo
	const handleTeamCardClick = (symbol: string) => {
		navigate(teamUrls[symbol]);
	};

	return (
		<div
			style={{
				width: "100%",
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				padding: "20px",
				backgroundColor: "#f5f8fa",
				backgroundImage: "url('/images/background.jpg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				position: "relative",
				overflow: "auto",
			}}
		>
			{/* Contenedor de la aplicación */}
			<div
				style={{
					width: "100%",
					maxWidth: "1200px",
					padding: "40px",
					backgroundColor: "rgba(255, 255, 255, 0.9)",
					borderRadius: "20px",
					boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
					textAlign: "center",
					backdropFilter: "blur(10px)",
					zIndex: 2,
				}}
			>
				{/* Logo o título de la aplicación */}
				<div style={{ marginBottom: "40px" }}>
					<h1
						style={{
							fontSize: "52px",
							fontWeight: "bold",
							color: "#0f172a",
							margin: "0 0 15px 0",
							textShadow: "0 2px 8px rgba(0,0,0,0.2)",
							letterSpacing: "-0.5px",
						}}
					>
						FootFinance Tracker ⚽️📈
					</h1>

					<p
						style={{
							color: "#475569",
							fontSize: "18px",
							maxWidth: "500px",
							margin: "0 auto",
							fontWeight: "500",
						}}
					>
						Track and analyze stock performance of football clubs in the market
					</p>
				</div>

				{/* Mostrar tarjetas de equipos */}
				<div style={{ marginBottom: "30px" }}>
					<p
						style={{
							fontWeight: "bold",
							fontSize: "18px",
							color: "#34495e",
							marginBottom: "20px",
						}}
					>
						Choose a team to explore:
					</p>

					<div
						style={{
							display: "flex",
							justifyContent: "center",
							flexWrap: "wrap",
							gap: "25px",
							marginBottom: "30px",
						}}
					>
						{symbols.map((symbol) => (
							<div
								key={symbol}
								onClick={() => handleTeamCardClick(symbol)}
								onMouseEnter={() => setActiveSymbol(symbol)}
								onMouseLeave={() => setActiveSymbol(null)}
								style={{
									width: "200px",
									height: "200px",
									backgroundColor:
										activeSymbol === symbol
											? teamColors[symbol].primary
											: "white",
									color:
										activeSymbol === symbol
											? teamColors[symbol].secondary
											: "#333",
									borderRadius: "15px",
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									cursor: "pointer",
									boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
									transition:
										"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
									transform:
										activeSymbol === symbol
											? "translateY(-8px) scale(1.05)"
											: "translateY(0) scale(1)",
									border: `2px solid ${teamColors[symbol].primary}`,
									padding: "20px",
								}}
							>
								<div
									style={{
										width: "80px",
										height: "80px",
										borderRadius: "50%",
										backgroundColor: teamColors[symbol].primary,
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										marginBottom: "10px",
										overflow: "hidden",
										boxShadow: "inset 0 0 10px rgba(0,0,0,0.2)",
									}}
								>
									{teamLogos[symbol] ? (
										<img
											src={teamLogos[symbol]}
											alt={teamNames[symbol]}
											style={{
												width: "75%",
												height: "75%",
												objectFit: "contain",
												filter:
													activeSymbol === symbol ? "brightness(1.2)" : "none",
												transition: "all 0.3s ease",
											}}
										/>
									) : (
										<span
											style={{
												color: teamColors[symbol].secondary,
												fontWeight: "bold",
												fontSize: "18px",
											}}
										>
											{symbol.split(".")[0].substring(0, 3)}
										</span>
									)}
								</div>
								<span
									style={{
										fontSize: "15px",
										fontWeight: "bold",
										textAlign: "center",
									}}
								>
									{teamNames[symbol]}
								</span>
							</div>
						))}
					</div>
				</div>

				<div style={{ marginTop: "40px", marginBottom: "30px" }}>
					<h2
						style={{
							fontSize: "24px",
							fontWeight: "bold",
							color: "#0f172a",
							marginBottom: "20px",
							textAlign: "center",
						}}
					>
						Quick Comparison
					</h2>

					{/* Versión simplificada del ComparisonChart */}
					<ComparisonChart
						teamsToCompare={[symbols[0], symbols[1]]}
						metric="percent-change"
						timeframe="1M"
					/>

					{/* Botón para ir a la página de comparación avanzada */}
					<div style={{ textAlign: "center", marginTop: "15px" }}>
						<button
							onClick={() => navigate("/compare")}
							style={{
								padding: "10px 20px",
								backgroundColor: "#2563eb",
								color: "white",
								borderRadius: "8px",
								border: "none",
								fontWeight: "600",
								cursor: "pointer",
								boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
							}}
						>
							Advanced Comparison Tool →
						</button>
					</div>
				</div>

				{/* Selector de equipos para selección rápida */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						width: "100%",
						padding: "25px",
						color: "#333",
						backgroundColor: "#f0f3f8",
						borderRadius: "15px",
						boxShadow:
							"inset 0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(255,255,255,0.3)",
						border: "1px solid rgba(0,0,0,0.04)",
					}}
				>
					<label
						htmlFor="team-selector"
						style={{
							marginBottom: "15px",
							fontWeight: "bold",
							fontSize: "16px",
							color: "#34495e",
						}}
					>
						Or select a team using the dropdown:
					</label>
					<TeamSelector
						symbols={symbols}
						selectedSymbol={selectedSymbol}
						onSelect={handleSymbolChange}
						teamNames={teamNames}
						teamLogos={teamLogos}
						id="team-selector"
					/>
				</div>

				{/* Footer informativo con estilo */}
				<div
					style={{
						marginTop: "40px",
						padding: "25px",
						backgroundColor: "rgba(0,0,0,0.05)",
						borderRadius: "10px",
						fontSize: "14px",
						color: "#64748b",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: "10px",
						border: "1px solid rgba(0,0,0,0.05)",
					}}
				>
					<span role="img" aria-label="info" style={{ fontSize: "24px" }}>
						ℹ️
					</span>
					<span style={{ fontWeight: "500" }}>
						Data is updated daily from financial markets. Last update:{" "}
						{new Date().toLocaleDateString()}
					</span>
					<span>© 2024 FootStock Tracker. All rights reserved.</span>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
