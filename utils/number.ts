export const countDecimals = (num: number | string) => {
  if (typeof num === "string") {
    const numStr = num;
    if (numStr.includes("e")) {
      const fullNumStr = Number(num).toFixed(20).replace(/0+$/, ""); // Remove trailing zeros
      return fullNumStr.split(".")[1]?.length || 0;
    }

    return numStr.split(".")[1]?.length || 0;
  }

  if (Math.floor(num) === num) {
    return 0;
  }

  const numStr = num.toString();
  if (numStr.includes("e")) {
    const fullNumStr = num.toFixed(20).replace(/0+$/, ""); // Remove trailing zeros
    return fullNumStr.split(".")[1]?.length || 0;
  }

  return numStr.split(".")[1]?.length || 0;
};

export function countLeadingZeros(num: number) {
  const numStr = num.toString();
  const match = numStr.match(/^0\.(0+)/);

  return match ? match[1].length + 1 : 0;
}

export const safeStringify = (obj: any) => {
  return JSON.stringify(obj, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
};
