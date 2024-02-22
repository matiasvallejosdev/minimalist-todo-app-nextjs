import User from '../components/User';
import { IconMenu2 } from '@tabler/icons-react';
import ToggleDarkMode from '../components/ToggleDarkMode';

export default function HeaderResponsiveNavbar() {
    return (
        <>
            <div>
                <IconMenu2 className="cursor-pointer" size={26} />
            </div>
            <div className="flex gap-1 items-center justify-center">
              <ToggleDarkMode />
              <User />
            </div>
        </>
    );
}
