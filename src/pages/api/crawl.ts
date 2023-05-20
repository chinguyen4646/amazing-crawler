import { NextApiRequest, NextApiResponse } from "next";
import Crawler from "../../Crawler";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { url } = req.body;

  try {
    const crawler = new Crawler();
    const crawlResults = await crawler.crawl(url);

    res.status(200).json(crawlResults);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
