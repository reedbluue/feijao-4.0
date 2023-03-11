var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs/promises';
import moment from 'moment';
export class ListaService {
    static checkIfExistAndCreate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs.readFile(`public/lista-${moment().format('DD-MM-YYYY')}.json`);
            }
            catch (err) {
                yield fs.writeFile(`public/lista-${moment().format('DD-MM-YYYY')}.json`, JSON.stringify([]));
            }
        });
    }
    static getList() {
        return __awaiter(this, void 0, void 0, function* () {
            const listaParsed = JSON.parse((yield fs.readFile(`public/lista-${moment().format('DD-MM-YYYY')}.json`)).toString());
            return listaParsed;
        });
    }
    static addToList(pessoa) {
        return __awaiter(this, void 0, void 0, function* () {
            const posicao = ListaService.list.push(pessoa);
            try {
                yield fs.writeFile(`public/lista-${moment().format('DD-MM-YYYY')}.json`, '');
                yield fs.writeFile(`public/lista-${moment().format('DD-MM-YYYY')}.json`, JSON.stringify(ListaService.list));
            }
            catch (err) {
                console.log(err);
                return 0;
            }
            return posicao;
        });
    }
    static removeFromList(idTelegram) {
        return __awaiter(this, void 0, void 0, function* () {
            ListaService.list = ListaService.list.filter((pessoa) => pessoa.id != idTelegram);
            try {
                yield fs.writeFile(`public/lista-${moment().format('DD-MM-YYYY')}.json`, '');
                yield fs.writeFile(`public/lista-${moment().format('DD-MM-YYYY')}.json`, JSON.stringify(ListaService.list));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    static totalFeijoadasCariocas() {
        const qntCariocas = ListaService.list.filter((pessoa) => !pessoa.baiana).length;
        const aPedir = Math.trunc((qntCariocas / 3));
        const meia = Math.trunc((qntCariocas % 3)) >= 1 || (qntCariocas > 1 && qntCariocas < 3) ? 1 : 0;
        ;
        return [aPedir, meia];
    }
    static totalFeijoadasBaianas() {
        const qntBaianas = ListaService.list.filter((pessoa) => pessoa.baiana).length;
        const aPedir = Math.trunc((qntBaianas / 3));
        const meia = Math.trunc((qntBaianas % 3)) >= 1 || (qntBaianas > 1 && qntBaianas < 3) ? 1 : 0;
        return [aPedir, meia];
    }
    static ativarLista() {
        ListaService.listaAtiva = true;
    }
    static desativarLista() {
        ListaService.listaAtiva = false;
    }
}
ListaService.listaAtiva = false;
ListaService.list = [];
