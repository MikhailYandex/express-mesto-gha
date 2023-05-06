class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.StatusCode = 401;
  }
}

module.exports = UnAuthorizedError;
