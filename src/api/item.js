import { v4 as uuid } from 'uuid';

// pretend these are requests to a server

function getLocalStorage(key){
  return JSON.parse(window.localStorage.getItem(key));
}

export const getItems = () => {
  const serverItems = getLocalStorage('items') || [];
  const p = new Promise((res) => {
    setTimeout(() => {
      res(serverItems)
    // }, 3000);
    }, 0);
  });

  return p;
}

export const createItem = ({ content }) => {
  const newItem = {
    id: uuid(),
    content,
    is_complete: false,
  } 
  const serverItems = getLocalStorage('items') || [];
  window.localStorage.setItem(
    'items',
    JSON.stringify([...serverItems, newItem])
  );
  return Promise.resolve(newItem);
}

export const deleteItem = ({ id }) => {
  const serverItems = getLocalStorage('items') || [];
  window.localStorage.setItem(
    'items',
    JSON.stringify(
      serverItems.filter(item => item.id !== id)
    )
  );
  return Promise.resolve();
};
