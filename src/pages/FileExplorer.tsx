import { useState } from "react";
import { FileExplorerFolderParent } from "../components/FileExplorerFolderParent";
import { Link } from "react-router-dom";

const FILE_EXPLORER = [
  {
    id: 1,
    type: "folder", //or file
    title: "First Folder",
    files: [
      {
        id: 2,
        type: "file", //or file
        title: "Firstfile.html",
      },
      {
        id: 3,
        type: "file", //or file
        title: "SecondFile.html",
      },
    ],
    subfolders: [
      {
        id: 4,
        type: "folder", //or file
        title: "First subfolder",
        subfolders: [
          {
            id: 4,
            type: "folder", //or file
            title: "First subfolder",
            subfolders: [],
            files: [
              {
                id: 5,
                type: "file", //or file
                title: "First file subfolder",
              },
              {
                id: 6,
                type: "file", //or file
                title: "Second File subfolder",
              },
            ],
          },
        ],
        files: [
          {
            id: 5,
            type: "file", //or file
            title: "First file subfolder",
          },
          {
            id: 6,
            type: "file", //or file
            title: "Second File subfolder",
          },
        ],
      },
      {
        id: 7,
        type: "folder", //or file
        title: "First subfolder 2",
        subfolders: [
          {
            id: 4,
            type: "folder", //or file
            title: "First subfolder",
            subfolders: [],
            files: [
              {
                id: 5,
                type: "file", //or file
                title: "First file subfolder",
              },
              {
                id: 6,
                type: "file", //or file
                title: "Second File subfolder",
              },
            ],
          },
        ],
        files: [
          {
            id: 8,
            type: "file", //or file
            title: "First file subfolder 2",
          },
          {
            id: 9,
            type: "file", //or file
            title: "Second File subfolde 2r",
          },
        ],
      },
    ],
  },
];

//Will map otside of the Folder component (FileExplorerFolderParent) IN order to have local State of each Particular OBJ with useState inside of FileExplorerFolderParent

type SubfolderType = {
  id: number;
  type: string;
  title: string;
  files: {
    id: number;
    type: string;
    title: string;
  }[];
  subfolders: SubfolderType[];
};

export type FileExplorerType = {
  id: number;
  type: string;
  title: string;
  files: {
    id: number;
    type: string;
    title: string;
  }[];
  subfolders: SubfolderType[];
};

function FileExplorer() {
  const [filesData, setFilesData] = useState<FileExplorerType[]>(FILE_EXPLORER);

  function handleRecursivelyAddFileOrFolder(
    prevData: FileExplorerType[],
    selectedFolderId: number,
    title: string,
    type: "file" | "folder" | "delete"
  ): FileExplorerType[] {
    //check first level if array

    return prevData.map((folderData) => {
      //folder map

      if (folderData.id === selectedFolderId) {
        if (type === "file") {
          return {
            //ADD file

            ...folderData,
            files: [
              ...folderData.files,
              {
                //new file here
                id: Date.now(),
                title: title,
                type: "file",
              },
            ],
          };
        } else if (type === "folder") {
          return {
            //ADD Folder
            ...folderData,
            subfolders: [
              ...folderData.subfolders,
              {
                //new file here
                id: Date.now(),
                title: title,
                type: "folder",
                files: [],
                subfolders: [],
              },
            ],
          };
        }
      } else if (folderData.subfolders.length > 0) {
        //case it has other sub folders

        return {
          ...folderData,
          subfolders: handleRecursivelyAddFileOrFolder(
            folderData.subfolders,
            selectedFolderId,
            title,
            type
          ),
        };
      }
      return folderData;
    });
  }

  function handleRecursiveDeleteFolderOrFile(
    prevData: FileExplorerType[],
    selectedId: number,
    type: "file" | "folder"
  ) {
    return prevData.filter((file) => {
      if (file.id === selectedId) {
        return false;
      }
      if (file.subfolders.length > 0) {
        file.subfolders = handleRecursiveDeleteFolderOrFile(
          file.subfolders,
          selectedId,
          type
        );
      }
      return file;
    });

    // return prevData
  }

  function handleDelete(id: number) {
    setFilesData((prev) => {
      return handleRecursiveDeleteFolderOrFile(prev, id, "folder");
    });
  }

  function handleAddFile(id: number, title: string) {
    setFilesData((prev) => {
      return handleRecursivelyAddFileOrFolder(prev, id, title, "file");
    });
  }
  function handleAddFolder(id: number, title: string) {
    setFilesData((prev) => {
      return handleRecursivelyAddFileOrFolder(prev, id, title, "folder");
    });
  }
  return (
    <div className="flex flex-col gap-8">
      <Link to="/" className="text-blue-500 underline">
        Back to Home
      </Link>
      {filesData.map((data, index) => {
        return (
          <FileExplorerFolderParent
            handleAddFile={handleAddFile}
            handleAddFolder={handleAddFolder}
            handleDelete={handleDelete}
            data={data}
            key={data.id + index}
          />
        );
      })}
    </div>
  );
}

export default FileExplorer;
