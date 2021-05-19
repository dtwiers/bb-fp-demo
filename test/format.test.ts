import { formatDollars } from "../src/format"


describe("formatting works", () => {
  it("works", () => {
    expect(formatDollars(1)).toBe("$1.00");
  });
  it("works for bigger numbers", () => {
    expect(formatDollars(2000)).toBe("$2,000.00");
  });
  it("works for odd cents", () => {
    expect(formatDollars(1234567.89)).toBe("$1,234,567.89")
  });
})