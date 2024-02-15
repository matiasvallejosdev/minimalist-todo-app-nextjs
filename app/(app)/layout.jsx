import Sidebar from "../../src/layouts/Sidebar";
import AuthProvider from "../../src/context/AuthProvider";

export default function TasksLayout({children}) {
    return <>
        <AuthProvider>
            <main className="flex h-screen relative">
                <div className="bg-gray-100 dark:bg-slate-800">
                    <Sidebar/>
                </div>
                <div className="w-full flex-1 px-6 py-3 lg:px-12 lg:py-6">
                    <div className="w-full md:max-w-2xl">
                        {children}
                    </div>
                </div>
            </main>
        </AuthProvider>
    </>
}