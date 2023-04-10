import "./App.css";
import { TaskManager } from "./components/TaskManager";

function App() {
  return (
    <div className="App">
      {/* <input
        type="number"
        value={val}
        onChange={(e) => setVal(Number((e.target as HTMLInputElement).value))}
      /> */}
      {/* <RadialProgressBar
        className="radial-progress"
        // percentage={val}
        maximumValue={val}
        duration={10000}
        progressColor="linear-gradient(90deg, #3F2B96 0%, #A8C0FF 100%)"
        progressBackground="red"
      /> */}
      <TaskManager />
    </div>
  );
}

export default App;
