import { Operation } from "../enums/operation.enum.ts";

export interface ExpressionType {
  operand1: number;
  operand2: number;
  operator: Operation;
  result: number;
  reminder?: number;
}
