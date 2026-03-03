// import { image } from '@heroui/react'
import React from 'react'
import {
    FaBookmark,
    FaFlag,
    FaHome,
    FaStar,
    FaStore,
    FaUserFriends,
    FaUsers
} from 'react-icons/fa'
import { NavLink } from 'react-router'





const navItems = [
    {to:"/", icon:FaHome , label:"Home", iconBg:"bg-blue-200", iconColor:"text-blue-600"},
    {to:"/friends", icon:FaUserFriends , label:"Friends", iconBg:"bg-green-100", iconColor:"text-green-600"},
    {to:"/groups", icon:FaUsers , label:"Groups", iconBg:"bg-orange-100", iconColor:"text-orange-600"},
    {to:"/marketplace", icon:FaStore , label:"Marketplace", iconBg:"bg-purple-100", iconColor:"text-purple-600"},
    {to:"/saved", icon:FaBookmark , label:"Saved", iconBg:"bg-red-100", iconColor:"text-red-600"},
    {to:"/pages", icon:FaFlag , label:"Pages", iconBg:"bg-sky-100", iconColor:"text-sky-600"},
    {to:"/favorites", icon:FaStar , label:"Favorites", iconBg:"bg-yellow-100", iconColor:"text-yellow-500"},
]


const groups = [
{name: "Art & Design", image: "https://media.istockphoto.com/id/1266939032/photo/a-person-in-a-red-curved-abstract-architectural-space-3d-rendering.webp?a=1&b=1&s=612x612&w=0&k=20&c=i5AaOzaroR0-J6mK2pc41Twt4LhXva4SrjO4i7IoNOg="},
{name: "Fitness Squad", image: "https://images.unsplash.com/photo-1734668490540-e98ee11f5b4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEZpdG5lc3MlMjBTcXVhZHxlbnwwfHwwfHx8MA%3D%3D"},
{name: "Foodies United", image: "https://images.unsplash.com/photo-1696487773749-c3471eed52d1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
{name: "Gaming Zone", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},

]






export default function SideBar() {
  return (
    <>
     <aside className='w-80 mx-auto shrink-0 bg-white rounded-lg shadow-sm border border-gray-200 min-h-[calc(100vh-6rem)] py-4 px-3 flex flex-col'>
        {/* primary navigation */}
    <nav className='flex flex-col gap-0.5'>
    {navItems.map(({to , icon:Icon , label , iconBg, iconColor})=>(
        <NavLink
         key={to}
         to={to}
         end={to === "/"}
        className={({isActive})=>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 no-underline transition-colors ${isActive ? `bg-blue-100` : `hover:bg-gray-200`
            }`

         }
        >
            <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${iconBg} ${iconColor}`}
            >
                <Icon className='w-4 h-4'/>
            </span>

            <span className='font-medium text-[15px]'>{label}</span>
        </NavLink>
    ))}
    </nav>

    {/* My Group Section */}
    <div className="mt-6 pt-4 border-t border-gray-200">
    <h3 className='font-bold text-gray-800 text-[15px] px-3 mb-3 '>My Groups</h3>
    <ul className='flex flex-col gap-0.5'>
    {groups.map((group)=>(

        <li key={group.name}>
            <a
            href='#'
            className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 no-underline transition-colors hover:bg-gray-200'
            >
                <img src={group.image}
                
                alt="" 
                className='w-9 h-9 rounded-full object-cover shrink-0'
                />
                <span className='font-medium text-[15px] truncate'>{group.name}</span>
                </a>
                </li>
    ))}
    </ul>
    </div>
     </aside>
    </>
  )
}
