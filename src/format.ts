import { constant, flow, not, pipe, Predicate } from 'fp-ts/lib/function';
import * as A from 'fp-ts/Array';

// don't do this; use Decimal.js!
const fromNumber = (input: number): string => input.toFixed(2);

const toArray = (s: string): string[] => s.split('');

const join = (s: string[]): string => s.join('');

const getArrayOfStrings = (input: number): string[] =>
  pipe(input, fromNumber, toArray);

const isDecimalPoint: Predicate<string> = (s) => s === '.';

const insertCommas = (s: string[]): string[] =>
  pipe(s, A.reverse, A.chunksOf(3), A.intersperse([',']), A.flatten, A.reverse);
const takeInteger = A.takeLeftWhile(not(isDecimalPoint));

const takeDecimal = flow(A.dropLeftWhile(not(isDecimalPoint)), A.dropLeft(1));

const formatIntegers = (input: number): string =>
  pipe(input, getArrayOfStrings, takeInteger, insertCommas, join);

const formatDecimal = (input: number): string =>
  pipe(input, getArrayOfStrings, takeDecimal, A.takeLeft(2), join);

const invoke =
  <A, B>(input: A) =>
  (fn: (a: A) => B) =>
    fn(input);

export const formatDollars = (input: number): string =>
  pipe(
    [constant('$'), formatIntegers, constant('.'), formatDecimal],
    A.map(invoke(input)),
    join
  );
