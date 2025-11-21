export function jsonDownloader(json: object, jsonName: string) {
  const file = new File([JSON.stringify(json)], jsonName, {
    type: "application/json",
  });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${jsonName}.json`;
  link.click();

  URL.revokeObjectURL(url);
}
