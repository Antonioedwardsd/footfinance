export interface FormattedStockData {
	symbol: string;
	date: string;
	closingPrice: number;
	_id?: string;
}

export interface TeamInfo {
	country: string;
	founded: string;
	league: string;
}

export interface StadiumInfo {
	name: string;
	capacity: string;
	image?: string;
}

export interface AdditionalInfo {
	description: string;
	achievements: string[];
	stadiumInfo?: StadiumInfo;
	historicalPerformance?: string;
	customContent?: React.ReactNode;
	logo?: string;
}

export interface TeamPageProps {
	symbol: string;
	teamName: string;
	teamInfo: TeamInfo;
	additionalInfo?: AdditionalInfo;
	data: FormattedStockData[];
	loading: boolean;
}
