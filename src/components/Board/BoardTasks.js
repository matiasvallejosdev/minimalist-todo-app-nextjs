import { countTasks } from '@/src/services/Tasks';
import { getList } from '@/src/services/Lists';
import { getAccessTokenServer } from '@/src/services/AuthServer';
import { getTasks } from '@/src/services/Tasks';
import BoardContainer from './BoardContainer';

export default async function BoardTasks({ slug, data }) {
    const accessToken = await getAccessTokenServer();
    let tasksCounted,
        taskList,
        tasks = {};

    if (slug == 'upcoming') {
        [tasksCounted, tasks] = await Promise.all([countTasks(accessToken, data), getTasks(accessToken, data)]);
        taskList = {
            id: 0,
            name: 'Upcoming',
        };
    } else {
        [tasksCounted, taskList, tasks] = await Promise.all([
            countTasks(accessToken, data),
            getList(accessToken, data),
            getTasks(accessToken, data),
        ]);
    }

    return (
        <>
            <BoardContainer tasks={tasks} taskList={taskList} slug={slug} tasksCounted={tasksCounted}/>
        </>
    );
}
