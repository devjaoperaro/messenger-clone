'use client'

import { usePathname } from "next/navigation";
import DesktopItem from "./DesktopItem";
import { signOut } from "next-auth/react";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";
import { User } from "@prisma/client";
import Avatar from "../Avatar";

interface DesktopSidebarProps {
    currentUser: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({currentUser}) => {

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    console.log({currentUser});

    const items = [
        {
          key: '1',
          href: '/chat',
          label: 'Chat',
          icon: <BsFillChatDotsFill size={20}/>,
          active: pathname === '/conversations'
        },
        {
          key: '2',
          href: '/users',
          label: 'Users',
          icon: <HiUsers size={20}/>,
          active: pathname === '/users'
        },
        {
          key: '3',
          href: '#',
          label: 'Sair',
          icon: <BiLogOut size={20}/>,
          onClick: () => signOut()
        }
    ];
    
    
    return ( 
        <div className="
            hidden
            lg:fixed
            inset-y-0
            lg:left-0
            lg:z-40
            lg:w-20
            xl:px-6
            lg:overflow-y-auto
            lg:bg-white
            lg:border-r-[1px]
            lg:pb-4
            lg:flex
            lg:flex-col
            justify-between
        ">
            <nav className="pt-5 flex items-center justify-center">
                <ul>
                    {items.map((item: any) =>(
                        <DesktopItem 
                            key={item.key}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            active={item.active}
                            onClick={item.onClick}
                        />
                    ))}
                </ul>
            </nav>
            <nav className="mt-4 flex flex-col justify-between items-center">
                <div onClick={() => setIsOpen(true)} className="cursor-pointer hover:opacity-75 transition">
                    <Avatar user={currentUser}/>    
                </div>
            </nav>
        </div>
    );
}
 
export default DesktopSidebar;