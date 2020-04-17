interface AutoIncr {
  /**
   * Returns a sequence of auto-incrementing bigints.
   */
  bigint(): Sequence<bigint>;

  /**
   * Returns a sequence of auto-incrementing numbers.
   */
  (): Sequence<number>;
}

class Sequence<T> {
  private readonly factory!: () => Generator<T, never, void>;
  private state!: Generator<T, never, void>;

  constructor(factory: () => Generator<T, never, void>) {
    Object.defineProperty(this, "factory", {
      value: factory,
    });

    Object.defineProperty(this, "state", {
      value: factory(),
      writable: true,
    });
  }

  /**
   * Lazily iterates over each value.
   */
  *[Symbol.iterator](): IterableIterator<T> {
    yield* this.state;
  }

  /**
   * Returns the next occuring value.
   */
  next(): T {
    return this.state.next().value;
  }

  /**
   * Resets the counter's state to 1.
   */
  reset(): void {
    this.state = this.factory();
  }
}

function autoincr(): Sequence<number> {
  const ceiling = Number.MAX_SAFE_INTEGER;

  return new Sequence(function* () {
    for (let state = 1; state < ceiling; state++) yield state;
    // istanbul ignore next
    throw new RangeError(`exceeded maximum value: ${ceiling}`);
  });
}

function bigint(): Sequence<bigint> {
  return new Sequence(function* () {
    for (let state = 1n; ; state++) yield state;
  });
}

Object.defineProperty(autoincr, "bigint", {
  value: bigint,
});

export type { Sequence };
export default autoincr as AutoIncr;
