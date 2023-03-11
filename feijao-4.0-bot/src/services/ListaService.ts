import { Pessoa } from '../models/Pessoa.js';
import fs from 'fs/promises';
import moment from 'moment';

export abstract class ListaService {
  static listaAtiva: Boolean = false;
  static list: Pessoa[] = [];

  static async checkIfExistAndCreate() {
    try {
      await fs.readFile(`public/lista-${moment().format('DD-MM-YYYY')}.json`);
    } catch(err) {
      await fs.writeFile(`public/lista-${moment().format('DD-MM-YYYY')}.json`, JSON.stringify([]));
    }
}

  static async getList() {
      const listaParsed: Pessoa[] = JSON.parse(
        (await fs.readFile(`public/lista-${moment().format('DD-MM-YYYY')}.json`)).toString()
      );
      return listaParsed;
  }

  static async addToList(pessoa: Pessoa): Promise<number> {
    const posicao = ListaService.list.push(pessoa);

    try {
      await fs.writeFile(`public/lista-${moment().format('DD-MM-YYYY')}.json`, '');
      await fs.writeFile(`public/lista-${moment().format('DD-MM-YYYY')}.json`, JSON.stringify(ListaService.list));
    } catch (err) {
      console.log(err);
      return 0;
    }

    return posicao;
  }

  static async removeFromList(idTelegram: string) {
    ListaService.list = ListaService.list.filter(
      (pessoa: Pessoa) => pessoa.id != idTelegram
    );
    try {
      await fs.writeFile(`public/lista-${moment().format('DD-MM-YYYY')}.json`, '');
      await fs.writeFile(`public/lista-${moment().format('DD-MM-YYYY')}.json`, JSON.stringify(ListaService.list));
    } catch (err) {
      console.log(err);
    }
  }

  static totalFeijoadasCariocas() {
    const qntCariocas = ListaService.list.filter(
      (pessoa: Pessoa) => !pessoa.baiana
    ).length;
    const aPedir = Math.trunc((qntCariocas / 3));
    const meia = Math.trunc((qntCariocas % 3)) >= 1 || (qntCariocas > 1 && qntCariocas < 3) ? 1: 0;;
    return [aPedir , meia];
  }

  static totalFeijoadasBaianas() {
    const qntBaianas = ListaService.list.filter(
      (pessoa: Pessoa) => pessoa.baiana
    ).length;
    const aPedir = Math.trunc((qntBaianas / 3));
    const meia = Math.trunc((qntBaianas % 3)) >= 1 || (qntBaianas > 1 && qntBaianas < 3) ? 1: 0;
    return [aPedir , meia];
  }

  static ativarLista() {
    ListaService.listaAtiva = true;
  }

  static desativarLista() {
    ListaService.listaAtiva = false;
  }
}