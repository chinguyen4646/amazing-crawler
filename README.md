This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started (in development)

1. First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

2. Install deps by running `npm install` 

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running test(s)

To run the whole suite of tests run:
```
npm run test
```
To run a specific test file run:
```
npm test -- path/to/test-file.test.ts
```

## How the Crawler class works
The Crawler class is designed to recursively crawl websites and gather certain information from each page. This class leverages axios for making HTTP requests, cheerio for parsing the HTML returned, and url for URL resolution and parsing.

The Crawler class maintains two important data structures:

### Class properties
A Set called `_visited` that tracks the URLs that have been visited in a crawl operation.

A Map called `_cache` which stores the crawl results for a particular base URL, to prevent repeated crawling of the same site in a short period of time.

The class also contains a cache invalidation mechanism which is set to clear the cache at 11pm UTC every day.

### Class methods
1. `crawl(baseUrl: string)`
is the main function to use in the Crawler class is the `crawl()` function. This function takes a `baseUrl` as an argument, initiates the crawling process, and returns a promise which resolves to an array of crawl results. Each crawl result object includes the page's URL, title, heading tags, links, static assets, and text content. In the `crawl()` function, it first checks if the `baseUrl` has been crawled before by checking the cache. If the results are in the cache, it returns them directly. Otherwise, it begins to crawl the website starting from the `baseUrl`.

2. `_crawlPage(currentUrl: string, baseUrl: string, results: CrawlResult[], pageCounter: { count: number })` is the recursive function that does the actual work of visiting a page, extracting the information, and triggering visits to other linked pages on the same site. For each link found on the page, if it's within the same domain, the function recursively calls `_crawlPage()` on that link after a delay of 100 milliseconds.

    <b>This function will not visit a page if:</b>

     - The page is outside of the domain specified by baseUrl.
     - The page has already been visited.
     - The maximum number of pages `MAX_PAGES` has been reached.
     - For each page visited, it extracts the page's title, heading tags, links, static assets, and text content. 
     - Links are also normalised to remove query parameters and hash fragments, and converted to absolute URLs if they are relative.

3. `_scheduleCacheInvalidation()` is the function that is used to schedule the cache invalidation operation. It sets the cache to be cleared at 11pm UTC every day.

### Error handling
If any error occurs during the HTTP request or HTML parsing, it is logged to the console and does not interrupt the crawling of other pages.

