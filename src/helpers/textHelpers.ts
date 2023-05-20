function truncateText (originalText: string, maxLength: number): string {
  let truncatedText;

  if (maxLength === 0) return "";

  if (originalText.length > maxLength) {
    truncatedText = originalText.slice(0, maxLength).trim() + "...";
    return truncatedText;
  } 

  return originalText;
}

export {
  truncateText
};
