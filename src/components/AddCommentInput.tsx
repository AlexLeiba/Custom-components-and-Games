import React from "react";

type Props = {
  //   handleChange: (value: string) => void;
  handleAddComment: (value: string, id: number) => void;
  dataId: number;
};
export function AddCommentInput({ handleAddComment, dataId = 0 }: Props) {
  const [value, setValue] = React.useState("");
  return (
    <div className="flex justify-between w-1/2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a comment"
        className="border w-full"
      />
      <button
        onClick={() => handleAddComment(value, dataId)}
        className="border bg-blue-500 text-white cursor-pointer"
      >
        Add Comment
      </button>
    </div>
  );
}
