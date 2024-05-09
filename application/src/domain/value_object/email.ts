import { InvalidEmailError } from "../error/InvalidEmailError";

export class Email {
  private value: string;

  constructor(email: string) {
    this.value = email;

    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!this.value.match(validRegex)) {
      validate("Esse e-mail é inválido!");
    }
  }

  getEmail(): string {
    return this.value;
  }
}

const validate = (message: string) => {
  throw new InvalidEmailError(message);
};
