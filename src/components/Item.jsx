import { deleteItem } from '../api/item';

export function Item({ id, content, dispatch }) {
  const onClick = async () => {
    await deleteItem({ id });
    dispatch({ type: 'DELETE_ITEM', payload: id });
  };

  return (
    <div className='item'>
      <span>{content}</span>
      <button onClick={onClick}>Delete</button>
    </div>
  );
}