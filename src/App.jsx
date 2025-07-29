import Sidebar from "./components/Sidebar"
import Task from "./components/Tasks"

function App() {
    return (
        <div className="flex gap-9">
            <Sidebar />
            <Task />
        </div>
    )
}

export default App
