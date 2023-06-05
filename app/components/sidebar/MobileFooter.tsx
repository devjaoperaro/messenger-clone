'use client';

import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
    const pathname = usePathname();

    const items = [
        {
          key: '1',
          href: '/chat',
          label: 'Chat',
          icon: <BsFillChatDotsFill size={30}/>,
          active: pathname === '/conversations'
        },
        {
          key: '2',
          href: '/users',
          label: 'Users',
          icon: <HiUsers size={30}/>,
          active: pathname === '/users'
        },
        {
          key: '3',
          href: '#',
          label: 'Sair',
          icon: <BiLogOut size={30}/>,
          onClick: () => signOut()
        }
    ];


    //verifica o tamanho do web para app
    const params = useParams();
    
    const useConversation = useMemo(() => {

        if (!params.conversationId) {
            return '';
        }

        return params.conversationId as string;
    }, [params?.conversationId]);

    const isOpen = !!params.conversationId;

    if (isOpen) {
        return null;
    }
    //

    return ( 
        <div className="
            fixed
            justify-between
            w-full
            bottom-0 
            z-40
            flex
            items-center
            bg-white
            border-t-[1px]
            lg:hidden  
        ">
            {items.map((item: any) =>(
                <MobileItem 
                    key={item.key}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    active={item.active}
                    onClick={item.onClick}
                />
            ))}
        </div>
    );
}
 
export default MobileFooter;