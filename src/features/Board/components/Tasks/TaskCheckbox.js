'use client';
import { IconCheck } from '@tabler/icons-react';

import { updateTask } from '@/src/services/Tasks';
import { getAccessTokenClient } from '@/src/services/AuthClient';
import useBoardActions from '../../hooks/useBoardActions';

import { Checkbox } from "@/components/ui/checkbox"
import { toast } from 'sonner';

export default function TaskCheckbox({ task }) {
  const { task_uuid, completed } = task;
  const { updateStatusTaskAction } = useBoardActions();

  const handleCheckbox = async () => {
    const accessToken = await getAccessTokenClient();
    const taskBackup = task;
    const status = completed ? 'incompleted' : 'completed';

    updateStatusTaskAction({ task_uuid: task_uuid, status: status });
    updateTask(accessToken, task_uuid, {
      completed: !completed,
    })
    .then(() => {
      toast.success('Task updated successfully');
    })
    .catch((err) => {
      console.error(err);
      const statusBackup = taskBackup.completed ? 'completed' : 'incompleted';
      updateStatusTaskAction({ task_uuid: taskBackup.task_uuid, status: statusBackup });
      toast.error('An error occurred while updating the task');
    });
  };

  return (
    <>
      {completed ? (
        <IconCheck size={20} className="text-blue-500" onClick={handleCheckbox} />
      ) : (
        <Checkbox checked={completed} onClick={handleCheckbox} />
      )}
    </>
  );
}
