import axios from "axios";
import { load } from "cheerio";
import url from "url";
import { isValidDomain } from "./helpers/urlHelpers";
import { pause } from "./helpers/delayHelpers";
import CrawlResult from "./interfaces/CrawlResultInterface";

export default class Crawler {
  private _visited: Set<string> = new Set();
  private static _cache: Map<string, CrawlResult[] | null> = new Map();
  private static _cacheInvalidationScheduled = false;
  public static MAX_PAGES = 500;

  constructor() {
    // Schedule cache invalidation only if it hasn't been scheduled yet
    if (!Crawler._cacheInvalidationScheduled) {
      Crawler._scheduleCacheInvalidation();
      Crawler._cacheInvalidationScheduled = true;
    }  
  }

  private static _scheduleCacheInvalidation() {
    const now = new Date();
    const nextInvalidation = new Date();

    // Set initial invalidation time to next 11pm
    nextInvalidation.setUTCHours(23, 0, 0, 0); 

    // If 11pm has passed i.e. it's 11.01 then set to 11pm tomorrow 
    if (now >= nextInvalidation) {
      nextInvalidation.setUTCDate(nextInvalidation.getUTCDate() + 1);
    }

    // Calc time diff in ms between next schedule invalidation time i.e. 11pm today or next day against time now
    const timeout = nextInvalidation.valueOf() - now.valueOf();

    setTimeout(() => {
      // Clear cache and schedule next invalidation
      Crawler._cache.clear();
      this._scheduleCacheInvalidation();
    }, timeout);
  }
  
  public async crawl(baseUrl: string): Promise<CrawlResult[]> {
    // Create empty array to store results of each page that has been crawled
    const results: CrawlResult[] = [];

    // Add a counter for the number of pages visited for this website
    const pageCounter = { count: 0 }; 

    // Invoke _crawlPage using the inputted URL as baseURL
    await this._crawlPage(baseUrl, baseUrl, results, pageCounter);

    // After first using app first time, cache baseUrl with its associated links (results) as properties
    if (!Crawler._cache.has(baseUrl)) {
      Crawler._cache.set(baseUrl, results);
    }

    return results;
  }

  private async _crawlPage(currentUrl: string, baseUrl: string, results: CrawlResult[], pageCounter: { count: number }): Promise<void> {
    // Check URL is valid 
    if (!isValidDomain(currentUrl)) {
      return;
    }

    // Check for baseUrl, if second use of app using same baseUrl we should use cache instead
    if (currentUrl === baseUrl && Crawler._cache.has(baseUrl)) {
      const cachedResult = Crawler._cache.get(baseUrl);
   
      if (cachedResult && cachedResult.length > 0) {
        results.push(...cachedResult);
      } else {
        console.log(`Could not find cache results for ${baseUrl}`);
      }

      return;
    }

    // Check URL has not been visited already (we don't want to crawl same page twice)
    if (this._visited.has(currentUrl)) {
      return;
    }

    // Check if we've reached the page limit before doing anything else
    if (pageCounter.count >= Crawler.MAX_PAGES) {
      console.log("Reached maximum page limit for this website.");
      return;
    }

    try {
      // If URL has not been visited and is a valid URl then add it to the set instance
      this._visited.add(currentUrl);

      // Increase the counter every time a page is visited
      pageCounter.count++;

      // Make HTTP request to URL and then parse the HTML returned using Cheerio
      const response = await axios.get(currentUrl);
      const html = response.data;
      const $ = load(html);

      // Variables reflect information we want from each page
      const pageTitle = $("title").text();
      const headingTags: string[] = [];
      const links: string[] = [];
      const staticAssets: string[] = [];
      let textContent = "";

      // Heading Tags
      $("h1, h2, h3, h4, h5, h6").each((index, element) => {
        headingTags.push($(element).text());
      });

      // Static Assets
      $("img, script").each((index, element) => {
        const src = $(element).attr("src");
        if (src) {
          staticAssets.push(src);
        }
      });

      // Text Content
      textContent = $("body").text();

      // Get all 'a' elements
      const linksElements = $("a").toArray();
      const promises: Promise<void>[] = [];

      if (linksElements.length > 0) {
        // Iterate over linksElements
        for (const element of linksElements) {
          let href = $(element).attr("href");
          if (href) {
            // Remove special characters from the URL
            href = href.replace(/[?#&]/g, "");
      
            // Normalise URL i.e. "https://www.figfinance.io/start/lend#" is equal to "https://www.figfinance.io/start/lend"
            href = new URL(href, currentUrl).href;

            const absoluteLink = url.resolve(currentUrl, href);

            // Remove trailing "/" if it exists
            absoluteLink.replace(/\/$/, "");

            links.push(absoluteLink);
  
            // If the link is to the same domain, crawl it too
            if (absoluteLink.startsWith(baseUrl)) {
              await pause(100); 
              promises.push(this._crawlPage(absoluteLink, baseUrl, results, pageCounter));
            }
          }
        }
  
        // Handle multiple pages at once
        await Promise.all(promises);
      }

      const result = {
        url: currentUrl,
        pageTitle,
        headingTags,
        links,
        staticAssets,
        textContent,
      };

      results.push(result);
      console.log(`${currentUrl} scrape completed...`);
      return;
    } catch (error) {
      console.log(`Error ${error}: failed to crawl: ${currentUrl}`);
    }
  }
}
