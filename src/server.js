import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pesananRoutes from './routes/pesananRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Skyfly Backend API is running! 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/pesanan", pesananRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
