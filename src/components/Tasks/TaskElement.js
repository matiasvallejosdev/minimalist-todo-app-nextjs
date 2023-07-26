'use client'
import { useState } from "react";

import TaskCheckbox from "@/src/components/Tasks/TaskCheckbox";
import TaskDelete from "@/src/components/Tasks/TaskDelete";
import TaskRow from "@/src/components/Tasks/TaskRow";


export default function TaskElement({task}) {
    const [open, setOpen] = useState(false);
    const {task_uuid, title, completed} = task;

    return <>
        <li key={task_uuid} className={`
            cursor-pointer
            flex gap-3 items-center justify-between
            ${completed ? 'line-through' : ''}
            hover:bg-gray-100 p-1 rounded-md
            w-full
            dark:hover:bg-gray-800
            pl-2
        `}
        onMouseEnter={(e) => setOpen(true)}
        onMouseLeave={(e) => setOpen(false)}
        >
            <div className="flex items-center justify-start gap-3 w-full|">
                <TaskCheckbox task={task}/>
                <TaskRow task={task}/>
            </div>
            <div className="flex items-center justify-end">
                {
                    open && <TaskDelete task={task}/>
                }
            </div>
        </li>
    </>
}