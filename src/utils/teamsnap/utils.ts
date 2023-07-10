export const AGES = ["18U", "15U", "13U", "11U"];

export const cleanPositions = (positions: string): string[] => {
  const positionsMap = positions.split("/").map((position) => position.trim());

  const positionsArray = positionsMap.map((position) => {
    if (/fir|1/i.test(position)) return "firstBase";
    if (/sec|2/i.test(position)) return "secondBase";
    if (/thi|3/i.test(position)) return "thirdBase";
    if (/ss|stop|short/i.test(position)) return "shortstop";
    if (/lf|left/i.test(position)) return "outfield";
    if (/cf|center/i.test(position)) return "outfield";
    if (/rf|right/i.test(position)) return "outfield";
    if (/c|catch/i.test(position)) return "catcher";
    if (/p/i.test(position)) return "pitcher";
    if (/of|out/i.test(position)) return "outfield";
    if (/if|in/i.test(position)) return "infield";
    if (/ut/i.test(position)) return "utility";
    if (/mi/i.test(position)) return "middleInfield";
    if (/ci|corner/i.test(position)) return "cornerInfield";

    return undefined;
  });

  //   return positionsMap;
  return positionsArray.filter((position) => position !== undefined);
};
