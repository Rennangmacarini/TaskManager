import { Toaster } from "sonner"
import Sidebar from "./components/Sidebar"
import Task from "./components/Tasks"

function App() {
    return (
        <div className="flex">
            <Toaster
                toastOptions={{
                    style: {
                        color: "#35383e",
                    },
                }}
            />
            <Sidebar />
            <Task />
        </div>
    )
}

export default App
