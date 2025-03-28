import React from "react";
import { StadiumInfo } from "../team/types";

interface StadiumSectionProps {
	stadiumInfo: StadiumInfo;
	achievements: string[];
	primaryColor: string;
}

const StadiumSection: React.FC<StadiumSectionProps> = ({
	stadiumInfo,
	achievements,
	primaryColor,
}) => {
	return (
		<div style={{ marginBottom: "40px" }}>
			<h2
				style={{
					fontSize: "24px",
					color: "#2c3e50",
					marginBottom: "20px",
					paddingBottom: "10px",
					borderBottom: `2px solid ${primaryColor}30`,
				}}
			>
				Home Stadium
			</h2>
			<div
				style={{
					backgroundColor: "white",
					borderRadius: "15px",
					boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
					overflow: "hidden",
				}}
			>
				{stadiumInfo.image && (
					<div style={{ width: "100%", height: "300px", overflow: "hidden" }}>
						<img
							src={stadiumInfo.image}
							alt={`${stadiumInfo.name} Stadium`}
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
								objectPosition: "center",
							}}
						/>
					</div>
				)}
				<div style={{ padding: "25px" }}>
					<h3
						style={{
							fontSize: "24px",
							color: "#2c3e50",
							marginTop: 0,
							marginBottom: "15px",
						}}
					>
						{stadiumInfo.name}
					</h3>
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							gap: "30px",
						}}
					>
						<div style={{ flex: "1", minWidth: "300px" }}>
							<p style={{ fontSize: "16px", marginBottom: "20px" }}>
								<strong>Capacity:</strong> {stadiumInfo.capacity} spectators
							</p>

							<div style={{ marginBottom: "20px" }}>
								<h4
									style={{
										fontSize: "18px",
										color: "#2c3e50",
										marginBottom: "10px",
									}}
								>
									Home Atmosphere
								</h4>
								<div
									style={{
										width: "100%",
										height: "6px",
										backgroundColor: "#f0f0f0",
										borderRadius: "3px",
										overflow: "hidden",
									}}
								>
									<div
										style={{
											width: "85%",
											height: "100%",
											backgroundColor: primaryColor,
											borderRadius: "3px",
										}}
									></div>
								</div>
							</div>
						</div>
						<div style={{ flex: "1", minWidth: "300px" }}>
							<h4
								style={{
									fontSize: "18px",
									color: "#2c3e50",
									marginBottom: "10px",
								}}
							>
								Team Achievements
							</h4>
							<ul
								style={{
									listStyleType: "none",
									padding: 0,
									margin: 0,
								}}
							>
								{achievements.map((achievement, index) => (
									<li
										key={index}
										style={{
											marginBottom: "10px",
											padding: "10px 15px",
											backgroundColor:
												index % 2 === 0
													? `${primaryColor}10`
													: `${primaryColor}20`,
											borderRadius: "5px",
											display: "flex",
											alignItems: "center",
											gap: "10px",
										}}
									>
										<span
											style={{
												color: primaryColor,
												fontSize: "16px",
											}}
										>
											🏆
										</span>
										{achievement}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StadiumSection;
