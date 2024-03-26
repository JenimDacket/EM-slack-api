export const arrsToMap = (arr1: string[], arr2: string[]): Map<string, string> => {
  console.log('arr1: ', arr1);
  console.log('arr2: ', arr2);
  const map = new Map<string, string>();
  if (arr1.length !== arr2.length) {
    throw console.error("arrs don't match");
  }
  for (let i = 0; i < arr1.length; i++) {
    map.set(arr1[i], arr2[i]);
  }

  return map;
};
