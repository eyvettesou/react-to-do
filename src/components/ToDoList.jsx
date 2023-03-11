import * as React from 'react';
import { ItemAdder } from './ItemAdder';
import { Item } from './Item';

/**
 * type Item = {
 *  id: string;
 *  content: string;
 * }
 */

/**
 * GOALS
 *  1. User can create item
 *  2. User can delete item
 *  3. On first page load, user should see all existing items on list
 *  4. Add loading as it's fetching
 */

/**
 * type Action = {
 *  type: string;
 *  payload: Object;
 * }
 */

const initialState = {
  items: [],
  users: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'UPDATE_ITEM':
    case 'MARK_AS_COMPLETE':
    case 'DELETE_ALL':
    default:
      return;
  }
};

export function ToDoList() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div
      id="container"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <ItemAdder dispatch={dispatch} />
      <div id="all-items">
        {state.items.map((item) => (
          <Item id={item.id} content={item.content} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
}
