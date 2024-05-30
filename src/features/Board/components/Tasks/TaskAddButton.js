'use client';
import { IconPlus } from '@tabler/icons-react';

import useBoardActions from '../../hooks/useBoardActions';
import useBoardState from '../../hooks/useBoardState';

import { createSimpleTask } from '@/src/services/api/TasksApi';
import { getAccessTokenClient } from '@/src/services/auth/AuthClient';
import { generateUuid } from '@/utils/appUtils';
import { getCompletion } from '@/src/services/api/AIApi';

import { useState, useRef, useEffect } from 'react';
import useOutsideClick from '@/src/hooks/useOutsideClick';

import { Checkbox } from '@/src/components/ui/checkbox';

import { toast } from 'sonner';

export default function TaskAddButton({ list }) {
  const { board } = useBoardState();
  const { addTaskAction, updateTaskAction, setTasksAction } = useBoardActions();

  const [title, setTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isReadyToClose, setIsReadyToClose] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  const backgroundRef = useRef(null);
  const inputRef = useRef(null);
  const spanRef = useRef(null);

  useOutsideClick(
    backgroundRef,
    () => {
      setIsOpen(false);
      setIsReadyToClose(false);
      handleCreate();
    },
    isReadyToClose,
  );

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      inputRef.current.style.width = `${spanRef.current.offsetWidth}px`;
    }
  }, [title]);

  const handleCreate = async (e) => {
    setSuggestion('');
    if (title === '') return;

    const tasksBackup = board.tasks;
    const taskUuid = generateUuid();
    const data = {
      title: title,
      completed: false,
      task_list: list.list_uuid,
    };

    addTaskAction({ ...data, task_uuid: taskUuid });
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

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreate(e);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      setIsReadyToClose(false);
    } else if (e.key === 'Tab' && suggestion) {
      e.preventDefault();
      // setTitle(suggestion);
      setSuggestion('');
    } else if (e.key === 'Backspace' && suggestion) {
      e.preventDefault();
      setSuggestion('');
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
          px-4
          hover:bg-gray-100 dark:hover:bg-gray-800
          rounded-md
          p-1
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
              w-full
              h-full
            "
            onBlur={(e) => {
              e.preventDefault();
              handleCreate(e);
            }}
            onKeyDown={handleKeyDown}
          >
            <Checkbox checked={false} disabled />
            <div className="relative w-full flex items-center text-sm">
              <span ref={spanRef} className="absolute invisible whitespace-pre-wrap" aria-hidden="true">
                {title}
              </span>
              <input
                ref={inputRef}
                name="title"
                type="text"
                className="bg-inherit border-none w-auto
                  focus:outline-none focus:border-none focus:ring-0 
                "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                placeholder={title === '' ? 'Task Title' : ''} // Conditional placeholder
              />
              {suggestion && <span className="text-gray-500 opacity-50 ml-1">{suggestion.slice(title.length)}</span>}
            </div>
          </form>
        ) : (
          <button
            className="w-full text-left flex gap-2 items-center justify-start 
              text-gray-700 hover:text-black dark:hover:text-white dark:text-gray-300
              text-sm p-0
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
