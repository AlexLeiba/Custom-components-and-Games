import React, { useContext, useRef, type ChangeEvent } from "react";
import { Button } from "../ui/button";
import { csvParser } from "../../lib/csvParser";
import { ToastContext } from "../../context/ToastProvider";
import { jsonDownloader } from "../../lib/jsonDownloader";
import jsonfile from "../../components/CsvParser/json-test-file.json";

function CsvParser() {
  const inputUploadRef = useRef<HTMLInputElement>(null);
  const { triggerToast } = useContext(ToastContext);

  const [parseType, setParseType] = React.useState<"csvToArray" | "arrayToCsv">(
    "csvToArray"
  );
  const [csvString, setCsvString] = React.useState<string>("");
  const [formData, setFormData] = React.useState<File | null>(null);
  const [jsonData, setJsonData] = React.useState<any[]>([]);

  // To parse a csv into an array of objects
  function handleUploadCsvFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    console.log("🚀 ~ handleUploadCsvFile ~ file:", file);

    try {
      if (!file) {
        throw new Error("Fine wasn't uploaded yet.");
      }

      const fileFormat = file.type.split("/")[1];

      if (
        (parseType === "csvToArray" && fileFormat !== "csv") ||
        (parseType === "arrayToCsv" && fileFormat !== "json")
      ) {
        throw new Error(
          `Different file format. received: ${fileFormat}, expected: ${
            parseType === "csvToArray" ? "csv" : "json"
          }`
        );
      }

      setFormData(file);

      // parse into string format for later to be parsed into array of objs ;
      const fileReader = new FileReader(); //read data async
      fileReader.onload = (parsedData) => {
        //returns data after was loaded
        console.log("parsedData", parsedData.target?.result);
        if (!parsedData.target?.result) {
          throw new Error("File wasn't uploaded.");
        }

        if (parseType === "csvToArray") {
          const arrayFromCsvData = csvParser({
            type: "csvToArray",
            csvString: parsedData.target?.result as string,
          });

          setJsonData(arrayFromCsvData as []);
        }
        if (parseType === "arrayToCsv") {
          const uploadResult = parsedData.target?.result as string;
          const whiteSpaceRemovedData = uploadResult.replace(/\s+/g, "");

          const csvFromJsonData = csvParser({
            type: "arrayToCsv",
            arrayData: [JSON.parse(whiteSpaceRemovedData)],
          });

          setJsonData([JSON.parse(whiteSpaceRemovedData)]);
          setCsvString(csvFromJsonData as string);
        }
        triggerToast({ message: "File uploaded", type: "success" });
      };

      fileReader.readAsText(file); //parse data to text format
    } catch (error: any) {
      triggerToast({ message: error.message, type: "error", duration: 3000 });
    }
  }

  function handleRemoveValue() {
    setJsonData([]);
    setCsvString("");
    setFormData(null);
  }

  function handleChangeParserType(parserType: "csvToArray" | "arrayToCsv") {
    setParseType(parserType);
    handleRemoveValue();
  }

  // To download CSV file which was parsed from an Array
  function handleDownloadJSONFile() {
    try {
      if (!formData) {
        throw new Error("File wasn't uploaded.");
      }

      const fileName = formData.name.split(".")[0];

      let fileDataToDownload: File | null = null;
      if (parseType === "csvToArray") {
        fileDataToDownload = new File(
          jsonData.map((item) => JSON.stringify(item).replace(/\\/g, "")),
          fileName,
          {
            type: "application/json",
          }
        );
      }
      if (parseType === "arrayToCsv") {
        fileDataToDownload = new File([csvString], fileName, {
          type: "text/csv",
        });
      }

      if (!fileDataToDownload) {
        throw new Error("File wasn't downloaded.");
      }

      const url = URL.createObjectURL(fileDataToDownload);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        parseType === "arrayToCsv" ? `${fileName}.csv` : `${fileName}.json`;
      link.click();

      triggerToast({
        message: "File downloaded",
        type: "success",
        duration: 3000,
      });
    } catch (error) {
      triggerToast({
        message: "Something went wrong, please try again.",
        type: "error",
        duration: 3000,
      });
    }
  }

  // pseudocode
  // upload csv file
  // check if the type is csv
  // if not toast error;
  //

  function handleUploadFile() {
    inputUploadRef.current?.click();
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-4xl">
          CSV parser{" "}
          {parseType === "arrayToCsv" ? "JSON to CSV" : "CSV to JSON"}
        </h1>
        <div>
          <Button onClick={handleRemoveValue}>Clear uploaded file</Button>
        </div>
      </div>

      <div className="flex gap-6">
        <Button
          variant={parseType === "csvToArray" ? "outline" : "destructive"}
          onClick={() => handleChangeParserType("arrayToCsv")}
        >
          JSON to CSV
        </Button>
        <Button
          variant={parseType === "arrayToCsv" ? "outline" : "destructive"}
          onClick={() => handleChangeParserType("csvToArray")}
        >
          CSV to JSON
        </Button>
      </div>
      {/* make as drag and drop */}
      {/* CSV FILE PARSER */}
      <input
        onChange={(e) => handleUploadCsvFile(e)}
        ref={inputUploadRef}
        className="hidden"
        type="file"
        name="upload-file"
      />
      {formData?.type && (
        <h2 className="text-2xl">
          File name: <b>{formData?.name}</b>
        </h2>
      )}

      <Button type="button" onClick={handleUploadFile}>
        Upload
        {parseType === "arrayToCsv" ? " JSON file" : " CSV file"}
      </Button>

      {formData && (
        <Button onClick={handleDownloadJSONFile}>
          Download {parseType === "arrayToCsv" ? " CSV file" : " JSON file"}
        </Button>
      )}

      {/* PREVIEW UPLOADED FILE TO ARRAY */}

      <div className="flex flex-col gap-3 mt-4">
        <h3 className="text-3xl">Preview Uploaded file content:</h3>
        {jsonData.length > 0 ? (
          <pre className="bg-gray-900 text-green-300 p-4 rounded-xl overflow-auto">
            {" "}
            <code>{JSON.stringify(jsonData, null, 4).replace(/\\/g, "")}</code>
          </pre>
        ) : (
          <p>No file uploaded</p>
        )}
      </div>

      <Button onClick={() => jsonDownloader(jsonfile, "my file name")}>
        Download JSON file
      </Button>
    </div>
  );
}

export default CsvParser;
