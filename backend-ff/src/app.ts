import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import stockRoutes from "./routes/stockRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Ruta principal de prueba
app.get("/", (req, res) => {
	res.json({ message: "Red Pine Backend running 🚀" });
});

// Aquí conectas las rutas que creaste
app.use("/api/stocks", stockRoutes);

export default app;
