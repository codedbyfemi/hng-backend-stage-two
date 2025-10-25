import { Request, Response, NextFunction } from 'express';

// Add BigInt serialization support to JSON
(BigInt.prototype as any).toJSON = function() {
  return this.toString();
};

export const jsonSerializer = (req: Request, res: Response, next: NextFunction) => {
  next();
};