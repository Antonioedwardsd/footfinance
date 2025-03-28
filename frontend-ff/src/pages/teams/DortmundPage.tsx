import { useState, useEffect } from "react";
import api from "../../services/api";
import TeamPage from "../../components/team/TeamPage";
import PageContainer from "../../components/layouts/PageContainer";
import dortmundStadium from "../../assets/stadiums/dortmundStadium.jpg";
import dortmundLogo from "../../assets/logos/dortmundLogo.png";

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

const DortmundPage = () => {
	const [data, setData] = useState<FormattedStockData[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await api.get("/BVB.DE");
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
				symbol="BVB.DE"
				teamName="Borussia Dortmund"
				teamInfo={{
					country: "Germany",
					founded: "1909",
					league: "Bundesliga",
				}}
				additionalInfo={{
					description:
						"Ballspielverein Borussia 09 e.V. Dortmund, commonly known as Borussia Dortmund or BVB, is a German professional sports club based in Dortmund, North Rhine-Westphalia. Dortmund is known for its passionate fans and the famous 'Yellow Wall' at their home stadium.",
					logo: dortmundLogo,
					achievements: [
						"8 German Championships",
						"5 DFB-Pokal titles",
						"1 Champions League trophy",
						"1 Cup Winners' Cup",
					],
					stadiumInfo: {
						name: "Signal Iduna Park",
						capacity: "81,365",
						image: dortmundStadium,
					},
					historicalPerformance:
						"Borussia Dortmund has been one of Germany's most successful clubs, known for their attacking football and developing young talent. The club reached its peak in the mid-1990s under Ottmar Hitzfeld, winning the Champions League in 1997. After financial troubles in the early 2000s, they experienced a resurgence under Jürgen Klopp, winning consecutive Bundesliga titles and reaching the Champions League final in 2013.",
				}}
				data={data}
				loading={loading}
			/>
		</PageContainer>
	);
};

export default DortmundPage;
