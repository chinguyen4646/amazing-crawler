function pause(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export {
  pause
};