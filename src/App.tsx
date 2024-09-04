import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { Task } from './components/Task'

import PlusIcon from './assets/plus.svg'
import RocketLogo from './assets/rocket.svg'
import ClipboardIcon from './assets/Clipboard.svg'

import styles from './App.module.css'

interface TaskType {
  id: number;
  check: boolean;
  content: string;
}

function App() {
  const [newTaskText, setNewTaskText] = useState('');
  const [taskList, setTaskList] = useState<Array<TaskType>>([]);
  const [tasksConcluded, setTasksConcluded] = useState(0);

  const isTaskListEmpty = taskList.length === 0;

  useEffect(() => {
    const tasksChecked = taskList.filter(task => (task.check === true)).length;

    setTasksConcluded(tasksChecked);
  }, [taskList]);

  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  };

  function handleDeleteTask(task: TaskType) {
    const taskListFiltered = taskList.filter(tasks => (tasks.id !== task.id));

    setTaskList([...taskListFiltered]);
  };

  function handleCheckTask(id: number) {
    const task = taskList.find(task => task.id === id);

    const index = taskList.findIndex(tasks => tasks === task);

    const tasks = [...taskList];

    tasks[index].check = !tasks[index].check;

    setTaskList(tasks);
  };

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    const tasksExists = taskList.filter(task => (task.content === newTaskText));

    if (tasksExists.length > 0) {
      return alert(`A tarefa ${newTaskText} já existe`);
    }

    const maxId = taskList.reduce((acc, curr) => {
      return curr.id > acc ? curr.id : acc;
    }, 0);

    const task = {
      id: maxId + 1,
      check: false,
      content: newTaskText
    };

    setTaskList([...taskList, task]);
    setNewTaskText('');
  };

  return (
    <>
      <header className={styles.header}>
        <img className={styles.logo} src={RocketLogo} />
        <h1>to<span>do</span></h1>
      </header>

      <form
        onSubmit={handleFormSubmit}
        className={styles.containerInput}
      >
        <input
          value={newTaskText}
          className={styles.input}
          onChange={handleNewTask}
          placeholder='Adicione uma nova tarefa'
        />

        <button type='submit' className={styles.button}>
          <span>
            Criar
          </span>
          <img src={PlusIcon} className={styles.plus} />
        </button>
      </form>

      <div className={styles.containerTasks}>
        <div className={styles.containerCounters}>
          <p className={styles.createdTasks}>Tarefas criadas <span>{taskList.length}</span></p>
          <p className={styles.concludedTasks}>Concluídas <span>{tasksConcluded} de {taskList.length}</span></p>
        </div>

        {isTaskListEmpty ? (
          <div className={styles.containerTaskList}>
            <img src={ClipboardIcon} className={styles.clipboard} />
            <p><span>Você ainda não tem tarefas cadastradas</span></p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        ) :
          taskList.map((task) => (
            <Task
              key={task.id}
              content={task.content}
              checked={task.check}
              onDelete={() => handleDeleteTask(task)}
              onCheck={() => handleCheckTask(task.id)}
            />
          ))
        }
      </div>
    </>
  )
}

export default App
