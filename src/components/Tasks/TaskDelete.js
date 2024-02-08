'use client'
import {IconTrash} from "@tabler/icons-react";
import {useRouter} from "next/navigation";
import {deleteTask} from "@/src/services/Tasks";
import {getAccessTokenClient} from "@/src/services/AuthClient";


export default function TaskDelete({task}){
    const {task_uuid} = task;
    const router = useRouter();

    const handleDelete = async () => {
        const accessToken = await getAccessTokenClient();

        deleteTask(accessToken, task_uuid)
            .then(() => {
                router.refresh()
            })
    }

    return<>
        <button className="hover:text-gray-600 text-gray-300 pr-2 dark:hover:text-white dark:text-gray-400" onClick={handleDelete}>
            <IconTrash size={20}/>
        </button>
    </>
}