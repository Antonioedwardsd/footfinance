import { Schema, model } from "mongoose";

interface IStock {
	symbol: string;
	date: Date;
	closingPrice: number;
}

const StockSchema = new Schema<IStock>({
	symbol: { type: String, required: true, index: true },
	date: { type: Date, required: true, index: true },
	closingPrice: { type: Number, required: true },
});

StockSchema.index({ symbol: 1, date: -1 }, { unique: true });

const Stock = model<IStock>("Stock", StockSchema);

export default Stock;
