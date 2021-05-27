// eslint-disable-next-line max-classes-per-file
export class DuplicateEntityError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundEntityError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ExternalServiceError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class UnauthenticatedError extends Error {
  constructor() {
    super('Cannot perform this action signed off');
    this.name = this.constructor.name;
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super("The signed in user isn't authorized to perform this action");
    this.name = this.constructor.name;
  }
}

export class DeserializationError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = this.constructor.name;
  }
}
