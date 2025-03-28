import api from "../../services/api";

const SyncButton = () => {
	const syncStocks = async () => {
		try {
			await api.get("/sync");
			alert("Stocks synced successfully!");
		} catch (error) {
			console.error("Error syncing:", error);
			alert("Error syncing stocks.");
		}
	};

	return <button onClick={syncStocks}>Sync Stocks</button>;
};

export default SyncButton;
