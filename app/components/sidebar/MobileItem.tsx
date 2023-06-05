import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
    label: string;
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;  
}

const MobileItem: React.FC<MobileItemProps> = ({label, icon, href, onClick, active}) => {

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    }

    return ( 
        <Link onClick={handleClick} href={href} 
            className={clsx(`
                flex
                group
                gap-x-3
                leading-6
                text-sm
                font-semibold
                w-full
                items-center
                justify-center
                p-4
                text-gray-500
                hover:bg-gray-100
                hover:text-black
            `,
                active && 'bg-gray-100 text-black'
            )}
        >
            {icon}
        </Link>
    );
}
 
export default MobileItem;