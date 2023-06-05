
'use client';

import Image from 'next/image'
import DefaultUser from '../../public/images/download.png';
import { User } from '@prisma/client';

interface AvatarProps {
    user?: User;
}

const Avatar: React.FC<AvatarProps> = ({user}) => {
    return ( 
        <div className='relative'>
            <div className="relative h-9 w-9 inline-block rounded-full overflow-hidden md:h-10 md:w-10">
                <Image src={user?.image || DefaultUser} alt='default-user' fill/>
            </div>
        </div>
    );
}
 
export default Avatar;