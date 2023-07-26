'use client'
import {useContext, useReducer, createContext} from "react";
import {tasks as tasksData} from "../data/TasksAPI";

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
        tasksData
    );

    return <>
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    </>
}

function tasksReducer(tasks, action) {
    switch (action.type) {
        case 'added': {
            return [...tasks, {
                id: action.id,
                text: action.text,
                done: false
            }];
        }
        case 'changed': {
            return tasks.map(t => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return tasks.filter(t => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}