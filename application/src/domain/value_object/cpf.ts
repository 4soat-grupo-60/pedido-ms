import { InvalidCPFError } from "../error/InvalidCPFError";

export class CPF {
  private value: string;

  constructor(cpf: string) {
    if (cpf.length < 11) {
      validate("Este CPF é inválido");
    }

    this.value = cpf;
  }

  getCPF(): string {
    return this.value;
  }
}

const validate = (message: string) => {
  throw new InvalidCPFError(message);
};
