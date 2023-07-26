import Sidebar from "../../src/layouts/Sidebar";
import AuthProvider from "../../src/context/AuthProvider";

export default function TasksLayout({children}) {
    return <>
        <AuthProvider>
            <main className="flex h-screen relative">
                <div className="bg-gray-100 dark:bg-slate-800">
                    <Sidebar/>
                </div>
                <div className="w-full flex-1 px-10 py-8">
                    <div className="max-w-2xl">
                        {children}
                    </div>
                </div>
            </main>
        </AuthProvider>
    </>
}