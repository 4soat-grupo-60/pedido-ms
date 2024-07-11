export interface SagaMessageModel<T> {
  id: string;
  saga: string;
  time: Date;
  payload: T
}

