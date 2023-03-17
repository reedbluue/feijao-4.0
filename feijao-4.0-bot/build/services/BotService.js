var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import qrcode from 'qrcode-terminal';
import { Client } from 'whatsapp-web.js';
import dotenv from 'dotenv';
import { Pessoa } from '../models/Pessoa.js';
import { ListaService } from './ListaService.js';
import moment from 'moment';
dotenv.config();
const GROUPS = JSON.parse(process.env.GROUPS);
export const bot = new Client({ puppeteer: { args: ['--no-sandbox'] } });
bot.on('qr', (qr) => __awaiter(void 0, void 0, void 0, function* () {
    yield ListaService.checkIfExistAndCreate();
    ListaService.list = yield ListaService.getList();
    qrcode.generate(qr, { small: true });
}));
bot.on('ready', () => {
    console.log('Client is ready!');
});
bot.on('message_create', (message) => __awaiter(void 0, void 0, void 0, function* () {
    const chat = yield message.getChat();
    if (!GROUPS.includes(chat.name))
        return;
    if (ListaService.listaAtiva) {
        const mencoes = yield message.getMentions();
        if (!mencoes.length) {
            if (/^carioca$/i.test(message.body)) {
                const contact = yield message.getContact();
                const pessoa = new Pessoa({
                    nome: `${contact.pushname}`.trim() || contact.number,
                    baiana: false,
                    id: contact.id.user,
                });
                if (ListaService.checkIfPessoaExists(pessoa))
                    return yield message.reply(`Você já está na lista!`, undefined, {
                        quotedMessageId: message.id.id,
                    });
                yield ListaService.removeFromList(contact.id.user);
                const posicao = yield ListaService.addToList(pessoa);
                return yield message.reply(`Entrou na lista! ✅\nSua escolha foi: Feijoada Carioca!\nVocê está na posição ${posicao} da lista.`, undefined, { quotedMessageId: message.id.id });
            }
            if (/^baiana$/i.test(message.body)) {
                const contact = yield message.getContact();
                const pessoa = new Pessoa({
                    nome: `${contact.pushname}`.trim() || contact.number,
                    baiana: true,
                    id: contact.id.user,
                });
                if (ListaService.checkIfPessoaExists(pessoa))
                    return yield message.reply(`Você já está na lista!`, undefined, {
                        quotedMessageId: message.id.id,
                    });
                yield ListaService.removeFromList(contact.id.user);
                const posicao = yield ListaService.addToList(pessoa);
                return yield message.reply(`Entrou na lista! ✅\nSua escolha foi: Feijoada Baiana!\nVocê está na posição ${posicao} da lista.`, undefined, { quotedMessageId: message.id.id });
            }
            if (/^sair$/i.test(message.body)) {
                const contact = yield message.getContact();
                const pessoa = new Pessoa({
                    nome: `${contact.pushname}`.trim() || contact.number,
                    baiana: true,
                    id: contact.id.user,
                });
                if (!ListaService.checkIfPessoaExists(pessoa))
                    return yield message.reply(`Você não está na lista!`, undefined, {
                        quotedMessageId: message.id.id,
                    });
                yield ListaService.removeFromList(contact.id.user);
                yield message.reply(`Saiu da lista! ❌`, undefined, {
                    quotedMessageId: message.id.id,
                });
            }
        }
        else {
            if (/^carioca @\d+$/i.test(message.body)) {
                const contact = mencoes[0];
                const pessoa = new Pessoa({
                    nome: `${contact.pushname}`.trim() || contact.number,
                    baiana: false,
                    id: contact.id.user,
                });
                if (ListaService.checkIfPessoaExists(pessoa))
                    return yield message.reply(`${pessoa.nome} já está na lista!`, undefined, {
                        quotedMessageId: message.id.id,
                    });
                yield ListaService.removeFromList(contact.id.user);
                const posicao = yield ListaService.addToList(pessoa);
                yield message.reply(`${contact.pushname || contact.number} adicionado na lista! ✅\nA escolha foi: Feijoada Carioca!\nEstá na posição ${posicao} da lista.`, undefined, { quotedMessageId: message.id.id });
            }
            if (/^baiana @\d+$/i.test(message.body)) {
                const contact = mencoes[0];
                const pessoa = new Pessoa({
                    nome: `${contact.pushname}`.trim() || contact.number,
                    baiana: true,
                    id: contact.id.user,
                });
                if (ListaService.checkIfPessoaExists(pessoa))
                    return yield message.reply(`${pessoa.nome} já está na lista!`, undefined, {
                        quotedMessageId: message.id.id,
                    });
                yield ListaService.removeFromList(contact.id.user);
                const posicao = yield ListaService.addToList(new Pessoa({
                    nome: `${contact.pushname}`.trim() || contact.number,
                    baiana: true,
                    id: contact.id.user,
                }));
                yield message.reply(`${contact.pushname || contact.number} adicionado na lista! ✅\nA escolha foi: Feijoada Baiana!\nEstá na posição ${posicao} da lista.`, undefined, { quotedMessageId: message.id.id });
            }
            if (/^sair @\d+$/i.test(message.body)) {
                const contact = mencoes[0];
                const pessoa = new Pessoa({
                    nome: `${contact.pushname}`.trim() || contact.number,
                    baiana: true,
                    id: contact.id.user,
                });
                if (!ListaService.checkIfPessoaExists(pessoa))
                    return yield message.reply(`${pessoa.nome} não está na lista!`, undefined, {
                        quotedMessageId: message.id.id,
                    });
                yield ListaService.removeFromList(contact.id.user);
                yield message.reply(`${contact.pushname || contact.number} removido lista! ❌\n`, undefined, { quotedMessageId: message.id.id });
            }
        }
    }
    if (/^lista atual$/i.test(message.body)) {
        const fc = ListaService.totalFeijoadasCariocas();
        const fb = ListaService.totalFeijoadasBaianas();
        yield message.reply(`📋 Lista do feijão - ${moment().format('DD/MM/YYYY')}:\n
${ListaService.list
            .map((pessoa, index) => `${index + 1} - ${pessoa.nome} | ${pessoa.baiana ? 'Baiana' : 'Carioca'}`)
            .join('\n')}

Quantidade cariocas: ${fc[0]} | ${fc[1]}
Quantidade baianas: ${fb[0]} | ${fb[1]}`, undefined, { quotedMessageId: message.id.id });
    }
    if (/^iniciar lista$/i.test(message.body)) {
        ListaService.ativarLista();
        yield message.reply(`LISTA DO FEIJÃO ATIVA ✅`, undefined, {
            quotedMessageId: message.id.id,
        });
    }
    if (/^parar lista$/i.test(message.body)) {
        ListaService.desativarLista();
        yield message.reply(`LISTA DO FEIJÃO ENCERRADA ❌`, undefined, {
            quotedMessageId: message.id.id,
        });
    }
}));
