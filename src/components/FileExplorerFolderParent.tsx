import React, { useState } from "react";
import type { FileExplorerType } from "../pages/FileExplorer";
import { File, Folder, LucideDelete } from "lucide-react";
import { cn } from "../../lib/utility";

export function FileExplorerFolderParent({
  data,
  handleAddFolder,
  handleAddFile,
  handleDelete,
}: {
  data: FileExplorerType;
  handleAddFolder: (id: number, title: string) => void;
  handleAddFile: (id: number, title: string) => void;
  handleDelete: (id: number) => void;
}) {
  //   console.log("🚀 ~ FileExplorerFolderParent ~ data:", data);
  const [showFiles, setShowFiles] = useState(false);
  const [newValueTitle, setNewValueTitle] = useState("");
  const [form, setForm] = useState({
    folder: false,
    file: false,
  });

  function handleExpandFolder(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setShowFiles((prev) => !prev);
  }

  function handleSaveNewValue(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (form.folder) {
      handleAddFolder(data.id, newValueTitle);
    }
    if (form.file) {
      handleAddFile(data.id, newValueTitle);
    }
    setForm({ folder: false, file: false });
  }

  function handleCancelNewValue(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setForm({ folder: false, file: false });
  }

  function handleAddFolderInput(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setForm({ folder: true, file: false });
  }
  function handleAddFileInput(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setForm({ folder: false, file: true });
  }

  return (
    <div className="ml-4 my-2">
      <div
        className={cn(
          showFiles ? "bg-black text-white" : "bg-gray-300",
          "p-2 w-[500px] ml-4 flex justify-between relative cursor-pointer hover:opacity-80"
        )}
        onClick={handleExpandFolder}
      >
        <div className="flex gap-2">
          <Folder />
          <p>{data.title}</p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 absolute right-2">
          {form.folder || form.file ? (
            <>
              <input
                onClick={(e) => e.stopPropagation()}
                placeholder={form.folder ? "Folder name" : "File name"}
                className="border px-2 w-[160px]"
                value={newValueTitle}
                onChange={(e) => setNewValueTitle(e.target.value)}
              />
              <button
                onClick={handleSaveNewValue}
                className="border px-2 cursor-pointer hover:bg-black hover:text-white"
              >
                Save
              </button>
              <button
                onClick={handleCancelNewValue}
                className="border px-2 cursor-pointer hover:bg-black hover:text-white"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleAddFolderInput}
                className="border px-2 cursor-pointer hover:bg-black hover:text-white"
              >
                Folder +
              </button>
              <button
                onClick={handleAddFileInput}
                className="border px-2 cursor-pointer hover:bg-black hover:text-white"
              >
                File +
              </button>
              {data.id !== 1 && (
                <LucideDelete
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(data.id);
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
      {/* SUB FILES */}
      {showFiles && data.files.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
          {data.files.map((file) => {
            return (
              <div key={file.id} className="ml-12 ">
                <div className="flex gap-2 items-center text-gray-600">
                  <File size={15} />
                  <p>{file.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* SUB FOLDERS */}
      {showFiles &&
        data.subfolders.length > 0 &&
        data.subfolders.map((subfolder) => {
          return (
            <FileExplorerFolderParent
              handleAddFile={handleAddFile}
              handleAddFolder={handleAddFolder}
              handleDelete={handleDelete}
              data={subfolder}
              key={subfolder.id}
            />
          );
        })}
    </div>
  );
}
