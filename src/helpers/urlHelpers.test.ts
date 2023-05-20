import { isValidDomain, getBaseDomain } from "./urlHelpers";

describe("isValidDomain", () => {
  test("Should return true for a valid domain", () => {
    const validDomains = [
      "subdomain.figfinance.com",
      "figfinance.co.uk",
      "figfinance.com",
      "figfinance.io",
      "www.figfinance.io",
      "https://figfinance.io",
      "http://figfinance.io/",
      "http://subdomain.figfinance.io/",
      "https://subdomain.figfinance.io/",
    ];

    for (const domain of validDomains) {
      expect(isValidDomain(domain)).toBe(true);
    }
  });

  test("Should return false for an invalid domain", () => {
    const invalidDomains = [
      "figfinance",
      "123figfinance.io",
      "figfinance-.io",
      "https://figfinance--!.io",
      "fps://figfinance.io",
      "htt://figfinance--!.io",
      "https:/figfinance.io",
      "https:figfinance.io",
      "https//figfinance.io",
    ];

    for (const domain of invalidDomains) {
      expect(isValidDomain(domain)).toBe(false);
    }
  });

  test("Should return false for an empty URL", () => {
    expect(isValidDomain("")).toBe(false);
  });

  test("Should return false for a non-trimmed URL", () => {
    expect(isValidDomain("   example.com   ")).toBe(false);
  });
});

describe("getBaseDomain", () => {
  test("Should return the base domain without path or query parameters", () => {
    const urls = [
      "https://figfinance.io/page1",
      "http://subdomain.figfinance.io/path/to/page",
      "subdomain.figfinance.io/path/to/page",
      "https://figfinance.io/?query=test",
      "https://figfinance.io#",
    ];

    const expectedBaseDomains = [
      "https://figfinance.io",
      "http://subdomain.figfinance.io",
      "https://subdomain.figfinance.io",
      "https://figfinance.io",
      "https://figfinance.io",
    ];

    for (let i = 0; i < urls.length; i++) {
      expect(getBaseDomain(urls[i])).toBe(expectedBaseDomains[i]);
    }
  });
});
