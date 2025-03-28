import { useNavigate } from "react-router-dom";
import ComparisonChart from "./ComparisonChart";
import PageContainer from "../components/layouts/PageContainer";
import { commonStyles } from "../styles/commonStyles";

const ComparisonPage = () => {
	const navigate = useNavigate();

	return (
		<PageContainer>
			<div
				style={{
					position: "relative",
					maxWidth: "1200px",
					margin: "0 auto",
					width: "100%",
				}}
			>
				{/* Encabezado con botón para volver */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						marginBottom: "30px",
						position: "relative",
					}}
				>
					<button
						onClick={() => navigate("/")}
						style={{
							backgroundColor: "rgba(71, 85, 105, 0.2)",
							color: "#0f172a",
							border: "none",
							padding: "8px 15px",
							borderRadius: "20px",
							fontSize: "14px",
							fontWeight: "bold",
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
							backdropFilter: "blur(5px)",
							transition: "all 0.2s ease",
							zIndex: 1,
						}}
						onMouseOver={(e) => {
							e.currentTarget.style.backgroundColor = "rgba(71, 85, 105, 0.3)";
							e.currentTarget.style.transform = "translateX(-3px)";
						}}
						onMouseOut={(e) => {
							e.currentTarget.style.backgroundColor = "rgba(71, 85, 105, 0.2)";
							e.currentTarget.style.transform = "translateX(0)";
						}}
					>
						← Back to Dashboard
					</button>

					<h1
						style={{
							fontSize: "32px",
							fontWeight: "bold",
							color: "#0f172a",
							position: "absolute",
							left: 0,
							right: 0,
							textAlign: "center",
							margin: 0,
							pointerEvents: "none",
						}}
					>
						Team Performance Analyzer
					</h1>
				</div>

				{/* Componente de comparación */}
				<ComparisonChart />

				{/* Sección "About This Tool" */}
				<div
					style={{
						...commonStyles.sectionContainer,
						marginTop: "30px",
					}}
				>
					<h3
						style={{
							fontSize: "22px",
							marginBottom: "15px",
							color: "#334155",
							borderBottom: "2px solid #e2e8f0",
							paddingBottom: "8px",
						}}
					>
						About This Tool
					</h3>
					<p style={{ lineHeight: "1.6", color: "#475569" }}>
						The Team Performance Analyzer allows you to compare stock
						performance across multiple football clubs. You can select different
						metrics, timeframes, and teams to create customized comparisons. Use
						the percentage change view to normalize data and compare relative
						performance regardless of absolute price.
					</p>
				</div>
			</div>
		</PageContainer>
	);
};

export default ComparisonPage;
