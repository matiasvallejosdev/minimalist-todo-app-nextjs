import { useSelector } from 'react-redux';

export default function useListState() {
  const list = useSelector((state) => state.list);
  return { list };
}
