import { Card, Input, Skeleton, useDisclosure } from '@heroui/react'
import React, { useContext } from 'react'
import { DEFAULT_AVATAR } from '../../lib/HelperFunctions/fn'
import FormModal from './FormModal'
import { AuthContext } from '../context/AuthContext';

export default function CreatePost({fetchAllPost}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    let { profileData} = useContext(AuthContext)
  return (
    <>
      <Card className='p-6 space-y-5'>
        <h3 className='font-extrabold text-[16px] text-gray-900'>{profileData?.name}</h3>
        <div className="flex items-center gap-5 ">
          {profileData?.photo?   <img src={profileData?.photo} alt="user-image" className='w-15 h-15 rounded-full shrink-0' /> : <Skeleton className="w-15 h-15 rounded-full shrink-0" />}
      
        <Input onClick={onOpen} isReadOnly type='text' placeholder='Whats On Your Mind?'/>
        </div>
      </Card> 
      <FormModal  callBack={fetchAllPost} isOpen={isOpen}  onOpenChange={onOpenChange} />
    </>
  )
}
