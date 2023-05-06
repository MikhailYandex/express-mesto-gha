class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.StatusCode = 403;
  }
}

module.exports = ForbiddenError;
