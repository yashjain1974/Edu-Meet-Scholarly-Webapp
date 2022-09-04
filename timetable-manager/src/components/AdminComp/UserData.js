
import React,{useState,useEffect} from "react";
import useHttp from "../../Hooks/Http-use";
import NewUser from "./NewUser";
import UserView from "./UsersView";


const UserData=()=>{
    const [tasks, setTasks] = useState({});

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      { url: 'https://to-do-task-7340d-default-rtdb.firebaseio.com/tasks.json' },
      transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task,email,password) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      < NewUser onAddTask={taskAddHandler} />
      <UserView
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}
export default UserData;