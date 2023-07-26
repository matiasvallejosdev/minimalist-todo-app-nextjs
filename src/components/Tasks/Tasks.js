
import TaskElement from "@/src/components/Tasks/TaskElement";
import TaskAddButton from "@/src/components/Tasks/TaskAddButton";

export default function Tasks({tasks, list, slug, tableCompleted}) {
    return <>
        <ul className="flex flex-col items-start justify-center w-full">
            {
                tasks.filter(({completed}) => completed === tableCompleted).map((task) => {
                    return <TaskElement key={task.id} task={task}/>
                })
            }
            {
                !tableCompleted && <TaskAddButton list={list} slug={slug}/>
            }
        </ul>
    </>
}
