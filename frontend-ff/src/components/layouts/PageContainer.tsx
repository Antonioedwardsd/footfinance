import React, { ReactNode } from "react";

interface PageContainerProps {
	children: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
	return (
		<div
			style={{
				width: "100%",
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				padding: "20px",
				backgroundColor: "#f5f8fa",
				backgroundImage: "url('/images/background.jpg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				position: "relative",
				overflow: "auto",
			}}
		>
			{/* El contenido con el mismo estilo que en Dashboard */}
			<div
				style={{
					width: "100%",
					maxWidth: "1200px",
					padding: "40px",
					backgroundColor: "rgba(255, 255, 255, 0.9)",
					borderRadius: "20px",
					boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
					backdropFilter: "blur(12px)",
					zIndex: 2,
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default PageContainer;
