import { useState, useRef, useEffect } from "react";

interface TeamSelectorProps {
	symbols: string[];
	selectedSymbol: string;
	onSelect: (symbol: string) => void;
	teamNames?: Record<string, string>;
	teamLogos?: Record<string, string>;
	id?: string;
}

const TeamSelector = ({
	symbols,
	selectedSymbol,
	onSelect,
	teamNames = {},
	teamLogos = {},
	id,
}: TeamSelectorProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Cerrar el dropdown al hacer clic fuera
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div
			ref={dropdownRef}
			id={id}
			style={{
				position: "relative",
				width: "300px",
				userSelect: "none",
			}}
		>
			{/* Selector cerrado (mostrar opción seleccionada) */}
			<div
				onClick={() => setIsOpen(!isOpen)}
				style={{
					padding: "10px 15px",
					borderRadius: "5px",
					border: "1px solid #ddd",
					color: "#333",
					backgroundColor: "white",
					fontSize: "16px",
					display: "flex",
					alignItems: "center",
					cursor: "pointer",
					boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
				}}
			>
				{teamLogos[selectedSymbol] && (
					<img
						src={teamLogos[selectedSymbol]}
						alt={teamNames[selectedSymbol] || selectedSymbol}
						style={{
							height: "24px",
							width: "24px",
							marginRight: "10px",
							objectFit: "contain",
						}}
					/>
				)}
				<span style={{ flex: 1 }}>
					{teamNames[selectedSymbol]
						? `${teamNames[selectedSymbol]} (${selectedSymbol})`
						: selectedSymbol}
				</span>
				<span style={{ marginLeft: "10px" }}>▼</span>
			</div>

			{/* Dropdown con opciones */}
			{isOpen && (
				<div
					style={{
						position: "absolute",
						top: "100%",
						left: 0,
						right: 0,
						backgroundColor: "white",
						borderRadius: "5px",
						border: "1px solid #ddd",
						marginTop: "5px",
						zIndex: 1000,
						maxHeight: "300px",
						overflowY: "auto",
						boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
						backdropFilter: "none",
					}}
				>
					{symbols.map((symbol) => (
						<div
							key={symbol}
							onClick={() => {
								onSelect(symbol);
								setIsOpen(false);
							}}
							style={{
								padding: "10px 15px",
								display: "flex",
								alignItems: "center",
								cursor: "pointer",
								backgroundColor:
									symbol === selectedSymbol ? "#f5f5f5" : "white",
								borderBottom: "1px solid #f0f0f0",
								transition: "background-color 0.2s ease",
								color: "#333",
								opacity: 1,
							}}
							onMouseOver={(e) => {
								e.currentTarget.style.backgroundColor = "#f9f9f9";
							}}
							onMouseOut={(e) => {
								e.currentTarget.style.backgroundColor =
									symbol === selectedSymbol ? "#f5f5f5" : "white";
							}}
						>
							{teamLogos[symbol] && (
								<img
									src={teamLogos[symbol]}
									alt={teamNames[symbol] || symbol}
									style={{
										height: "24px",
										width: "24px",
										marginRight: "10px",
										objectFit: "contain",
									}}
								/>
							)}
							<span>
								{teamNames[symbol]
									? `${teamNames[symbol]} (${symbol})`
									: symbol}
							</span>
						</div>
					))}
				</div>
			)}

			{/* Input oculto para mantener compatibilidad con formularios */}
			<input type="hidden" name={id} value={selectedSymbol} />
		</div>
	);
};

export default TeamSelector;
