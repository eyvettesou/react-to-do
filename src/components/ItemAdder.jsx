import * as React from 'react';
import { createItem } from '../api/item';

export function ItemAdder({ dispatch }) {
  const [inputValue, setInputValue] = React.useState('');
  const onChange = (e) => {
    setInputValue(e.target.value);
  };
  const onClick = async() => {
    try {
      const res = await createItem({ content: inputValue });
      dispatch({
        type: 'ADD_ITEM',
        payload: res,
      })
    } catch(e) {
      console.error('Something went wrong', e)
    }
  };

  return (
    <div id="item-adder" style={{ display: 'flex' }}>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={onClick}>Add Item</button>
    </div>
  );
}
