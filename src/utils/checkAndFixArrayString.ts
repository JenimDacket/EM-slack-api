export const checkAndFixArrayString = (arrayString: string) => {
  // Regular expression to match an array formatted string without interior quotations
  const regex = /^\[[^\[\]]*\]$/;

  if (regex.test(arrayString)) {
    // Missing interior quotations, add them
    const correctedString = arrayString.replace(/\[([^\[\]]*)\]/, '[$1]');
    return correctedString;
  } else {
    // Interior quotations are present or the string is not formatted as an array
    return arrayString;
  }
};
