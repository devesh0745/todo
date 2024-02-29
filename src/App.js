import './App.css';
import { TodoForm } from './component/TodoForm/todoForm';
import {Provider} from "react-redux"
import { store } from './redux/store';
import { TodoList } from './component/TodoList/todoList';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TodoForm />
        <TodoList />
      </Provider>
    </div>
  );
}

export default App;
