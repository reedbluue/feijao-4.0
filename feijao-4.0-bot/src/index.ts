import dotenv from 'dotenv';
import express from 'express';
import { bot } from './services/BotService.js';
import { ListaService } from './services/ListaService.js';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3000;

bot.initialize();

const app = express();

  app.use(express.json(), cors({origin: '*'}));

app.get('/lista', async (_req, res) => {
  res.json(await ListaService.getList());
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));