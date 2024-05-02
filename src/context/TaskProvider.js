'use client'
import {createContext, useContext, useReducer} from "react";

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

export function useTasksContext(){
    return useContext(TasksContext);
}

export function useTasksDispatchContext(){
    return useContext(TasksDispatchContext);
}

export default function TaskProvider({children}){
    const [tasks, dispatch] = useReducer(
        tasksReducer,
        []
    );
    const [listUuid, setListUuid] = useState(null);


    return<>
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    </>
}

function tasksReducer(tasks, action){
    switch(action.type){
        case 'new':
            return {
                ...tasks,
                [action.task.id]: action.task
            }
        case 'delete':
            return tasks
        case 'update':
            return tasks
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}