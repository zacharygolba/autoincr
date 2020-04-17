import autoincr, { Sequence } from "./lib";

describe("autoincr()", () => {
  let sequence: Sequence<number>;

  beforeEach(() => {
    sequence = autoincr();
  });

  test("#next()", () => {
    expect(sequence.next()).toBe(1);
    expect(sequence.next()).toBe(2);
    expect(sequence.next()).toBe(3);
  });

  test("#reset()", () => {
    expect(sequence.next()).toBe(1);
    expect(sequence.next()).toBe(2);

    sequence.reset();
    expect(sequence.next()).toBe(1);
  });

  test("#@@iterator()", () => {
    // @ts-ignore
    const next = jest.spyOn(sequence.state, "next");

    for (const value of sequence) {
      expect(next).toHaveBeenCalledTimes(1);
      expect(value).toBe(1);
      break;
    }
  });

  describe(".bigint()", () => {
    let sequence: Sequence<bigint>;

    beforeEach(() => {
      sequence = autoincr.bigint();
    });

    test("#next()", () => {
      expect(sequence.next()).toBe(1n);
      expect(sequence.next()).toBe(2n);
      expect(sequence.next()).toBe(3n);
    });

    test("#reset()", () => {
      expect(sequence.next()).toBe(1n);
      expect(sequence.next()).toBe(2n);

      sequence.reset();
      expect(sequence.next()).toBe(1n);
    });

    test("#@@iterator()", () => {
      // @ts-ignore
      const next = jest.spyOn(sequence.state, "next");

      for (const value of sequence) {
        expect(next).toHaveBeenCalledTimes(1);
        expect(value).toBe(1n);
        break;
      }
    });
  });
});
