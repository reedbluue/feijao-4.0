interface IPessoa {
  nome: string;
  id: string;
  baiana: boolean;
}

export class Pessoa implements IPessoa {

  public nome: string;
  public id: string;
  public baiana: boolean;

  constructor(pessoa: IPessoa) {
    this.nome = pessoa.nome;
    this.id = pessoa.id;
    this.baiana = pessoa.baiana;
  }

}