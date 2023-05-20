function isValidDomain(url: string): boolean {
  if (!url.trim()) {
    return false;
  }

  // Prepend "https://" if url does not start with a protocol
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  try {
    const urlObject = new URL(url);
    const domain = urlObject.hostname;

    // Check if the domain has a dot, indicating a TLD
    if (!domain.includes(".")) {
      return false;
    }

    // This regex will match domain names that start and end with an alphabetic character, 
    // can contain hyphens in the middle (but not consecutively), and must end with an 
    // alphabetic character before the dot for the TLD. It should also not end with a hyphen. 
    // It also disallows domains starting with digits.
    const isValidDomain = /^[a-zA-Z]+([-]*[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})+$/g.test(domain);

    return isValidDomain;
  } catch (error) {
    return false;
  }
}

function getBaseDomain(url: string): string {
  // Prepend "https://" if url does not start with a protocol
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  const parsedUrl = new URL(url);
  const protocol = parsedUrl.protocol;
  const hostname = parsedUrl.hostname;

  return `${protocol}//${hostname}`;
}

export {
  isValidDomain,
  getBaseDomain
};
