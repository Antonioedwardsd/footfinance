import { useState, useEffect } from "react";
import api from "../../services/api";
import TeamPage from "../../components/team/TeamPage";
import PageContainer from "../../components/layouts/PageContainer";
import juventusLogo from "../../assets/logos/juventusLogo.png";
import juveStadium from "../../assets/stadiums/juveStadium.jpg";

// Interfaces necesarias
interface StockData {
	symbol: string;
	date: string;
	closingPrice: number;
	_id?: string;
}

interface FormattedStockData {
	symbol: string;
	date: string;
	closingPrice: number;
	_id?: string;
}

const JuventusPage = () => {
	const [data, setData] = useState<FormattedStockData[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await api.get("/JUVE.MI");
				const formattedData = res.data.map(
					(item: StockData): FormattedStockData => ({
						...item,
						date: new Date(item.date).toLocaleDateString(),
					})
				);
				setData(formattedData);
			} catch (error) {
				console.error("Error fetching stock data:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<PageContainer>
			<TeamPage
				symbol="JUVE.MI"
				teamName="Juventus FC"
				teamInfo={{
					country: "Italy",
					founded: "1897",
					league: "Serie A",
				}}
				additionalInfo={{
					description:
						"Juventus Football Club, colloquially known as Juve, is a professional football club based in Turin, Italy. The club has won 36 official league titles, 14 Coppa Italia titles, and nine Supercoppa Italiana titles.",
					logo: juventusLogo,
					achievements: [
						"36 Serie A titles",
						"14 Coppa Italia wins",
						"9 Supercoppa Italiana wins",
						"2 Champions League/European Cup victories",
					],
					stadiumInfo: {
						name: "Allianz Stadium",
						capacity: "41,507",
						image: juveStadium,
					},
					historicalPerformance:
						"Juventus is Italy's most successful club and one of the most prestigious in world football. Known for their traditional black and white striped jerseys, 'The Old Lady' dominated Italian football particularly in the 1980s and the 2010s. The club has experienced both tremendous success and controversy, including the Calciopoli scandal in 2006 that saw them relegated to Serie B. They have since rebuilt and established themselves once again as a European powerhouse.",
				}}
				data={data}
				loading={loading}
			/>
		</PageContainer>
	);
};

export default JuventusPage;
