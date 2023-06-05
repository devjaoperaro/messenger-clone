'use client';

import clsx from "clsx";
import Link from "next/link";

interface DesktopProps {
    label: string;
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;   
}

const DesktopItem: React.FC<DesktopProps> = ({
    label,
    icon,
    href,
    onClick,
    active
}) => {

    const handleClick = () => {
        if(onClick) {
            return onClick();
        }
    }
    return ( 
        <li>
            <Link onClick={handleClick} href={href} className={clsx(`
                group
                flex
                items-center
                gap-x-3
                rounded-md
                p-3
                text-sm
                leading-6
                font-semibold
                text-gray-500
                hover:text-black
                hover:bg-gray-100
            `,
                active && 'bg-gray-100 text-[#000000]'
            )}>
                {icon}
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    );
}
 
export default DesktopItem;