import React, { useState } from "react";
import {
  FaCamera,
  FaComment,
  FaShare,
  FaSmile,
  FaThumbsUp,
} from "react-icons/fa";
import { Link } from "react-router";
import {
  createComment,
  getAllComments,
} from "../../Services/CommentsServices";
import { FaSpinner } from "react-icons/fa6";
import { LuSendHorizontal } from "react-icons/lu";
import { AiOutlinePicture } from "react-icons/ai";
import { FaRegFaceSmile } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function PostBody({
  image,
  id,
  body,
  handlePostWithoutImage,
  setComments,
}) {
  const [IsLoading, setIsLoading] = useState(false);
  const [IsLoadingComment, setIsLoadingComment] = useState(false);

  const [commentBody, setCommentBody] = useState("");

  async function fetchAllComment(postId) {
    try {
      setIsLoading(true);
      const response = await getAllComments(postId);
      console.log(response.data.data.comments);
      setComments(response.data.data.comments);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddComment(postId) {
    // console.log(postId,commentBody);
    try {
      setIsLoadingComment(true);
      const formData = new FormData();
      formData.append("content", commentBody);
      const response = await createComment(postId, formData);
      console.log("Full response:", response.data);
      setCommentBody("");
      fetchAllComment(id);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("failed");
    } finally {
      setIsLoadingComment(false);
    }
  }

  return (
    <>
      {image && (
        <div className="px-4 pb-3">
          <p className="text-gray-900 text-[15px] whitespace-pre-line">
            {body}
          </p>
        </div>
      )}
      <Link to={`/post/${id}`}>
        {image ? (
          <img
            src={image}
            alt="post-image"
            className="w-full max-h-125 object-cover"
          />
        ) : (
          handlePostWithoutImage(image, body)
        )}
      </Link>

      
      <div className="px-13 py-2 flex items-center justify-between gap-4 text-gray-500 text-sm border-t border-gray-100">
        <span className="inline-flex items-center gap-1.5">
          <FaThumbsUp className="w-3.5 h-3.5 text-blue-500" />
          20 likes
        </span>

        <button
          onClick={() => fetchAllComment(id)}
          className="inline-flex items-center justify-center gap-1.5 cursor-pointer  hover:bg-gray-100 p-3   rounded-md  "
        >
          {IsLoading ? (
            <FaSpinner className="w-3.5 h-3.5" />
          ) : (
            <FaComment className="w-3.5 h-3.5" />
          )}
          comments
        </button>

        <span className="inline-flex items-center gap-1.5">
          <FaShare className="w-3.5 h-3.5" />3 shares
        </span>
      </div>
      {/* comments form */}
      <div className="flex items-center gap-2">
        <input
          onChange={(e) => setCommentBody(e.target.value)}
          value={commentBody}
          type="text"
          placeholder="Write your comment"
          className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none"
        />
        <button
          disabled={!commentBody}
          onClick={() => handleAddComment(id)}
          type="button"
          className="p-1.5 disabled:cursor-not-allowed text-white hover:text-white rounded-full hover:bg-[#166fe5] transition-all bg-[#1877f2] cursor-pointer "
          aria-label="Attach photo"
        >
          {IsLoadingComment ? (
            <FaSpinner className="w-3.5 h-3.5" />
          ) : (
            <LuSendHorizontal className="w-4 h-4" />
          )}
        </button>
        <button
          type="button"
          className="p-1.5 text-gray-400 hover:text-[#009966] rounded-full transition-all hover:bg-gray-200 cursor-pointer"
          aria-label="Attach photo"
        >
          <AiOutlinePicture className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="p-1.5 text-gray-400  hover:text-[#FE9A00] rounded-full transition-all hover:bg-gray-200 cursor-pointer"
          aria-label="Add emoji"
        >
          <FaRegFaceSmile className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}
