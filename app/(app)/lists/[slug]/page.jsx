import Board from "@/src/components/Board";
import { countTasks } from "@/src/services/Tasks";
import TasksDropdown from "@/src/components/Tasks/TasksDropdown";
import { getList } from "@/src/services/Lists";
import { getAccessTokenServer } from "@/src/services/AuthServer";
import { getTasks } from "@/src/services/Tasks";
import ListActions from "@/src/components/Lists/ListActions";
import ListTitle from "@/src/components/Lists/ListTitle";

export default async function ListPage({ params }) {
    const { slug } = params
    const data = { slug: slug }
    const accessToken = await getAccessTokenServer();
    let tasksCounted, taskList, tasks = {}

    if(slug == "upcoming"){
        [tasksCounted, tasks] = await Promise.all([
            countTasks(accessToken, data),
            getTasks(accessToken, data)
        ]);
        taskList = {
            id: 0,
            name: "Upcoming"
        }
    } else{
        [tasksCounted, taskList, tasks] = await Promise.all([
            countTasks(accessToken, data),
            getList(accessToken, data),
            getTasks(accessToken, data)
        ]);
    }

    return <>
        <div className="py-2 flex justify-between items-center">
            <ListTitle list={taskList}/>
            {
                slug != 'inbox' & slug !='upcoming' ? <ListActions list={taskList} /> : <></>
            }
        </div>
        <div className="flex flex-col gap-10">
            <Board tasks={tasks} list={taskList} slug={slug} tableCompleted={false} />
            <TasksDropdown tasksCompleted={tasksCounted.completed}>
                <Board tasks={tasks} list={taskList} slug={slug} tableCompleted={true} />
            </TasksDropdown>
        </div>
    </>;
}