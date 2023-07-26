import Tasks from "@/src/components/Tasks/Tasks";
import { countTasks } from "@/src/services/Tasks";
import TasksDropdown from "@/src/components/Tasks/TasksDropdown";
import { getList } from "@/src/services/Lists";
import { getAccessTokenServer } from "@/src/services/AuthServer";
import { getTasks } from "@/src/services/Tasks";
import ListActions from "@/src/components/Lists/ListActions";
import ListTitle from "@/src/components/Lists/ListTitle";

export default async function ListPage({ params, props }) {
    const { slug } = params
    const data = { slug: slug }
    const accessToken = await getAccessTokenServer();

    const [tasksCounted, taskList, tasks] = await Promise.all([
        countTasks(accessToken, data),
        getList(accessToken, data),
        getTasks(accessToken, data)
    ]);

    return <>
        <div className="py-2 flex justify-between items-center">
            <ListTitle list={taskList}/>
            {
                slug != 'inbox' && <ListActions list={taskList} />
            }
        </div>
        <div className="flex flex-col gap-10">
            <Tasks tasks={tasks} list={taskList} slug={slug} tableCompleted={false} />
            <TasksDropdown tasksCompleted={tasksCounted.completed}>
                <Tasks tasks={tasks} list={taskList} slug={slug} tableCompleted={true} />
            </TasksDropdown>
        </div>
    </>;
}