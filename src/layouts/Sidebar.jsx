import User from "../../src/components/User";
import ToggleDarkMode from "../../src/components/ToggleDarkMode";
import SignOutButton from "../components/SignOutButton";
import TasksList from "@/src/components/Lists/Lists";
import ListAddButton from "../../src/components/Lists/ListAddButton";

export default function Sidebar(){
    return <>
        <div className="flex flex-col gap-6 h-full px-6 py-6">
            <User />
            <div className="flex flex-col justify-between h-full mt-4">
                <nav className="flex flex-col gap-1.5">
                    <TasksList />
                    <div className="relative">
                        <div className="absolute top-0 left-0 w-full bg-gray-300 dark:bg-gray-500" style={{ height: '0.05rem'}}></div>
                    </div>
                    <ListAddButton />
                </nav>
                <ul className="relative py-2 flex flex-col gap-1.5">
                    <div className="absolute top-0 left-0 w-full bg-gray-300 dark:bg-gray-500" style={{ height: '0.05rem'}}></div>
                    <li>
                        <ToggleDarkMode extendedMode={true} />
                    </li>
                </ul>
            </div>
        </div>
    </>
}