import React from "react";
import { AddCommentInput } from "./AddCommentInput";
import { CommentCard } from "./CommentCard";
import { NESTED_COMMENTS_DATA } from "../consts/nestedCommentsData";

export type NestedDataType = {
  id: number;
  comment: string;
  votes: number;
  createdDate: number;
  replies: NestedDataType[];
};

export function NestedComments() {
  const [data, setData] =
    React.useState<NestedDataType[]>(NESTED_COMMENTS_DATA);
  console.log("🚀 ~ NestedComments ~ data:", data);

  function insertRecorsivelyCommentReply(
    comment: string,
    commentsData: NestedDataType[],
    commentId?: number
  ): NestedDataType[] {
    return commentsData.map((commentD) => {
      if (commentD.id === commentId) {
        //the object we currently see has the id of selected Comment
        // Means add a comment under this element ID
        return {
          ...commentD,
          replies: [
            ...commentD.replies,
            {
              id: Date.now(), //add new comment here
              createdDate: Date.now(),
              comment,
              votes: 0,
              replies: [],
            },
          ],
        };
      } else if (commentD.replies.length > 0) {
        //   if The Comment Id wasnt found -> iterate through each Reply and ReCall the function with new Data
        // recursion TO update the data to Find the nested ID
        return {
          ...commentD,
          replies: insertRecorsivelyCommentReply(
            comment,
            commentD.replies, //recursion,  the DATA from replies TO map again In case the ID wasnt found
            commentId
          ),
        };
      }
      return commentD;
    });
  }

  function handleAddComment(value: string, id: number) {
    console.log("🚀 ~ handleAddComment ~ value, id:", value, id);
    if (id) {
      // Add a comment under a specific comment by id

      setData((prevComments) => {
        return insertRecorsivelyCommentReply(value, prevComments, id);
      });
    } else {
      // Add a new comment
      setData((prevComments) => {
        return [
          {
            id: Date.now(),
            comment: value,
            votes: 0,
            createdDate: Date.now(),
            replies: [],
          },
          ...prevComments,
        ];
      });
    }
  }

  function updateCommentRecursion(
    commentData: NestedDataType[],
    id: number,
    value: string
  ): NestedDataType[] {
    // Check if id was found in mapping data

    return commentData.map((commentObj) => {
      // console.log("🚀 ~ updateCommentRecursion ~ commentObj:", commentObj);
      if (commentObj.id === id) {
        console.log("first", id);
        return {
          ...commentObj,
          comment: value,
        };
      } else if (commentObj.replies.length > 0) {
        return {
          ...commentObj,
          replies: updateCommentRecursion(commentObj.replies, id, value),
        };
      }

      return commentObj;
    });
  }
  function handleEditComment(value: string, id: number) {
    console.log("COMMENT->>>>", id, value);

    setData((prevData) => {
      return updateCommentRecursion(prevData, id, value);
    });
  }

  function deletCommentRecursive(
    commentData: NestedDataType[],
    id: number
  ): NestedDataType[] {
    return commentData.filter((commentObj) => {
      if (commentObj.id === id) {
        console.log("delete", id, commentObj.comment);
        return commentObj.id !== id;
      } else if (commentObj.replies.length > 0) {
        return {
          ...commentObj,
          replies: deletCommentRecursive(commentObj.replies, id),
        };
      } else {
        return commentObj;
      }
    });
  }
  function handleDeleteComment(id: number) {
    console.log(id);

    setData((prev) => {
      return deletCommentRecursive(prev, id);
    });
  }

  function handleAddLikeRecursion(
    commentData: NestedDataType[],
    id: number,
    type: "like " | "dislike"
  ): NestedDataType[] {
    return commentData.map((commentObj) => {
      if (commentObj.id === id) {
        return {
          ...commentObj,
          votes: type === "like " ? commentObj.votes + 1 : commentObj.votes - 1, // type === 'like ' commentObj.votes + 1,
        };
      } else if (commentObj.replies.length > 0) {
        return {
          ...commentObj,
          replies: handleAddLikeRecursion(commentObj.replies, id, "like "),
        };
      }
      return commentObj;
    });
  }
  function handleLikeComment(id: number) {
    console.log(id);

    setData((prev) => {
      return handleAddLikeRecursion(prev, id, "like ");
    });
  }

  function handleDislikeComment(id: number) {
    console.log(id);

    setData((prev) => {
      return handleAddLikeRecursion(prev, id, "dislike");
    });
  }
  return (
    <div className="p-2">
      <h2 className="text-2xl">Nested comment system</h2>
      <AddCommentInput handleAddComment={handleAddComment} dataId={0} />

      {/* First comment here */}
      <div className="flex flex-col gap-4">
        {data.map((comment) => {
          return (
            <CommentCard
              key={comment.id}
              data={comment}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
              onLike={handleLikeComment}
              onDislike={handleDislikeComment}
              addCommentReply={handleAddComment}
            />
          );
        })}
      </div>
    </div>
  );
}
