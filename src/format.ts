import { constant, flow, not, pipe, Predicate } from 'fp-ts/lib/function';
import * as A from 'fp-ts/Array';

// don't do this; use Decimal.js!
const fromNumber = (input: number): string => input.toFixed(2);

const toArray = (s: string): string[] => s.split('');

const join = (s: string[]): string => s.join('');

const splitIntoArrayOfStrings = (input: number): string[] =>
  pipe(input, fromNumber, toArray);

const isDecimalPoint: Predicate<string> = (s) => s === '.';

const insertCommas = (s: string[]): string[] =>
  pipe(s, A.reverse, A.chunksOf(3), A.intersperse([',']), A.flatten, A.reverse);

const takeIntegerPart = A.takeLeftWhile(not(isDecimalPoint));

const takeDecimalPart = flow(A.dropLeftWhile(not(isDecimalPoint)), A.dropLeft(1));

const formatIntegerPart = (input: number): string =>
  pipe(input, splitIntoArrayOfStrings, takeIntegerPart, insertCommas, join);

const formatDecimalPart = (input: number): string =>
  pipe(input, splitIntoArrayOfStrings, takeDecimalPart, A.takeLeft(2), join);

const invoke =
  <A, B>(input: A) =>
  (fn: (a: A) => B): B =>
    fn(input);

export const formatDollars = (input: number): string =>
  pipe(
    [constant('$'), formatIntegerPart, constant('.'), formatDecimalPart],
    // invoke each with our input
    A.map(invoke(input)),
    join
  );
