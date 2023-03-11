import * as React from 'react';
import { createItem } from '../api/item';

export function ItemAdder({ dispatch }) {
  const [item, setItem] = React.useState('');

  const onChange = (e) => {
    setItem(e.target.value);
  };

  const onClick = async () => {
    try {
      const serverItem = await createItem({ content: item });
      dispatch({ type: 'ADD_ITEM', payload: serverItem });
    } catch (e) {
      console.error(`Cannot create item: ${e}`);
    } finally {
      setItem('');
    }
  };

  return (
    <div className="item-adder">
      <input type="text" value={item} onChange={onChange} />
      <button onClick={onClick}>Add Item</button>
    </div>
  );
}
