export default class InvalidOrderStatusError extends Error {
  constructor() {
    super("Invalid order Status");
  }
}