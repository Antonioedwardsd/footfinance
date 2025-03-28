import { useNavigate } from "react-router-dom";
import { useStockStatistics } from "../../hooks/useStockStatistics";
import Chart from "../ui/Chart";
import HeroSection from "../sections/HeroSection";
import FinancialSection from "../sections/FinancialSection";
import StadiumSection from "../sections/StadiumSection";
import InfoCard from "../common/InfoCard";
import {
	teamColors,
	countryFlags,
	leagueIcons,
	teamNames,
	teamLogos,
	teamUrls,
	symbols,
} from "../../data/TeamData";

// SECCIÓN: Definición de interfaces
interface FormattedStockData {
	symbol: string;
	date: string;
	closingPrice: number;
	_id?: string;
}

interface TeamPageProps {
	symbol: string;
	teamName: string;
	teamInfo: {
		country: string;
		founded: string;
		league: string;
	};
	// Información específica de equipo
	additionalInfo?: {
		description: string;
		achievements: string[];
		stadiumInfo?: {
			name: string;
			capacity: string;
			image?: string;
		};
		historicalPerformance?: string;
		customContent?: React.ReactNode;
		logo?: string;
	};
	// Datos y estado de carga proporcionados directamente
	data: FormattedStockData[];
	loading: boolean;
}

const TeamPage = ({
	symbol,
	teamName,
	teamInfo,
	additionalInfo,
	data,
	loading,
}: TeamPageProps) => {
	// SECCIÓN: Hooks y configuración
	const navigate = useNavigate();

	// Colores para este equipo específico (importados de Dashboard)
	const primaryColor = teamColors[symbol]?.primary || "#8884d8";
	const secondaryColor = teamColors[symbol]?.secondary || "#FFFFFF";

	// Estadísticas financieras calculadas
	const {
		currentPrice,
		openingPrice,
		highestPrice,
		lowestPrice,
		percentChange,
		isPositive,
		volatility,
	} = useStockStatistics(data);

	const handleSymbolChange = (newSymbol: string) => {
		navigate(teamUrls[newSymbol]);
	};

	return (
		// SECCIÓN: Contenedor principal con fondo degradado
		<div
			style={{
				width: "100%",
				minHeight: "100vh",
				backgroundColor: "#f5f8fa",
				backgroundImage: `linear-gradient(135deg, ${secondaryColor}11 0%, ${primaryColor}11 100%)`,
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Componente HeroSection modularizado */}
			<HeroSection
				symbol={symbol}
				teamName={teamName}
				teamInfo={teamInfo}
				additionalInfo={additionalInfo}
				primaryColor={primaryColor}
				secondaryColor={secondaryColor}
				currentPrice={currentPrice}
				percentChange={percentChange}
				isPositive={isPositive}
				onBackClick={() => navigate("/")}
				symbols={symbols}
				teamNames={teamNames}
				teamLogos={teamLogos}
				onSymbolChange={handleSymbolChange}
			/>

			{/* SECCIÓN: Contenido principal */}
			<div
				style={{
					maxWidth: "1200px",
					margin: "0 auto",
					padding: "40px 20px",
					position: "relative",
					zIndex: 2,
				}}
			>
				{/* SECCIÓN: Estadísticas financieras */}
				<FinancialSection
					openingPrice={openingPrice}
					highestPrice={highestPrice}
					lowestPrice={lowestPrice}
					percentChange={percentChange}
					isPositive={isPositive}
					volatility={volatility}
					primaryColor={primaryColor}
				/>

				{additionalInfo?.stadiumInfo && (
					<StadiumSection
						stadiumInfo={additionalInfo.stadiumInfo}
						achievements={additionalInfo.achievements || []}
						primaryColor={primaryColor}
					/>
				)}

				{/* SECCIÓN: Información del club */}
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
						Club Information
					</h2>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
							gap: "20px",
						}}
					>
						<InfoCard
							title="Founded"
							value={teamInfo.founded}
							icon="📅"
							primaryColor={primaryColor}
						/>
						<InfoCard
							title="Country"
							value={teamInfo.country}
							icon={countryFlags[teamInfo.country] || "🌍"}
							primaryColor={primaryColor}
						/>
						<InfoCard
							title="League"
							value={teamInfo.league}
							icon={leagueIcons[teamInfo.league] || "🏟️"}
							primaryColor={primaryColor}
						/>
					</div>
				</div>

				{/* SECCIÓN: Contenido personalizado */}
				{additionalInfo?.customContent && (
					<div style={{ marginBottom: "40px" }}>
						{additionalInfo.customContent}
					</div>
				)}

				{/* SECCIÓN: Análisis histórico */}
				{additionalInfo?.historicalPerformance && (
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
							Historical Performance
						</h2>
						<div
							style={{
								padding: "25px",
								backgroundColor: "white",
								borderRadius: "15px",
								boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
								lineHeight: "1.7",
							}}
						>
							<p>{additionalInfo.historicalPerformance}</p>
						</div>
					</div>
				)}

				{/* SECCIÓN: Gráfico histórico de precios */}
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
						Stock Price History
					</h2>
					{loading ? (
						<div
							style={{
								backgroundColor: "white",
								borderRadius: "15px",
								boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
								padding: "80px 0",
								textAlign: "center",
								color: "#95a5a6",
							}}
						>
							<div
								style={{
									display: "inline-block",
									width: "40px",
									height: "40px",
									border: `3px solid ${primaryColor}30`,
									borderTopColor: primaryColor,
									borderRadius: "50%",
									animation: "spin 1s infinite linear",
									marginBottom: "15px",
								}}
							></div>
							<p>Loading stock data...</p>
							<style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
						</div>
					) : (
						<div
							style={{
								backgroundColor: "white",
								borderRadius: "15px",
								boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
								padding: "25px",
							}}
						>
							<Chart data={data} teamColor={primaryColor} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TeamPage;
