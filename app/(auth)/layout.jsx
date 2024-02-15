import Header from "@/src/layouts/Header";


export default function AuthLayout({children}){
    return (
        <>
            <div className="w-full h-screen mx-auto bg-slate-100 dark:bg-slate-900 p-2">
                <div className="h-full">
                    {children}
                </div>
            </div>
        </>
    );
}