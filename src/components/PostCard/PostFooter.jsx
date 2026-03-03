import React, { useState, useContext } from 'react'
import { getAvatar, getCurrentTime } from '../../lib/HelperFunctions/fn'
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { FaEllipsisH } from 'react-icons/fa';
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';
import { AuthContext } from '../context/AuthContext';


function CommentItem({ 
  comment, 
  isTop, 
  profileData, 
  editingCommentId, 
  setEditingCommentId, 
  editContent, 
  setEditContent, 
  onUpdateComment, 
  onDeleteComment 
}) {
  const isOwner = comment?.commentCreator?._id === profileData?._id;
  const isEditing = editingCommentId === comment._id;
  const [isSaving, setIsSaving] = useState(false); 

  return (
    <div className="flex gap-3">
      <img
        src={getAvatar(comment.commentCreator?.photo)}
        alt="Avatar"
        className="w-8 h-8 rounded-full object-cover mt-2 ml-2 shrink-0"
      />
      <div className="min-w-0 flex-1">
       
        <div className={`bg-white rounded-2xl rounded-tl-sm px-3 py-2 mt-3 inline-block ${isTop ? 'w-full' : ''}`}>
          <p className="text-gray-900 text-[12px] font-bold">{comment?.commentCreator?.name ?? 'Unknown'}</p>
          <p className="text-gray-500 text-[11px]">@{comment?.commentCreator?.username} · {getCurrentTime(comment.createdAt)}</p>

          {isEditing ? (
            <div className="flex items-center gap-2 mt-2">
              <input
                autoFocus 
                className="border rounded-full px-3 py-1 text-sm flex-1 outline-none"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <Button 
                size="sm" 
                color="primary" 
                radius="full"
                isLoading={isSaving} 
                onClick={async () => {
                  setIsSaving(true); 
                  await onUpdateComment(comment._id, editContent);
                  setIsSaving(false); 
                  setEditingCommentId(null);
                }}
              >
                Save
              </Button>
              <Button size="sm" variant="flat" radius="full" onClick={() => setEditingCommentId(null)}>Cancel</Button>
            </div>
          ) : (
            <p className="text-gray-800 text-[14px] mt-0.5">{comment.content}</p>
          )}
        </div>

        <div className="flex items-center gap-3 mt-1 ml-1">
          <button className="text-gray-500 text-[12px] hover:text-blue-500">Like (0)</button>
          <button className="text-gray-500 text-[12px] hover:text-blue-500">Reply</button>

          {isOwner && (
            <Dropdown>
              <DropdownTrigger>
                <button className="p-1 rounded-full text-gray-400 hover:bg-gray-200 cursor-pointer">
                  <FaEllipsisH className="w-3 h-3" />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Comment Actions">
                <DropdownItem
                  key="edit"
                  startContent={<MdOutlineEdit className="text-lg" />}
                  onClick={() => { setEditingCommentId(comment._id); setEditContent(comment.content); }}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  color="danger"
                  variant="flat"
                  startContent={<MdOutlineDelete className="text-lg" />}
                  onClick={() => onDeleteComment(comment._id)}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PostFooter({ topComment, comments, onUpdateComment, onDeleteComment }) {
  const { profileData } = useContext(AuthContext);
  const [showMoreComments, setShowMoreComments] = useState(2);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const otherComments = comments?.filter((comment) => comment?._id !== topComment?._id);

  return (
    <div className="px-4 py-3 bg-gray-50 border-gray-100 space-y-3">

      {topComment && (
        <CommentItem 
          comment={topComment}
          isTop={true} 
          profileData={profileData}
          editingCommentId={editingCommentId}
          setEditingCommentId={setEditingCommentId}
          editContent={editContent}
          setEditContent={setEditContent}
          onUpdateComment={onUpdateComment}
          onDeleteComment={onDeleteComment}
        />
      )}

      {otherComments && otherComments.slice(0, showMoreComments).map((comment) => (
        <CommentItem 
          key={comment._id} 
          comment={comment}
          isTop={false}  
          profileData={profileData}
          editingCommentId={editingCommentId}
          setEditingCommentId={setEditingCommentId}
          editContent={editContent}
          setEditContent={setEditContent}
          onUpdateComment={onUpdateComment}
          onDeleteComment={onDeleteComment}
        />
      ))}

      {otherComments.length > showMoreComments && (
        <div className="text-center mt-2">
          <Button size="sm" variant="solid" onClick={() => setShowMoreComments(showMoreComments + 2)}>
            Show More Comments
          </Button>
        </div>
      )}
    </div>
  );
}