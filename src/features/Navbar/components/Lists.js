import ListElement from '@/src/features/Lists/ListElement';
import { getLists } from '@/src/services/Lists';
import { IconMenu2, IconCalendar, IconInbox } from '@tabler/icons-react';
import { getAccessTokenServer } from '@/src/services/AuthServer';

export default async function Lists() {
  const accessToken = await getAccessTokenServer();
  let lists = await getLists(accessToken);
  lists = lists.filter((e) => e.name !== 'inbox');

  return (
    <>
      <ul className="flex flex-col gap-1">
        <ListElement
          key={'1-inbox'}
          id={'1-inbox'}
          name={'Inbox'}
          list_uuid="inbox"
          icon={<IconInbox size={17} />}
        />
        {/* // TODO: Upcoming error 404 not found. */}
        {/* <ListElement
          key={'2-upcoming'}
          id={'2-upcoming'}
          name={'Upcoming'}
          list_uuid="upcoming"
          icon={<IconCalendar size={17} />}
        /> */}
        <div className="relative">
          <div
            className="absolute top-0 left-0 w-full bg-gray-300 dark:bg-gray-500"
            style={{ height: '0.05rem' }}
          ></div>
        </div>
          {lists.map((list) => {
            const { id, name, list_uuid } = list;
            return (
              <ListElement
                key={id}
                id={id}
                name={name}
                list_uuid={list_uuid}
                icon={<IconMenu2 size={17} />}
              />
            );
          })}
      </ul>
    </>
  );
}
