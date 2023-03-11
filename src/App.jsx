import './App.css';
import { ToDoList } from './components/ToDoList';

function Header() {
  return (
    <div id="header">
      <h1 className="title">To Do List</h1>
    </div>
  );
}

function Content(props) {
  return <div className="list-content">{props.children}</div>;
}

function App() {
  return (
    <div className="App">
      <Header />
      <Content>
        <ToDoList />
      </Content>
    </div>
  );
}

export default App;
