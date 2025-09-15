import Sidebar from "./components/Sidebar"
import Task from "./components/Tasks"

function App() {
    return (
        <div className="flex">
            <Sidebar />
            <Task />
        </div>
    )
}

export default App
