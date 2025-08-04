import Button from "./Button"
import AddIcon from "../assets/icons/add.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"
import SunIcon from "../assets/icons/sun.svg?react"
import CloudSun from "../assets/icons/cloud-sun.svg?react"
import Moon from "../assets/icons/moon.svg?react"
import TaskSeparator from "./TasksSeparator"
import { useState } from "react"
import TASKS from "../constants/tasks"
import TaskItem from "./TaskItem"

const Task = () => {
    const [tasks, setTask] = useState(TASKS)

    const morningTasks = tasks.filter((task) => task.time === "morning")
    const afternoonTasks = tasks.filter((task) => task.time === "afternoon")
    const eveningTasks = tasks.filter((task) => task.time === "evening")

    const handleTaskCheckBoxClick = (taskId) => {
        const newTasks = tasks.map((task) => {
            if (task.id !== taskId) return task

            if (task.status === "not_started") {
                return { ...task, status: "in_progress" }
            }

            if (task.status === "in_progress") {
                return { ...task, status: "done" }
            }

            if (task.status === "done") {
                return { ...task, status: "not_started" }
            }

            return task
        })

        setTask(newTasks)
    }

    return (
        <div className="w-full space-y-6 px-8 py-16">
            <div className="flex justify-between">
                <div>
                    <span className="text-xs font-semibold text-[#00ADB5]">
                        Minhas Tarefas
                    </span>
                    <h2 className="text-xl font-semibold"> Minhas Trefas</h2>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="ghost">
                        Limpar tarefas
                        <TrashIcon />
                    </Button>
                    <Button>
                        <AddIcon />
                        Nova tarefa
                    </Button>
                </div>
            </div>

            {/* LISTA DE TAREFAS */}
            <div className="rounded-xl bg-white p-6">
                {/* MANHÃ */}
                <div className="space-y-3">
                    <TaskSeparator title="Manhã" icon={<SunIcon />} />
                    {morningTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            handleTaskCheckBoxClick={handleTaskCheckBoxClick}
                        />
                    ))}
                </div>
                {/* TARDE */}
                <div className="my-6 space-y-3">
                    <TaskSeparator title="Tarde" icon={<CloudSun />} />
                    {afternoonTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            handleTaskCheckBoxClick={handleTaskCheckBoxClick}
                        />
                    ))}
                </div>
                {/* NOITE */}
                <div className="my-6 space-y-3">
                    <TaskSeparator title="Noite" icon={<Moon />} />
                    {eveningTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            handleTaskCheckBoxClick={handleTaskCheckBoxClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Task
