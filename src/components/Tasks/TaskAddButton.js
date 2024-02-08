'use client'
import { useState, useEffect, useRef } from 'react';
import { IconPlus } from "@tabler/icons-react";
import { createSimpleTask } from "@/src/services/Tasks";
import { useRouter } from 'next/navigation';
import { getAccessTokenClient } from "@/src/services/AuthClient";

export default function TaskAddButton({ list, slug }) {
    const [newTask, setNewTask] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isReadyToClose, setIsReadyToClose] = useState(false);
    const router = useRouter();
    const backgroundRef = useRef(null);

    useEffect(() => {
        // Effect created to close "Task Create" when click background
        const handleClick = (event) => {
            if (backgroundRef.current && !backgroundRef.current.contains(event.target) && isReadyToClose) {
                setIsOpen(false);
                setIsReadyToClose(false);
            }
        };

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [backgroundRef, isReadyToClose]);

    const handleCreate = async () => {
        const data = {
            title: newTask,
            completed: false,
            task_list: list.list_uuid,
        };

        if(data.title === '') return;

        const accessToken = await getAccessTokenClient();
        createSimpleTask(accessToken, data).then(() => {
            setNewTask('');
            router.refresh();
        })
    }

    const handleChange = (e) => {
        setNewTask(e.target.value);
    }

    const handleOpen = () => {
        if(!isOpen){
            setIsOpen(true);
            setIsReadyToClose(true);
        }
    }

    return <>
        <li key="new-task" className={`
            cursor-pointer
            flex gap-3 items-center justify-between
            w-full
            `}
            >
            {
                isOpen ?
                    <form ref={backgroundRef} id="create-task" name="create-task" className="
                        cursor-pointer
                        flex gap-3 items-center justify-between
                        hover:bg-gray-100 p-1 rounded-md
                        w-full
                        dark:hover:bg-gray-800
                        h-8
                        pl-2
                    "
                    onBlur={handleCreate}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleCreate();
                        }
                    }}
                    >
                        <input
                            className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300 rounded cursor-pointer"
                            type="checkbox"
                        />
                        <input type="text"
                            className="h-full rounded-md bg-inherit w-full border-none
                                focus:outline-none focus:border-none focus:ring-0 text-black
                                placeholder-gray-500 dark:placeholder-gray-400 dark:text-gray-100
                                p-0
                                "
                            placeholder="New Task"
                            autoFocus
                            value={newTask}
                            onChange={(e) => handleChange(e)}

                        />
                    </form>
                    :
                    <button
                        className="pl-1 py-1 w-full text-left flex gap-2 items-center justify-start 
                        text-gray-700 hover:text-black dark:hover:text-white dark:text-gray-300"
                        onClick={handleOpen}>
                        <IconPlus size={20} />
                        <span>New Task</span>
                    </button>
            }
        </li>
    </>
}