'use client';
import { updateTask } from "@/src/services/Tasks";
import { useRouter } from "next/navigation";
import { getAccessTokenClient } from "@/src/services/AuthClient";
import { IconCheck } from "@tabler/icons-react";

export default function TaskCheckbox({ task }) {
    const { task_uuid, completed } = task;
    const router = useRouter();

    const handleCheckbox = async () => {
        const accessToken = await getAccessTokenClient();

        updateTask(accessToken, task_uuid, {
            completed: !completed
        }).then(() => {
            router.refresh();
        }).catch(err => {
            console.log(err);
        })
    }

    return <>
        {
            completed ? <IconCheck size={20} className="text-blue-500" onClick={handleCheckbox}/> : <input
                className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300 
                rounded cursor-pointer
                dark:bg-slate-700 dark:border-slate-400
                "
                type="checkbox"
                checked={completed}
                onChange={handleCheckbox}
            />
        }
    </>
}