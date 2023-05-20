import { truncateText } from "../../helpers/textHelpers";

describe("truncateText", () => {
  test("Should not truncate text when length is less than or equal to maxLength", () => {
    const originalText = "Hello, world!";
    const maxLength = 15;
    const result = truncateText(originalText, maxLength);
    expect(result).toEqual(originalText);
  });

  test("Should truncate text when length is greater than maxLength", () => {
    const originalText = "This is a long text that needs to be truncated.";
    const maxLength = 20;
    const expectedResult = "This is a long text...";
    const result = truncateText(originalText, maxLength);
    expect(result).toEqual(expectedResult);
  });

  test("Should return empty string when originalText is an empty string", () => {
    const originalText = "";
    const maxLength = 10;
    const result = truncateText(originalText, maxLength);
    expect(result).toEqual("");
  });

  test("Should return empty string when maxLength is 0", () => {
    const originalText = "Hello, world!";
    const maxLength = 0;
    const result = truncateText(originalText, maxLength);
    expect(result).toEqual("");
  });
});

