import { InvalidNameError } from "../error/InvalidNameError";

export class Name {
  private value: string;

  constructor(name: string) {
    if (!name) {
      validate("O campo nome é obrigatório");
    }

    if (name.length < 3) {
      validate("O nome deve ter no mínimo 3 caracteres");
    }

    this.value = name;
  }

  getName(): string {
    return this.value;
  }
}

const validate = (message: string) => {
  throw new InvalidNameError(message);
};
