const regex =
  /[\u{4e00}-\u{9fff}\u{3400}-\u{4DBF}\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}-\u{2B81F}\u{2B820}-\u{2CEAF}\u{F900}-\u{FAFF}]+/gu;

function getChineseSubstrs(str: string): string[] {
  return str.match(regex) || [];
}

function replaceWithPinyin(original: string, charMap: Map<string, string>): string {
  for (let [key, value] of charMap) {
    original = original.replace(key, value);
  }
  return original;
}

export { getChineseSubstrs, replaceWithPinyin };
