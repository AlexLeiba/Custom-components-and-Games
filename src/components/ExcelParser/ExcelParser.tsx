import React, { useContext, useRef, type ChangeEvent } from "react";
import { Button } from "../ui/button";
import { ToastContext } from "../../context/ToastProvider";
import { jsonDownloader } from "../../lib/jsonDownloader";
import jsonfile from "../CsvParser/json-test-file.json";
import { read, utils, writeFile } from "xlsx";

const xlsxFormat =
  "vnd.openxmlformats-officedocument.spreadsheetml.sheet" as const;
const jsonFormat = "json" as const;
function ExcelParser() {
  const inputUploadRef = useRef<HTMLInputElement>(null);
  const { triggerToast } = useContext(ToastContext);

  const [parseType, setParseType] = React.useState<"xlsxToJson" | "jsonToXlsx">(
    "xlsxToJson"
  );

  const [formData, setFormData] = React.useState<File | null>(null);
  const [jsonData, setJsonData] = React.useState<any[]>([]);

  // To parse a csv into an array of objects
  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    try {
      if (!file) {
        throw new Error("Fine wasn't uploaded yet.");
      }

      const fileFormat = file.type.split("/")[1];

      if (
        (parseType === "xlsxToJson" && fileFormat !== xlsxFormat) ||
        (parseType === "jsonToXlsx" && fileFormat !== jsonFormat)
      ) {
        throw new Error(
          `Different file format. received: ${fileFormat}, expected: ${
            parseType === "xlsxToJson" ? "xlsx" : "json"
          }`
        );
      }

      const reader = new FileReader();
      setFormData(file);
      if (parseType === "xlsxToJson") {
        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = read(data, { type: "array" });

          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          const jsonData = utils.sheet_to_json(worksheet);
          setJsonData(jsonData);
          triggerToast({ message: "File uploaded", type: "success" });
        };

        reader.readAsArrayBuffer(file);
      }
      if (parseType === "jsonToXlsx") {
        reader.onload = (e) => {
          const data = e.target?.result as string;

          const jsonData = JSON.parse(data);
          setJsonData(jsonData);
        };

        reader.readAsText(file);
        triggerToast({ message: "File uploaded", type: "success" });
      }
    } catch (error: any) {
      triggerToast({ message: error.message, type: "error", duration: 3000 });
    }
  }

  function handleRemoveValue() {
    setJsonData([]);
    setFormData(null);
  }

  function handleChangeParserType(parserType: "xlsxToJson" | "jsonToXlsx") {
    setParseType(parserType);
    handleRemoveValue();
  }

  // To download CSV file which was parsed from an Array
  function handleDownloadFile() {
    try {
      if (!formData) {
        throw new Error("File wasn't uploaded.");
      }

      const fileName = formData.name.split(".")[0];

      if (!fileName) {
        throw new Error("File wasn't uploaded.");
      }

      // XLSX TO JSON FILE
      if (parseType === "xlsxToJson") {
        const jsonParsedData = JSON.stringify(jsonData);
        const file = new File([jsonParsedData], fileName, {
          type: "application/json",
        });
        const fileUrl = URL.createObjectURL(file);

        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = `${fileName}.json`;
        link.click();

        URL.revokeObjectURL(fileUrl);
      }

      // JSON TO XLSX FILE
      if (parseType === "jsonToXlsx") {
        const worksheet = utils.json_to_sheet(jsonData); //parses json to xlsx
        const workbook = utils.book_new(); //create new workbook (file)

        utils.book_append_sheet(workbook, worksheet, "Sheet1"); //Append a worksheet to a workbook

        writeFile(workbook, `${fileName}.xlsx`); //Attempts to write or download workbook data to file
      }

      // const url = URL.createObjectURL(fileDataToDownload);
      // const link = document.createElement("a");
      // link.href = url;
      // link.download =
      //   parseType === "arrayToCsv" ? `${fileName}.csv` : `${fileName}.json`;
      // link.click();

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

  function handleUploadFile() {
    inputUploadRef.current?.click();
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-4xl">
          EXCEL parser:
          {parseType === "xlsxToJson" ? " XLSX to JSON" : " JSON to XLSX"}
        </h1>
        <div>
          <Button onClick={handleRemoveValue}>Clear uploaded file</Button>
        </div>
      </div>

      <div className="flex gap-6">
        <Button
          variant={parseType === "xlsxToJson" ? "destructive" : "outline"}
          onClick={() => handleChangeParserType("xlsxToJson")}
        >
          XLSX to JSON
        </Button>
        <Button
          variant={parseType === "jsonToXlsx" ? "destructive" : "outline"}
          onClick={() => handleChangeParserType("jsonToXlsx")}
        >
          JSON to XLSX
        </Button>
      </div>
      {/* make as drag and drop */}
      {/* CSV FILE PARSER */}
      <input
        onChange={(e) => handleUpload(e)}
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
        {parseType === "xlsxToJson" ? " XLSX file" : " JSON file"}
      </Button>

      {formData && (
        <Button onClick={handleDownloadFile} variant={"secondary"}>
          Download {parseType === "xlsxToJson" ? "  JSON file" : "XLSX file"}
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

      <Button
        size={"sm"}
        variant={"outline"}
        onClick={() => jsonDownloader(jsonfile, "my file name")}
      >
        Download test file from editor
      </Button>

      <h4 className="text-2xl">Preview uploaded data in table:</h4>
      <table className="excel-table">
        <thead>
          <tr>
            {jsonData.length > 0 &&
              Object.keys(jsonData[0]).map((key) => {
                return (
                  <th key={key} align="left">
                    {key}
                  </th>
                );
              })}
          </tr>
        </thead>

        <tbody>
          {jsonData.length > 0 &&
            jsonData.map((row) => {
              return (
                <tr key={row}>
                  {Object.values(row).map((value) => {
                    return <td key={value as string}>{value as string}</td>;
                  })}
                </tr>
              );
            })}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={3}>total items 23</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ExcelParser;
