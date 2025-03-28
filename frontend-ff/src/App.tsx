import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/team/Dashboard";
import ComparisonPage from "./pages/ComparisonPage";
import ManUnitedPage from "./pages/teams/ManUnitedPage";
import BenficaPage from "./pages/teams/BenficaPage";
import SportingPage from "./pages/teams/SportingPage";
import JuventusPage from "./pages/teams/JuventusPage";
import DortmundPage from "./pages/teams/DortmundPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/compare" element={<ComparisonPage />} />
				<Route path="/manchester-united" element={<ManUnitedPage />} />
				<Route path="/benfica" element={<BenficaPage />} />
				<Route path="/sporting-cp" element={<SportingPage />} />
				<Route path="/juventus" element={<JuventusPage />} />
				<Route path="/borussia-dortmund" element={<DortmundPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
