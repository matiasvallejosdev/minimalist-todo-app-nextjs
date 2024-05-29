'use client';
import { useState } from 'react';
import useBoardActions from '../../hooks/useBoardActions';

import { updateTask } from '@/src/services/api/TasksApi';
import { getAccessTokenClient } from '@/src/services/auth/AuthClient';

import { toast } from 'sonner';

export default function TaskRowEdit({ task }) {
  const [isOpen, setIsOpen] = useState(false);
  const { task_uuid, title } = task;
  const [taskTitle, setTaskTitle] = useState(title);
  const { updateTaskAction } = useBoardActions();

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleBlur = async () => {
    setIsOpen(false);
    const accessToken = await getAccessTokenClient();
    const taskBackup = task;
    const data = {
      title: taskTitle,
    };
    const taskUpdated = {
      ...task,
      ...data
    };

    updateTaskAction({ task_uuid: task_uuid, task: taskUpdated });
    updateTask(accessToken, task_uuid, data)
      .then((task) => {
        updateTaskAction({ task_uuid: task_uuid, task: task });
        toast.success('Task updated successfully');
      })
      .catch((err) => {
        console.log(err);
        toast.error('An error occurred while updating the task');
        updateTaskAction({ task_uuid: taskBackup.task_uuid, task: taskBackup });
      });
  };

  return (
    <>
      {isOpen ? (
        <>
          <input
            type="text"
            value={taskTitle}
            autoFocus
            onBlur={handleBlur}
            onChange={(e) => {
              setTaskTitle(e.target.value);
            }}
            className={`p-0 text-sm rounded-md bg-inherit w-full border-none
                                focus:outline-none focus:border-none focus:ring-0 text-gray-900
                                placeholder-gray-500 dark:placeholder-gray-400 dark:text-gray-100
                                ${isOpen ? 'rounded-none' : ''}
                                `}
          />
        </>
      ) : (
        <div className="cursor-text text-sm" onClick={handleClick}>
          {taskTitle}
        </div>
      )}
    </>
  );
}
