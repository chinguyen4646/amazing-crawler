import { NextApiRequest, NextApiResponse } from "next";
import handler from "./crawl";
import Crawler from "../../Crawler";

jest.mock("../../Crawler");

// Unit tests which mocks req and res but doesn't make http request to server
describe("Crawl API route handler", () => {
  let req: NextApiRequest;
  let res: Partial<NextApiResponse>;

  beforeEach(() => {
    req = {
      method: "POST",
      body: {
        url: "https://www.figfinance.io/",
      },
    } as NextApiRequest;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should return 405 status code if request method is not POST", async () => {
    req.method = "GET";

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: "Method Not Allowed" });
  });

  test("Should crawl the provided URL and return the crawl results", async () => {
    const crawlResults = [{ /* mock crawl results */ }];

    const crawlerInstance = {
      crawl: jest.fn().mockResolvedValue(crawlResults),
    } as unknown as Crawler;

    (Crawler as jest.MockedClass<typeof Crawler>).mockImplementation(() => crawlerInstance);

    await handler(req, res);

    expect(Crawler).toHaveBeenCalledTimes(1);
    expect(crawlerInstance.crawl).toHaveBeenCalledWith("https://www.figfinance.io/");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(crawlResults);
  });
});
