import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  
  Checkbox,
  Input,
  Link,
  Textarea,
} from "@heroui/react";
import { useRef, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";

import { createPost } from "../../Services/PostServices";
import { toast } from "react-toastify";


export default function FormModal({onOpenChange , isOpen , callBack}) {
  
    const [displayedPhoto, setDisplayedPhoto] = useState("")
    const [sendPhoto, setSendPhoto] = useState("")
    const [postContent, setPostContent] = useState("")
    const [isLoading, setIsLoading] = useState(false)


const inputPhoto = useRef()


function handleUploadImage() {
    inputPhoto.current.click()
}

function handleSelectedImage() {
    
    setSendPhoto(inputPhoto.current.files[0])
    setDisplayedPhoto(URL.createObjectURL(inputPhoto.current.files[0]))

}

async function handleFetchingPost() {

    try {
        setIsLoading(true)
        const formData = new FormData();
        formData.append("body" , postContent)
       if (sendPhoto) formData.append("image", sendPhoto); 
        // console.log(formData.get("image"));
        // console.log(formData.get("body"));
        const response = await createPost(formData)
        toast.success(response.message)
        // console.log(response);
        onOpenChange()
        callBack()


    } catch (error) {
       toast.error("Failed to create post")
        console.log(error);
    }finally{
        setIsLoading(false)
    }
}
  return (
    <>
      
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={()=>{
        onOpenChange()
        setDisplayedPhoto("")
      }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Post</ModalHeader>
              <ModalBody>
                 <Textarea onChange={(e)=>setPostContent(e.target.value)}  minRows={displayedPhoto ? "0" : "50"}  placeholder='Whats On Your Mind?'  />
                 {displayedPhoto && <img src={displayedPhoto} className="w-full h-64 object-cover rounded-lg" />}
                <div className="flex py-2 px-1 items-center gap-4">
                 <p className="text-lg font-semibold">Upload Picture </p>
                 <button onClick={()=>handleUploadImage()} type="button" className="p-1.5 text-gray-400 hover:text-[#009966] rounded-full transition-all hover:bg-gray-200 cursor-pointer" aria-label="Attach photo">
                 <AiOutlinePicture  className="w-6 h-6" />
                 <Input onInput={()=>handleSelectedImage()} ref={inputPhoto} type="file" className="hidden " />
                 </button>
                </div>
              </ModalBody>
              <ModalFooter>
                
                <Button  color="primary" className="w-full" isLoading={isLoading}  onClick={()=>handleFetchingPost()}>
                  Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
