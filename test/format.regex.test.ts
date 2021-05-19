import { formatDollarsRegex } from "../src/format.regex"


describe("formatting works", () => {
  it("works", () => {
    expect(formatDollarsRegex(1)).toBe("$1.00");
  });
  it("works for bigger numbers", () => {
    expect(formatDollarsRegex(2000)).toBe("$2,000.00");
  });
  it("works for odd cents", () => {
    expect(formatDollarsRegex(1234567.89)).toBe("$1,234,567.89")
  });
})