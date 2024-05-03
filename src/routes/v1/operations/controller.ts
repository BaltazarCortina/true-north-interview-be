import { Request, Response } from 'express';
import OperationSchema from '../../../models/operation';

export const getOperations = async (req: Request, res: Response) => {
  const operations = await OperationSchema.find().lean();

  console.log(operations);

  return res.send('Hello, World!');
};