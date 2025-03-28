import { useState, useEffect } from "react";
import api from "../../services/api";
import TeamPage from "../../components/team/TeamPage";
import PageContainer from "../../components/layouts/PageContainer";
import manuStadium from "../../assets/stadiums/manuStadium.jpg";
import manuLogo from "../../assets/logos/manuLogo.png";

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

const ManUnitedPage = () => {
	const [data, setData] = useState<FormattedStockData[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await api.get("/MANU");
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
				symbol="MANU"
				teamName="Manchester United"
				teamInfo={{
					country: "England",
					founded: "1878",
					league: "Premier League",
				}}
				additionalInfo={{
					logo: manuLogo,
					description:
						"Manchester United Football Club is an English professional football club based in Old Trafford, Greater Manchester. The club competes in the Premier League, the top division in the English football league system.",
					achievements: [
						"20 Premier League titles",
						"3 Champions League trophies",
						"12 FA Cup wins",
						"5 League Cup wins",
					],
					stadiumInfo: {
						name: "Old Trafford",
						capacity: "74,140",
						image: manuStadium,
					},
					historicalPerformance:
						"Manchester United has been one of the most successful clubs in English football history. Under the management of Sir Alex Ferguson from 1986 to 2013, the club won 38 major trophies, including 13 Premier League titles and 2 Champions League trophies. After Ferguson's retirement, the club experienced a period of transition with several managers, but remains one of the most valuable and globally recognized football brands.",
				}}
				data={data}
				loading={loading}
			/>
		</PageContainer>
	);
};

export default ManUnitedPage;
