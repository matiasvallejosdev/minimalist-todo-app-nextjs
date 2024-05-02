import StoreProvider from '@/src/context/StoreProvider';

import Sidebar from '../../src/layouts/Sidebar';
import HeaderResponsiveNavbar from '@/src/layouts/HeaderResponsiveNavbar';

import { Toaster } from 'sonner';

export default function TasksLayout({ children }) {
  return (
    <>
      <StoreProvider>
        <main className="h-screen relative">
          <div className="flex items-center p-3 justify-between sm:hidden h-12 w-full bg-gray-100 dark:bg-slate-800">
            <HeaderResponsiveNavbar />
          </div>
          <div className="flex h-screen">
            <div className="bg-gray-100 dark:bg-slate-800">
              <Sidebar />
            </div>
            <div className="w-full flex-1 px-6 py-3 lg:px-12 lg:py-6">
              <div className="w-full md:max-w-2xl">{children}</div>
            </div>
          </div>
        </main>
      </StoreProvider>
      <Toaster richColors />
    </>
  );
}
