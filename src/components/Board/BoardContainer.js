'use client';
import TaskProvider from '@/src/context/TaskProvider';
import Board from './Board';
import TasksDropdown from '@/src/components/Tasks/TasksDropdown';

export default function BoardContainer({ tasks, taskList, slug, tasksCounted }) {
    return (
        <>
            <TaskProvider>
                <Board tasks={tasks} list={taskList} slug={slug} tableCompleted={false} />
                <TasksDropdown tasksCompleted={tasksCounted.completed}>
                    <Board tasks={tasks} list={taskList} slug={slug} tableCompleted={true} />
                </TasksDropdown>
            </TaskProvider>
        </>
    );
}
