import InvalidOrderStatusError from "../error/InvalidOrderStatusError";

export class OrderStatus {
  static CRIADO: OrderStatus = new OrderStatus("Criado"); // Pedido criado mas não associado a nenhum cliente
  static CANCELADO: OrderStatus = new OrderStatus("Cancelado"); // Cliente desistiu do pagamento
  static AGUARDANDO_PAGAMENTO: OrderStatus = new OrderStatus("Aguardando Pagamento"); // Cliente se autenticou (fez cadastro)
  static AGUARDANDO_PREPARO: OrderStatus = new OrderStatus("Aguardando Preparo"); // Cliente realizou o pagamento
  static EM_PREPARACAO: OrderStatus = new OrderStatus("Em preparação");
  static PRONTO: OrderStatus = new OrderStatus("Pronto");
  static ENTREGUE: OrderStatus = new OrderStatus("Entregue");

  private status: string;

  constructor(status: string) {
    this.status = status;
    const allStatus = [
      OrderStatus.CRIADO,
      OrderStatus.CANCELADO,
      OrderStatus.AGUARDANDO_PAGAMENTO,
      OrderStatus.AGUARDANDO_PREPARO,
      OrderStatus.EM_PREPARACAO,
      OrderStatus.PRONTO,
      OrderStatus.ENTREGUE,
    ];

    //@ts-ignore
    if (!allStatus.map((o) => (!o ? status : o.status)).includes(status)) {
      validate();
    }
  }

  getStatus(): string {
    return this.status;
  }
}

const validate = () => {
  throw new InvalidOrderStatusError();
};
