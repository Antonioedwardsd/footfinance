import sportingLogo from "../assets/logos/sportingLogo.png";
import juventusLogo from "../assets/logos/juventusLogo.png";
import premierLogo from "../assets/logos/premierLogo.png";
import ligaPortugalLogo from "../assets/logos/ligaPortugalLogo.png";
import serieALogo from "../assets/logos/serieALogo.png";
import bundesLogo from "../assets/logos/bundesLogo.png";
import italyFlag from "../assets/flags/italyFlag.png";
import germanyFlag from "../assets/flags/germanyFlag.png";
import englandFlag from "../assets/flags/englandFlag.png";
import portugalFlag from "../assets/flags/portugalFlag.png";

// Nombres de los equipos
export const teamNames: Record<string, string> = {
	MANU: "Manchester United",
	"SLBEN.LS": "Benfica Lisboa",
	"SCP.LS": "Sporting CP",
	"JUVE.MI": "Juventus FC",
	"BVB.DE": "Borussia Dortmund",
};

// URLs amigables para cada equipo
export const teamUrls: Record<string, string> = {
	MANU: "/manchester-united",
	"SLBEN.LS": "/benfica",
	"SCP.LS": "/sporting-cp",
	"JUVE.MI": "/juventus",
	"BVB.DE": "/borussia-dortmund",
};

// Logos de cada equipo
export const teamLogos: Record<string, string> = {
	MANU: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/800px-Manchester_United_FC_crest.svg.png",
	"SLBEN.LS":
		"https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/SL_Benfica_logo.svg/800px-SL_Benfica_logo.svg.png",
	"SCP.LS": sportingLogo,
	"JUVE.MI": juventusLogo,
	"BVB.DE":
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/800px-Borussia_Dortmund_logo.svg.png",
};

// Colores de los equipos
export const teamColors: Record<
	string,
	{ primary: string; secondary: string }
> = {
	MANU: { primary: "#DA291C", secondary: "#FFFFFF" },
	"SLBEN.LS": { primary: "#FF3021", secondary: "#FFFFFF" },
	"SCP.LS": { primary: "#006847", secondary: "#FFFFFF" },
	"JUVE.MI": { primary: "#000000", secondary: "#FFFFFF" },
	"BVB.DE": { primary: "#FDE100", secondary: "#000000" },
};

// Símbolos de los equipos
export const symbols = ["MANU", "SLBEN.LS", "SCP.LS", "JUVE.MI", "BVB.DE"];

// Mapeo entre símbolo y slug (para funciones de utilidad)
export const symbolToSlug: Record<string, string> = {
	MANU: "manchester-united",
	"SLBEN.LS": "benfica",
	"SCP.LS": "sporting-cp",
	"JUVE.MI": "juventus",
	"BVB.DE": "borussia-dortmund",
};

export const slugToSymbol: Record<string, string> = {
	"manchester-united": "MANU",
	benfica: "SLBEN.LS",
	"sporting-cp": "SCP.LS",
	juventus: "JUVE.MI",
	"borussia-dortmund": "BVB.DE",
};

export const countryFlags: Record<string, IconType> = {
	England: { type: "image", src: englandFlag },
	Portugal: { type: "image", src: portugalFlag },
	Italy: { type: "image", src: italyFlag },
	Germany: { type: "image", src: germanyFlag },
};

// Define un tipo para manejar tanto emojis como imágenes
type IconType = string | { type: "image"; src: string };

// Modificar leagueIcons para usar las imágenes
export const leagueIcons: Record<string, IconType> = {
	"Premier League": { type: "image", src: premierLogo },
	"Primeira Liga": { type: "image", src: ligaPortugalLogo },
	"Serie A": { type: "image", src: serieALogo },
	Bundesliga: { type: "image", src: bundesLogo },
	"La Liga": "🥅",
};
