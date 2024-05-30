import { useDispatch } from 'react-redux';
import { setLists, addList, removeList, updateList, updateListName } from '@/src/lib/features/listSlice';

export default function useListActions() {
  const dispatch = useDispatch();

  const setListsAction = (lists) => {
    dispatch(setLists(lists));
  };

  const addListAction = (list) => {
    dispatch(addList(list));
  };

  const removeListAction = (list_uuid) => {
    dispatch(removeList(list_uuid));
  };

  const updateListAction = (list) => {
    dispatch(updateList(list));
  };

  const updateListNameAction = ({ list_uuid, name }) => {
    dispatch(updateListName({ list_uuid, name }));
  };

  return {
    setListsAction,
    addListAction,
    removeListAction,
    updateListAction,
    updateListNameAction,
  };
}
