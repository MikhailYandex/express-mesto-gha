class IncorrectError extends Error {
  constructor(message) {
    super(message);
    this.StatusCode = 400;
  }
}

module.exports = IncorrectError;
