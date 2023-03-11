var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from 'dotenv';
import express from 'express';
import { bot } from './services/BotService.js';
import { ListaService } from './services/ListaService.js';
import cors from 'cors';
dotenv.config();
const PORT = process.env.PORT || 3000;
bot.initialize();
const app = express();
app.use(express.json(), cors({ origin: '*' }));
app.get('/lista', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield ListaService.getList());
}));
app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
