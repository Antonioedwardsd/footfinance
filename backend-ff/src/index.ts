import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI as string;

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((err) => {
		console.error("MongoDB connection failed:", err);
		process.exit(1);
	});
