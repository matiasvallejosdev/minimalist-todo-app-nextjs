import User from '../../src/components/User';
import ToggleDarkMode from '../../src/components/ToggleDarkMode';
import Navbar from './Navbar';

import { getLists } from '@/src/services/api/ListsApi';
import { getAccessTokenServer } from '@/src/services/auth/AuthServer';

export default async function Sidebar() {
  const accessToken = await getAccessTokenServer();
  const lists = await getLists(accessToken);

  return (
    <>
      <div className="hidden sm:flex md:w-15 lg:w-72 flex-col gap-6 h-full p-2 lg:px-6 lg:py-6">
        <User />
        <div className="flex flex-col justify-between h-full mt-1">
          <nav className="flex flex-col gap-1">
            <Navbar lists={lists}/>
          </nav>
          <ul className="relative py-2 flex flex-col gap-1.5">
            <div
              className="absolute top-0 left-0 w-full bg-gray-300 dark:bg-gray-500"
              style={{ height: '0.05rem' }}
            ></div>
            <li>
              <ToggleDarkMode extendedMode={true} />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
