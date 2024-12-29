import { Operation } from "./enums/operation.enum.ts";
import { Difficulty } from "./enums/difficulty.enum.ts";
import { ExpressionType } from "./types/expression.type.ts";

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

function* expressionGenerator(
  operation: Operation,
  difficultyLevel: Difficulty,
): Generator<ExpressionType> {
  const getRandomNum = getRandomInt;
  let max: number = 0;

  switch (difficultyLevel) {
    case Difficulty.EASY:
      max = 10;
      break;
    case Difficulty.MEDIUM:
      max = 100;
      break;
    case Difficulty.HARD:
      max = 1000;
      break;
  }

  while (true) {
    let operator = operation;
    if (operation === Operation.RANDOM) {
      operator = operatorArray[getRandomInt(0, operatorArray.length)];
    }

    let operand1: number;
    let operand2: number;
    let result: number;

    //avoid trivial expressions and division by 0 by starting from 2
    if (operator === Operation.DIV) {
      operand2 = getRandomNum(2, max);
      result = getRandomNum(2, max);
      operand1 = result * operand2;
    } else {
      operand1 = getRandomNum(2, max);
      operand2 = getRandomNum(2, max);

      //if we are generating subtraction on easy difficulty, swap the variables
      //whenever the second operand is higher than the first
      if (
        operator === Operation.SUB &&
        difficultyLevel == Difficulty.EASY &&
        operand2 > operand1
      ) {
        const tmp = operand1;
        operand1 = operand2;
        operand2 = tmp;
      }

      result = operationMap.get(operator)!(operand1, operand2);
    }

    yield {
      operand1: operand1,
      operand2: operand2,
      operator: operator,
      result: result,
    } as ExpressionType;
  }
}

export default expressionGenerator;
