import { Operation } from '../models/operation';
import { Record } from '../models/record';

export interface PopulatedRecord extends Omit<Record, 'operationId'> {
  operationId: Operation;
}
