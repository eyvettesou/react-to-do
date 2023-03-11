import { deleteItem } from '../api/item';

export function Item({ id, content, dispatch }) {
  const onClick = async () => {
    try {
      await deleteItem({id});
      dispatch({
        type: 'DELETE_ITEM',
        payload: id,
      });
    } catch (e) {
      console.error('Something went wrong', e)
    }
  }

  return (
    <div
      key={id}
      id="item"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>{content}</div> <button onClick={onClick}>Delete</button>
    </div>
  );
}