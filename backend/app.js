import cookieParser from 'cookie-parser';
config();
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';


const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.use(morgan('dev'));
app.use(cookieParser());

app.get('/ping', (_req, res) => {
  res.send('Pong');
});


app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "OOPS!!! 404 Page Not Found",
  });
});


export default app;