export function cleanJsonString(value: string) {
  const cleaned = JSON.parse(
    JSON.stringify(JSON.parse(value), (key, value) => {
      if (typeof value === "string") {
        return value.replace(/"/g, "");
      }
      return value.replace;
    })
  );

  return cleaned;
}
