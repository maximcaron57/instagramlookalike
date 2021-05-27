import {
  NextFunction,
  Request as ExRequest,
  Response as ExResponse,
} from 'express';
import { ValidateError } from 'tsoa';
import { CastError, Error as MongoError } from 'mongoose';
import {
  BadRequestError,
  DeserializationError,
  DuplicateEntityError,
  ExternalServiceError,
  NotFoundEntityError,
  UnauthorizedError,
  UnauthenticatedError,
} from '../types/errors';

export function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction,
): ExResponse | void {
  if (err instanceof ValidateError) {
    return res.status(400).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }

  if (err instanceof BadRequestError) {
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof UnauthorizedError || err instanceof UnauthenticatedError) {
    return res.status(401).json({ message: err.message });
  }

  if (err instanceof DeserializationError) {
    req.logout();
    if (req.session && req.session.user) {
      delete req.session.user;
    }
    return res.status(401).json({ message: err.message });
  }

  if (err instanceof NotFoundEntityError) {
    return res.status(404).send({ message: err.message });
  }

  if (err instanceof DuplicateEntityError) {
    return res.status(409).send({ message: err.message });
  }

  if (err instanceof ExternalServiceError) {
    return res.status(503).json({ message: err.message });
  }

  if (err instanceof MongoError) {
    if (err.name === 'CastError') {
      const castError = err as CastError;
      if (castError.kind === 'ObjectId') {
        return res.status(400).json({ message: 'ID is invalid' });
      }
      return res.status(400).json({
        message: 'Cast error',
        details: err.message,
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error',
      details: err.message,
    });
  }

  if (err instanceof SyntaxError) {
    return res.status(400).json({
      message: 'Syntax error',
      details: err.message,
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      details: err.message,
    });
  }

  return next();
}
