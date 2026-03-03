import React, { useState, useRef } from "react";
import { getAvatar, getCurrentTime } from "../../lib/HelperFunctions/fn";
import { FaEllipsisH } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";
import {
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, Textarea,
} from "@heroui/react";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";


export default function PostHeader({ photo, name, createdAt, postId, onUpdate, onDelete, body, isOwner }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editBody, setEditBody] = useState(body || "");
  const [editImage, setEditImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputPhoto = useRef(null);

  async function handleSubmitEdit() {
    const formData = new FormData();
    formData.append("body", editBody);
    if (editImage) formData.append("image", editImage);
    setLoading(true);
    await onUpdate(postId, formData);
    setLoading(false);
    setIsOpen(false);
  }

  return (
    <div className="p-4 flex items-center gap-3">
      <img
        src={getAvatar(photo)}
        alt="Avatar"
        className="w-11 h-11 rounded-full object-cover shrink-0"
      />
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-[14px] text-gray-900">{name || "Unknown"}</h3>
        <p className="text-gray-500 text-sm">{getCurrentTime(createdAt)}</p>
      </div>

     
      {isOwner && (
        <Dropdown>
          <DropdownTrigger>
            <button
              type="button"
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              aria-label="More"
            >
              <FaEllipsisH className="w-4 h-4" />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Post Actions">
            <DropdownItem
              key="edit"
              color="default"
              variant="flat"
              startContent={<MdOutlineEdit className="text-xl" />}
              onClick={() => setIsOpen(true)}
            >
              Edit post
            </DropdownItem>
            <DropdownItem
              key="delete"
              color="danger"
              variant="flat"
              startContent={<MdOutlineDelete className="text-xl" />}
              onClick={() => onDelete(postId)}
            >
              Delete post
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Edit Post</ModalHeader>
          <ModalBody>
            <Textarea
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              minRows={editImage ? 0 : 5}
              placeholder="What's on your mind?"
            />
            {editImage && (
              <img
                src={URL.createObjectURL(editImage)}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
            <div className="flex py-2 px-1 items-center gap-4">
              <p className="text-lg font-semibold">Upload Picture</p>
              <button
                onClick={() => inputPhoto.current.click()}
                type="button"
                className="p-1.5 text-gray-400 hover:text-[#009966] rounded-full transition-all hover:bg-gray-200 cursor-pointer"
                aria-label="Attach photo"
              >
                <AiOutlinePicture className="w-6 h-6" />
                <input
                  ref={inputPhoto}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setEditImage(e.target.files[0])}
                />
              </button>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button color="primary" isLoading={loading} onClick={handleSubmitEdit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}