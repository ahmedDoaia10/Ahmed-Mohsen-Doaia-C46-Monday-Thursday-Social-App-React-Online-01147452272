import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import { getPostById, UpdatePost, DeletePost } from '../../Services/PostServices';
import { updateComment, deleteComment } from '../../Services/CommentsServices'; 
import PostHeader from '../../components/PostCard/PostHeader';
import PostBody from '../../components/PostCard/PostBody';
import PostFooter from '../../components/PostCard/PostFooter';
import PostSkeleton from '../../components/Skeletons/PostSkeleton';
import { AuthContext } from '../../components/context/AuthContext'; 

export default function PostDetails() {
  const { profileData } = useContext(AuthContext); 
  const [post, setPost] = useState("");
  const [comments, setComments] = useState([]);
  const [topComment, setTopComment] = useState(null); 
  const { id } = useParams();

  useEffect(() => {
    async function fetchPostDetails(postId) {
      const response = await getPostById(postId);
      setPost(response.data.post);
      setTopComment(response.data.post.topComment); 
    }
    fetchPostDetails(id);
  }, [id]);

  function handlePostWithoutImage(image, post) {
    if (!image) {
      return (
        <div className="w-full h-50 bg-sky-800 text-white flex items-center justify-center">
          <p className="text-3xl capitalize">{post}</p>
        </div>
      );
    }
  }

  
  async function handleUpdateComment(commentId, content) {
    try {
      const formData = new FormData();
      formData.append("content", content);
      await updateComment(post._id, commentId, formData);

      const updatedAt = new Date().toISOString();

      setTopComment((prev) =>
        prev?._id === commentId ? { ...prev, content, createdAt: updatedAt } : prev
      );
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? { ...c, content, createdAt: updatedAt } : c
        )
      );
    } catch (error) {
      console.error("Update comment error:", error.response?.data || error);
    }
  }

  
  async function handleDeleteComment(commentId) {
    try {
      await deleteComment(post._id, commentId);
      setTopComment((prev) => (prev?._id === commentId ? null : prev));
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      console.error("Delete comment error:", error.response?.data || error);
    }
  }

  return (
    <>
      {post ? (
        <article className="bg-white rounded-lg shadow border w-full border-gray-200 overflow-hidden">
          <PostHeader
            name={post.user?.name}
            photo={post.user?.photo}
            createdAt={post.createdAt}
            isOwner={post.user?._id === profileData?._id} 
          />

          <PostBody
            setComments={setComments}
            image={post.image}
            body={post.body}
            id={post._id} 
            handlePostWithoutImage={handlePostWithoutImage}
          />

          <PostFooter
            comments={comments}
            topComment={topComment} 
            onUpdateComment={handleUpdateComment} 
            onDeleteComment={handleDeleteComment} 
          />
        </article>
      ) : (
        <PostSkeleton />
      )}
    </>
  );
}