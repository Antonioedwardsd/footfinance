import { useState, useEffect } from "react";
import api from "../../services/api";
import TeamPage from "../../components/team/TeamPage";
import PageContainer from "../../components/layouts/PageContainer";
import benficaStadium from "../../assets/stadiums/benficaStadium.jpg";
import benficaLogo from "../../assets/logos/benficaLogo.png";

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

const BenficaPage = () => {
	const [data, setData] = useState<FormattedStockData[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await api.get("/SLBEN.LS");
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
				symbol="SLBEN.LS"
				teamName="Benfica Lisboa"
				teamInfo={{
					country: "Portugal",
					founded: "1904",
					league: "Primeira Liga",
				}}
				additionalInfo={{
					description:
						"Sport Lisboa e Benfica, commonly known as Benfica, is a professional football club based in Lisbon, Portugal. It is one of the 'Big Three' clubs in Portugal that have never been relegated from the Primeira Liga.",
					logo: benficaLogo,
					achievements: [
						"37 Primeira Liga titles",
						"2 European Cup/Champions League trophies",
						"26 Portuguese Cup wins",
						"7 Portuguese League Cup wins",
					],
					stadiumInfo: {
						name: "Estádio da Luz",
						capacity: "64,642",
						image: benficaStadium,
					},
					historicalPerformance:
						"Benfica is one of Portugal's most successful clubs and has a rich history in European football. The club enjoyed its golden era in the 1960s under coach Béla Guttmann, winning two consecutive European Cups. Benfica is known for their passionate fans and their youth academy that has produced many talented players.",
				}}
				data={data}
				loading={loading}
			/>
		</PageContainer>
	);
};

export default BenficaPage;
