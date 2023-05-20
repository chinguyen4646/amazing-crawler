export default interface CrawlResultInterface {
  pageTitle: string;
  headingTags: string[];
  links: string[];
  staticAssets: string[];
  textContent: string;
  url: string;
};