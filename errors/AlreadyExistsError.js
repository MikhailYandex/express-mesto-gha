class AlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.StatusCode = 409;
  }
}

module.exports = AlreadyExistsError;
