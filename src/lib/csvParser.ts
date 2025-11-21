type Props<T> =
  | {
      type: "csvToArray";
      csvString: string | undefined;
      arrayData?: never;
    }
  | {
      type: "arrayToCsv";
      arrayData: any[] | undefined;
      csvString?: never;
    };

export function csvParser<T>({
  type,
  arrayData = [],
  csvString = "",
}: Props<T>) {
  switch (type) {
    // ARRAY TO CSV
    case "arrayToCsv":
      console.log("🚀 ~ csvParser ~ arrayData:", arrayData);
      if (!arrayData) return "";
      const csvHeaders = Object.keys(arrayData[0]);
      const csvResult = [];

      const headers = csvHeaders.map((header) => {
        return `${header}`;
      });
      csvResult.push(headers.join(",")); //'"name", "age", "country"'

      arrayData.forEach((obj) => {
        const result = csvHeaders.map((header) => {
          return `${obj[header]}`; //will store a collection of values
        });

        csvResult.push(result.join(",")); //'"name", "age", "country"'
      });

      return csvResult.join("\n") as string;

    case "csvToArray": {
      // CSV TO ARRAY
      if (!csvString) return [];
      let resultArrayData: any[] = [];

      const headers = csvString.split("\n")[0].split(","); //[name , age , address]
      const bodyValues = csvString.split("\n").slice(1);

      bodyValues.forEach((value) => {
        const values = value.split(",");
        let objectKeyValuePairs: { [key: string]: string } = {};

        headers.forEach((key, index) => {
          objectKeyValuePairs[key] = values[index];
        });

        resultArrayData.push(objectKeyValuePairs);
      });
      return resultArrayData;
    }
  }
}
