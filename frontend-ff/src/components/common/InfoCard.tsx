import React from "react";

interface InfoCardProps {
	/**
	 * Título informativo de la tarjeta
	 */
	title: string;

	/**
	 * Valor o información principal a mostrar
	 */
	value: string;

	/**
	 * Icono que puede ser un emoji como string o un objeto para mostrar una imagen
	 */
	icon?: string | { type: "image"; src: string };

	/**
	 * Si es true, el valor se mostrará como un enlace externo
	 */
	isLink?: boolean;

	/**
	 * Color primario para acentos de la tarjeta (del equipo actual)
	 */
	primaryColor: string;
}

/**
 * InfoCard - Componente para mostrar información general en tarjetas
 *
 * Se usa para datos como país, liga, año de fundación, etc.
 * Soporta tanto texto normal como enlaces y diferentes tipos de iconos.
 */
const InfoCard: React.FC<InfoCardProps> = ({
	title,
	value,
	icon,
	isLink = false,
	primaryColor,
}) => (
	<div
		style={{
			backgroundColor: "white",
			padding: "20px",
			borderRadius: "15px",
			boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
			display: "flex",
			alignItems: "center",
			transition: "transform 0.2s ease, box-shadow 0.2s ease",
		}}
		onMouseOver={(e) => {
			e.currentTarget.style.transform = "translateY(-3px)";
			e.currentTarget.style.boxShadow = "0 6px 25px rgba(0,0,0,0.1)";
		}}
		onMouseOut={(e) => {
			e.currentTarget.style.transform = "translateY(0)";
			e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
		}}
	>
		{icon && (
			<div
				style={{
					width: "65px",
					height: "65px",
					borderRadius: "12px",
					backgroundColor: `${primaryColor}15`,
					color: primaryColor,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					fontSize: "36px",
					marginRight: "15px",
					flexShrink: 0,
				}}
			>
				{typeof icon === "object" && "type" in icon && icon.type === "image" ? (
					<img
						src={icon.src}
						alt={title}
						style={{
							width: "45px",
							height: "45px",
							objectFit: "contain",
						}}
					/>
				) : typeof icon === "string" ? (
					icon
				) : (
					"📊"
				)}
			</div>
		)}
		<div style={{ flex: 1 }}>
			<div style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "5px" }}>
				{title}
			</div>
			{isLink ? (
				<a
					href={`https://${value}`}
					target="_blank"
					rel="noopener noreferrer"
					style={{
						fontSize: "16px",
						color: primaryColor,
						textDecoration: "none",
						fontWeight: "500",
					}}
				>
					{value}
				</a>
			) : (
				<div style={{ fontSize: "16px", fontWeight: "500", color: "#1e293b" }}>
					{value}
				</div>
			)}
		</div>
	</div>
);

export default InfoCard;
