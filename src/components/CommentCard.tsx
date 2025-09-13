import React from "react";
import type { NestedDataType } from "./NestedComments";
import { AddCommentInput } from "./AddCommentInput";

export function CommentCard({
  data,
  onEdit,
  onDelete,
  onLike,
  onDislike,
  addCommentReply,
}: {
  data: NestedDataType;
  onEdit: (value: string, id: number) => void;
  onDelete: (id: number) => void;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  addCommentReply: (value: string, id: number) => void;
}) {
  const [openedReply, setOpenedReply] = React.useState(false); //will keep the state of each individual comment with its replies (component scoped is use State, so it will be saved for each comment and not for the whole component)
  //   if i opened a reply for a comment (the openedReply state will be saved for this particular comment object, so it will stay opened while you can open other comments/replies. or not)
  // SO THE USESTATE IS SCOPED ONLY FOR THIS OBJECT

  const [edit, setEdit] = React.useState(false);

  function handleEditInput() {
    setEdit(!edit);
  }

  return (
    <div className="border-l-2 p-2 flex flex-col bg-blue-200">
      <div>
        {edit ? (
          <AddCommentInput
            handleAddComment={(value, id) => {
              onEdit(value, id);
              setEdit(false);
            }}
            dataId={data.id}
          />
        ) : (
          <span className="font-bold">{data.comment}</span>
        )}
        <p>Votes:{data.votes}</p>
        <p>Created Date:{new Date(data.createdDate).toDateString()}</p>
      </div>

      <div className="flex gap-3">
        <button className="border" onClick={() => onLike(data.id)}>
          Like {data.votes}
        </button>
        <button className="border" onClick={() => onDislike(data.id)}>
          Dislike
        </button>
        <button className="border" onClick={() => setOpenedReply(!openedReply)}>
          {openedReply ? "Close Reply" : "Reply"}
          {data?.replies?.length}
        </button>
        <button className="border" onClick={handleEditInput}>
          {edit ? "Close Edit" : "Edit"}
        </button>
        <button className="border" onClick={() => onDelete(data.id)}>
          Delete
        </button>
      </div>

      {openedReply && (
        <div>
          <AddCommentInput
            handleAddComment={addCommentReply}
            dataId={data.id}
          />
          {data?.replies?.map((reply) => {
            return (
              <CommentCard
                key={reply.id}
                data={reply}
                onEdit={onEdit}
                onDelete={onDelete}
                onLike={onLike}
                onDislike={onDislike}
                addCommentReply={addCommentReply}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
