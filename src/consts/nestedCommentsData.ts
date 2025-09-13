import type { NestedDataType } from "../components/NestedComments";

export const NESTED_COMMENTS_DATA: NestedDataType[] = [
  {
    id: 1,
    comment: "First comment here with 2 replies",
    votes: 0,
    createdDate: 1757584530220,
    replies: [
      {
        id: 2,
        comment: "First Reply to first comment",
        votes: 0,
        createdDate: 1757584530220,
        replies: [
          {
            id: 3,
            comment: "Reply to the first Reply",
            votes: 0,
            createdDate: 1757584530220,
            replies: [],
          },
        ],
      },
      {
        id: 4,
        comment: "Second Reply to first comment",
        votes: 0,
        createdDate: 1757584530220,
        replies: [
          {
            id: 5,
            comment: "1 Reply to the second Reply",
            votes: 0,
            createdDate: 1757584530220,
            replies: [],
          },
          {
            id: 6,
            comment: "2 Reply to the second Reply",
            votes: 0,
            createdDate: 1757584530220,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 7,
    comment: "First comment here with 2 replies",
    votes: 0,
    createdDate: 1757584530220,
    replies: [
      {
        id: 8,
        comment: "First Reply to first comment",
        votes: 0,
        createdDate: 1757584530220,
        replies: [
          {
            id: 9,
            comment: "Reply to the first Reply",
            votes: 0,
            createdDate: 1757584530220,
            replies: [],
          },
        ],
      },
    ],
  },
];
