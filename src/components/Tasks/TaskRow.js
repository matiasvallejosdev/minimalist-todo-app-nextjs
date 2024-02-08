'use client'
import {useState} from 'react';
import {updateTask} from "@/src/services/Tasks";
import {useRouter} from "next/navigation";
import { getAccessTokenClient } from '@/src/services/AuthClient';

export default function TaskRow({task}) {
    const [isOpen, setIsOpen] = useState(false);
    const {task_uuid, title, completed} = task;
    const [taskTitle, setTaskTitle] = useState(title);
    const router = useRouter();

    const handleClick = () => {
        setIsOpen(true);
    }

    const handleBlur = async () => {
        setIsOpen(false);
        const accessToken = await getAccessTokenClient();
        updateTask(accessToken, task_uuid, {
            title: taskTitle
        }).then(() => {
            task.title = taskTitle;
            router.refresh();
        }).catch(err => {
            console.log(err);
        })
    }

    return <>
        {
            isOpen ? <>
                <input type="text" value={taskTitle} autoFocus onBlur={handleBlur} onChange={(e) => {
                    setTaskTitle(e.target.value);
                }} className={`p-0 rounded-md bg-inherit w-full border-none
                                focus:outline-none focus:border-none focus:ring-0 text-gray-900
                                placeholder-gray-500 dark:placeholder-gray-400 dark:text-gray-100
                                ${isOpen ? 'rounded-none' : ''}
                                `}
                />
            </> : <div className="cursor-text" onClick={handleClick}>
                {taskTitle}
            </div>
        }
    </>
}