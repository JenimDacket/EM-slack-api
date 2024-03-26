export const repl = (s: string, m: Map<string, string>): string => {
  console.time('check');
  m.forEach((value, key) => {
    s = s.replace(new RegExp(key, 'g'), value);
  });
  console.timeEnd('check');
  return s;
};
