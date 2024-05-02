'use client';
import { IconPlus } from '@tabler/icons-react';

import useBoardActions from '../hooks/useBoardActions';
import useBoardState from '../hooks/useBoardState';

import { createSimpleTask } from '@/src/services/Tasks';
import { getAccessTokenClient } from '@/src/services/AuthClient';
import { generateUuid } from '@/src/utils/Utils';

import { useState, useRef } from 'react';
import useOutsideClick from '@/src/hooks/useOutsideClick';

import { toast } from 'sonner';

export default function TaskAddButton({ list }) {
  const { board } = useBoardState();
  const { addTaskAction, updateTaskAction, setTasksAction } = useBoardActions();

  const [title, setTitle] = useState(''); 

  const [isOpen, setIsOpen] = useState(false);
  const [isReadyToClose, setIsReadyToClose] = useState(false);
  
  const backgroundRef = useRef(null);

  useOutsideClick(backgroundRef, () => {
    setIsOpen(false);
    setIsReadyToClose(false);
    handleCreate();
  }, isReadyToClose);

  const handleCreate = async (e) => {
    if (title === '') return;

    const tasksBackup = board.tasks;
    const taskUuid = generateUuid();
    const data = {
      title: title,
      completed: false,
      task_list: list.list_uuid,
    };

    addTaskAction({...data, task_uuid: taskUuid});
    setTitle('');

    const accessToken = await getAccessTokenClient();
    createSimpleTask(accessToken, data)
      .then((task) => {
        updateTaskAction({ task_uuid: taskUuid, task: task });
        toast.success('Task created successfully');
      })
      .catch(() => {
        setTasksAction(tasksBackup);
        toast.error('An error occurred while creating the task');
      });
  };

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsReadyToClose(true);
    }
  };

  return (
    <>
      <li
        className={`
            cursor-pointer
            flex gap-4 items-center justify-between
            w-full
            mt-0.5
            `}
      >
        {isOpen ? (
          <form
            ref={backgroundRef}
            id="create-task"
            name="create-task"
            className="
                        cursor-pointer
                        flex gap-3 items-center justify-between
                        hover:bg-gray-100 p-1 rounded-md
                        w-full
                        dark:hover:bg-gray-800
                        h-full
                        pl-1
                        pt-1
                    "
            onBlur={(e) => {
              e.preventDefault();
              handleCreate(e);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleCreate(e);
              }
              if (e.key == 'Escape') {
                e.preventDefault();
                setIsOpen(false);
                setIsReadyToClose(false);
              }
            }}
          >
            <input
              className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300 rounded cursor-pointer"
              type="checkbox"
            />
            <input
              name="title"
              type="text"
              className="h-full rounded-md bg-inherit w-full border-none
                                focus:outline-none focus:border-none focus:ring-0 text-black
                                placeholder-gray-500 dark:placeholder-gray-400 dark:text-gray-100
                                p-0 text-sm
                                "
              placeholder="Task Title"
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </form>
        ) : (
          <button
            className="pt-1 w-full text-left flex gap-2 items-center justify-start 
                        text-gray-700 hover:text-black dark:hover:text-white dark:text-gray-300
                        text-sm
                        "
            onClick={handleOpen}
          >
            <IconPlus size={20} />
            <span>New Task</span>
          </button>
        )}
      </li>
    </>
  );
}
