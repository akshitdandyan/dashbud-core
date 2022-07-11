export const debugLog = (fn: Function, ...args: any) => {
  console.log(`[${fn.name}]`, ...args);
};
