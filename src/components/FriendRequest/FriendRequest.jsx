import React, { useState } from 'react'
import { FaEllipsisH } from 'react-icons/fa'
import { IoSearch } from "react-icons/io5";

const friendRequests = [
  {
    id: 1,
    name: 'Sara Ahmed',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    time: '6d',
  },
]

const contacts = [
  { id: 1, name: 'Khalid Mohammed', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', online: true },
  { id: 2, name: 'Omar Hassan', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face', online: true },
  { id: 3, name: 'Mariam Ali', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', online: false },
  { id: 4, name: 'Lina Ibrahim', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face', online: true },
  { id: 5, name: 'Wael Karim', avatar: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=80&h=80&fit=crop', online: true },
  { id: 6, name: 'Ali Mahmoud', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face', online: false },
]

export default function FriendReq() {
  const [search, setSearch] = useState('')

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <aside className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-[calc(100vh-6rem)] w-80 mx-auto flex flex-col max-h-[calc(100vh-6rem)]">

      {/* Friend Requests Section */}
      <section className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-700 text-[15px]">Friend requests</h2>
          <a href="#" className="text-blue-600 text-[13px] font-medium hover:underline">
            See All
          </a>
        </div>

        <ul className="space-y-3">
          {friendRequests.map((req) => (
            <li key={req.id} className="flex gap-3">
              <img
                src={req.avatar}
                alt={req.name}
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className=" text-gray-800 font-medium text-[15px] truncate ">{req.name}</p>
                <p className="text-gray-500 text-[12px] shrink-0">{req.time} ago</p>
                <div className="flex gap-2 mt-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-medium py-1 rounded-md transition-colors cursor-pointer">
                    Confirm
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-[12px] font-medium py-1 rounded-md transition-colors cursor-pointer">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Contacts Section */}
      <section className="p-4 flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold  text-gray-700  text-[15px]">Contacts</h2>
          <div className="flex items-center gap-2">
            <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
              <IoSearch className="w-4 h-4 cursor-pointer " />
            </button>
             <button type="button" className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 cursor-pointer" aria-label="More">
                      <FaEllipsisH className="w-4 h-4  " />
                    </button>
          </div>
        </div>

        <ul className="space-y-1 overflow-y-auto flex-1">
          {filteredContacts.map((contact) => (
            <li
              key={contact.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
            >
              <div className="relative shrink-0">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                {contact.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <span className="text-gray-800 font-medium text-[15px] truncate">{contact.name}</span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}