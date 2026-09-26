import CommentShow from "@/components/comments/comment-show";
import { fetchCommentsByPostId } from "@/db/queries/comments";

interface CommentListProps {
  postId: string;
}

// Lesson 111 — Don't Go Crazy With Reuse: comments are only loaded one way,
// so this component calls the query itself. It does not take a fetchData prop
// the way PostList does.
// Lesson 114 — Fetching the Big List: one call loads every comment. Top-level
// comments are the rows whose parentId is null. Replies are filtered later.
export default async function CommentList({ postId }: CommentListProps) {
  const comments = await fetchCommentsByPostId(postId);

  const topLevelComments = comments.filter((comment) => comment.parentId === null);
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        comments={comments}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
