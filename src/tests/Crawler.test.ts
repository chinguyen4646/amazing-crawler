import axios from "axios";
import Crawler from "../Crawler";

jest.mock("axios");

describe("Crawler", () => {
  let crawler1: Crawler;

  beforeEach(() => {
    crawler1 = new Crawler();
  });

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  test("Should crawl a valid URL and return crawl results, subsequent requests to same url should use cache", async () => {
    // Avoids making cross-origin request from the test environment
    const mockedResponse = {
      data: `
        <html>
          <head>
            <title>FIG - Financial Independence Group</title>
          </head>
          <body>
            <a href="/about">About</a>
            <img src="/img/logo.png">
          </body>
        </html>
      `,
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockedResponse);

    const validUrl = "https://www.figfinance.io/";
    // First crawl request
    const crawlResults1 = await crawler1.crawl(validUrl);

    expect(Array.isArray(crawlResults1)).toBe(true);
    expect(crawlResults1[0].pageTitle).toContain("FIG - Financial Independence Group");
    expect(crawlResults1[0].links[0]).toContain("/about");
    expect(crawlResults1[0].staticAssets[0]).toContain("/img/logo.png");

    // Second crawl request
    const crawlResults2 = await crawler1.crawl(validUrl);

    // Verify that the second crawl results are the same as the first (cached)
    expect(crawlResults2).toEqual(crawlResults1);
  });

  test("Should return empty array if invalid URL", async () => {
    const invalidUrl = "invalid-url";
    const crawlResults = await crawler1.crawl(invalidUrl);

    expect(Array.isArray(crawlResults)).toBe(true);
    expect(crawlResults.length).toBe(0);
  });

  test("should return empty array if URL is empty", async () => {
    const emptyUrl = "";
    const crawlResults = await crawler1.crawl(emptyUrl);

    expect(Array.isArray(crawlResults)).toBe(true);
    expect(crawlResults.length).toBe(0);
  });

  test("Should return empty array if URL has an unsupported protocol", async () => {
    const unsupportedProtocolUrl = "ftpdddadsa://example.com";
    const crawlResults = await crawler1.crawl(unsupportedProtocolUrl);
    expect(Array.isArray(crawlResults)).toBe(true);
    expect(crawlResults.length).toBe(0);
  });

  test("Should crawl other pages from the same domain but not a different domain", async () => {
    const pageWithOtherPages = {
      data: `
      <a href="https://www.samedomain.io/page1">Page 1</a>
      <a href="https://www.samedomain.io/page2">Page 2</a>
      <a href="https://www.differentdomain.com/">Different Domain</a>
    `,
    };

    const page1Content = {
      data: "This is the html content of Page 1",
    };

    const page2Content = {
      data: "This is the html content of Page 2",
    };
    
    (axios.get as jest.MockedFunction<typeof axios.get>)
      .mockResolvedValueOnce(pageWithOtherPages) // Mocks base url https://www.samedomain.io/"
      .mockResolvedValueOnce(page1Content)
      .mockResolvedValueOnce(page2Content);

    const crawlResults = await crawler1.crawl("https://www.samedomain.io/");
    expect(Array.isArray(crawlResults)).toBe(true);
    expect(crawlResults.length).toBe(3);

    // Check that the crawl result does not include the different domain.
    crawlResults.forEach(result => {
      expect(result.url).not.toContain("differentdomain.com");
    });
  });

});
