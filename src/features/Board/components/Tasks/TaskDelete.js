'use client';
import { IconTrash } from '@tabler/icons-react';

import { deleteTask } from '@/src/services/api/TasksApi';
import { getAccessTokenClient } from '@/src/services/auth/AuthClient';

import useBoardActions from '../../hooks/useBoardActions';

import { toast } from 'sonner';

export default function TaskDelete({ task }) {
  const { task_uuid } = task;
  const { removeTaskAction, addTaskAction } = useBoardActions();

  const handleDelete = async () => {
    const accessToken = await getAccessTokenClient();
    const taskBackup = task;

    removeTaskAction(task_uuid);
    deleteTask(accessToken, task_uuid)
      .then(() => {
        toast.success('Task deleted successfully');
      })
      .catch(() => {
        addTaskAction(taskBackup);
        toast.error('An error occurred while deleting the task');
      });
  };

  return (
    <>
      <button
        className="hover:text-gray-600 text-gray-300 pr-2 dark:hover:text-white dark:text-gray-400"
        onClick={handleDelete}
      >
        <IconTrash size={20} />
      </button>
    </>
  );
}
