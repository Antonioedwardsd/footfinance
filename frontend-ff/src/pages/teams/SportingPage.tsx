import { useState, useEffect } from "react";
import api from "../../services/api";
import TeamPage from "../../components/team/TeamPage";
import PageContainer from "../../components/layouts/PageContainer";
import sportingLogo from "../../assets/logos/sportingLogo.png";
import sportingStadium from "../../assets/stadiums/sportingStadium.jpg";

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

const SportingPage = () => {
	const [data, setData] = useState<FormattedStockData[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await api.get("/SCP.LS");
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
				symbol="SCP.LS"
				teamName="Sporting CP"
				teamInfo={{
					country: "Portugal",
					founded: "1906",
					league: "Primeira Liga",
				}}
				additionalInfo={{
					description:
						"Sporting Clube de Portugal, commonly referred to as Sporting CP, is a Portuguese professional sports club based in Lisbon. They are known for their football team, which is one of the 'Big Three' clubs in Portugal.",
					logo: sportingLogo,
					achievements: [
						"19 Primeira Liga titles",
						"17 Portuguese Cup wins",
						"4 Portuguese League Cup wins",
						"1 European Cup Winners' Cup",
					],
					stadiumInfo: {
						name: "Estádio José Alvalade",
						capacity: "50,095",
						image: sportingStadium,
					},
					historicalPerformance:
						"Sporting CP is renowned for its youth academy, which has produced world-class talents like Cristiano Ronaldo, Luís Figo, and Paulo Futre. The club has a strong domestic record but has experienced periods of inconsistency in European competitions. Sporting's philosophy has always emphasized developing homegrown talent rather than making expensive transfers.",
				}}
				data={data}
				loading={loading}
			/>
		</PageContainer>
	);
};

export default SportingPage;
