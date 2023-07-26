import {tasks} from '@/src/data/TasksData'
import Link from "next/link";

export default function TasksPage(){
    return<>
        <h3>Tasks</h3>
        <ul>
        {
            tasks.map(({id,title,description,completed})=>{
                return <li key={id}>
                    <p>{id}</p>
                    <h5>
                        <Link href={`/tasks/${title}`}>
                            {title}
                        </Link>
                    </h5>
                    <p>{description}</p>
                </li>
            })
        }
        </ul>
    </>
}