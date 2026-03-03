import React, { useState, useContext } from "react";
import PostHeader from "../PostCard/PostHeader";
import PostBody from "../PostCard/PostBody";
import PostFooter from "../PostCard/PostFooter";
import { AuthContext } from "../context/AuthContext";
import { UpdatePost, DeletePost } from "../../Services/PostServices";
import { updateComment, deleteComment } from "../../Services/CommentsServices";

export default function Post({ post }) {
  const { profileData } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [postData, setPostData] = useState(post);
  const [topComment, setTopComment] = useState(post.topComment);

  function handlePostWithoutImage(image, post) {
    if (!image) {
      return (
        <div className="w-full h-50 bg-sky-800 text-white flex items-center justify-center">
          <p className="text-3xl capitalize">{post}</p>
        </div>
      );
    }
  }

  async function handleUpdatePost(postId, formData) {
    try {
      const data = await UpdatePost(postId, formData);
      setPostData({
        ...data.data.post,
        user: postData.user,
      });
    } catch (error) {
      console.error("Update post error:", error);
    }
  }

  async function handleDeletePost(postId) {
    try {
      await DeletePost(postId);
      setIsDeleted(true);
    } catch (error) {
      console.error("Delete post error:", error);
    }
  }

  async function handleUpdateComment(commentId, content) {
    try {
      const formData = new FormData();
      formData.append("content", content);

      await updateComment(postData._id, commentId, formData);

      const updatedAt = new Date().toISOString();

      setTopComment((prev) =>
        prev?._id === commentId
          ? { ...prev, content, createdAt: updatedAt }
          : prev,
      );

      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? { ...c, content, createdAt: updatedAt } : c,
        ),
      );
    } catch (error) {
      console.error("Update comment error:", error.response?.data || error);
    }
  }

  async function handleDeleteComment(commentId) {
    try {
      await deleteComment(postData._id, commentId);

      setTopComment((prev) => (prev?._id === commentId ? null : prev));

      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      console.error("Delete comment error:", error.response?.data || error);
    }
  }
  if (isDeleted) return null; 
  return (
    <article className="bg-white rounded-lg shadow border w-full border-gray-200 overflow-hidden">
      <PostHeader
        name={postData.user?.name}
        photo={postData.user?.photo}
        createdAt={postData.createdAt}
        postId={postData._id}
        body={postData.body}
        onUpdate={handleUpdatePost}
        onDelete={handleDeletePost}
        isOwner={postData.user?._id === profileData?._id}
      />

      <PostBody
        setComments={setComments}
        image={postData.image}
        body={postData.body}
        id={postData._id}
        handlePostWithoutImage={handlePostWithoutImage}
      />

      <PostFooter
        comments={comments}
        topComment={topComment}
        onUpdateComment={handleUpdateComment}
        onDeleteComment={handleDeleteComment}
      />
    </article>
  );
}
