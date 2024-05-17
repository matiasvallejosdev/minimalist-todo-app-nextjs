import Board from '@/src/features/Board/components/Board';
import ListActions from '@/src/features/Lists/ListActions';
import ListTitle from '@/src/features/Lists/ListTitle';

import { getList } from '@/src/services/Lists';
import { getTasks } from '@/src/services/Tasks';
import { getAccessTokenServer } from '@/src/services/AuthServer';

// import { Suspense } from 'react';
// import { BoardSkeleton } from '@/src/streaming/BoardSkeleton';

export default async function ListPage({ params }) {
  const { slug } = params;
  const data = { slug: slug };
  const accessToken = await getAccessTokenServer();
  const [taskList, tasks] = await Promise.all([getList(accessToken, data), getTasks(accessToken, data)]);

  return (
    <>
      <div className="py-2 flex justify-between items-center">
        <ListTitle list={taskList} />
        {(slug != 'inbox') & (slug != 'upcoming') ? <ListActions list={taskList} /> : <></>}
      </div>
      <div className="flex flex-col gap-10">
        <Board slug={slug} tasks={tasks} list={taskList}/>
      </div>
    </>
  );
}
