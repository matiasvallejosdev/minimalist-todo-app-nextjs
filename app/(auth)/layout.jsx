import Header from "@/src/layouts/Header";


export default function AuthLayout({children}){
    return (
        <>
            <div className="w-full h-screen p-0 m-0 mx-auto bg-slate-100 dark:bg-slate-900">
                <div className="h-full">
                    {children}
                </div>
            </div>
        </>
    );
}