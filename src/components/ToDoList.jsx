import * as React from 'react';
import { ItemAdder } from './ItemAdder';
import { Item } from './Item';
import { getItems } from '../api/item';
import { LoadingState } from './LoadingState';

/**
 * type Item = {
 *  id: string;
 *  content: string;
 *  is_complete: boolean;
 * }
 */

/**
 * GOALS
 *  1. User can create item
 *  2. User can delete item
 *  3. On first page load, user should see all existing items on list
 *  4. Add loading as it's fetching
 */

const initialState = {
  items: [],
};

function reducer(state, action) {
  switch (action.type) {
    // GOAL 1
    case 'ADD_ITEM':
      const newItem = action.payload;
      return {
        ...state,
        items: [...state.items, newItem],
      };
    // GOAL 2
    case 'DELETE_ITEM':
      const idToDelete = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== idToDelete),
      };
    case 'MARK_COMPLETE_ITEM':
    default:
      return state;
  }
}

export function ToDoList() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = React.useState(true);

  // GOAL 3
  React.useEffect(() => {
    async function getExistingItems() {
      try {
        // GOAL 4
        setIsLoading(true);
        const existingItems = await getItems();
        if (existingItems.length > 0) {
          existingItems.map((existingItem) =>
            dispatch({ type: 'ADD_ITEM', payload: existingItem })
          );
        }
      } catch (e) {
        console.error('Whoops, failed to fetch.', e);
      } finally {
        setIsLoading(false);
      }
    }

    getExistingItems();
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="to-do-container">
      <ItemAdder dispatch={dispatch} />
      <div className="all-items">
        {state.items.map((item) => (
          <Item key={item.id} {...item} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
}
