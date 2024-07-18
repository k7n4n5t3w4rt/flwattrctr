//@flow
const simpleStylesSeed = (seedString /*: string */) /*: number */ => {
  const seedNumber /*: number */ = parseInt(
    "in-progress".split("").reduce(
      (acc /*:  string */, letter /*: string */) /*: string */ => {
        const letterCode = letter.toLowerCase().charCodeAt(0) - 97 + 1;
        return acc + letterCode.toString();
      },
      "",
    ),
  );
  return seedNumber;
};

export default simpleStylesSeed;
