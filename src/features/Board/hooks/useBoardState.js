import { useSelector } from 'react-redux';

export default function useBoardState() {
  const board = useSelector((state) => state.board);
  return { board };
}
