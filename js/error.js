export class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = "Server Error!";
    this.message = message;
  }
}
