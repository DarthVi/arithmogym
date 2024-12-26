import { Operation } from "./enums/operation.enum.ts";
import { Difficulty } from "./enums/difficulty.enum.ts";
import { Expression } from "./types/expression.type.ts";

const operationMap: Map<Operation, (a: number, b: number) => number> = new Map([
  [Operation.ADD, (a, b) => a + b],
  [Operation.SUB, (a, b) => a - b],
  [Operation.MUL, (a, b) => a * b],
  [Operation.DIV, (a, b) => a / b],
]);

const operatorArray: Operation[] = [
  Operation.ADD,
  Operation.SUB,
  Operation.MUL,
  Operation.DIV,
];

function getRandomInt(min: number, max: number): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function* expressionGenerator(
  operation: Operation,
  difficultyLevel: Difficulty,
  isFloatingPoint: boolean,
) {
  let operator = operation;
  if (operator === Operation.RANDOM) {
    operator = operatorArray[getRandomInt(0, operator.length)];
  }

  const getRandomNum = isFloatingPoint ? getRandomFloat : getRandomInt;

  let max: number = 0;

  switch (difficultyLevel) {
    case Difficulty.EASY:
      max = 9;
      break;
    case Difficulty.MEDIUM:
      max = 99;
      break;
    case Difficulty.HARD:
      max = 999;
      break;
  }

  //avoid trivial expressions and division by 0 by starting from 2
  const operand1 = getRandomNum(2, max + 1);
  const operand2 = getRandomNum(2, max + 1);

  const result = operationMap.get(operator)!(operand1, operand2);
  let reminder: number | undefined = undefined;

  if (operator === Operation.DIV) reminder = operand1 % operand2;

  yield {
    operand1: operand1,
    operand2: operand2,
    operator: operator,
    result: result,
    reminder: reminder,
  } as Expression;
}

export default expressionGenerator;
