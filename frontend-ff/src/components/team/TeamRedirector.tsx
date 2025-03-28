import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { teamUrls } from "../../data/TeamData";

const TeamDetails = () => {
	const { symbol } = useParams<{ symbol: string }>();
	const navigate = useNavigate();

	useEffect(() => {
		if (symbol && teamUrls[symbol]) {
			navigate(teamUrls[symbol], { replace: true });
		} else {
			navigate("/", { replace: true });
		}
	}, [symbol, navigate]);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			Redirigiendo...
		</div>
	);
};

export default TeamDetails;
