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
    const [tasks] = useState(TASKS)

    const morningTasks = tasks.filter((task) => task.time === "morning")
    const afternoonTasks = tasks.filter((task) => task.time === "afternoon")
    const eveningTasks = tasks.filter((task) => task.time === "evening")

    return (
        <div className="w-full px-8 py-16">
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
                    <TaskSeparator icon={<SunIcon />} title="Manhã" />
                    {morningTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
                {/* TARDE */}
                <div className="my-6 space-y-3">
                    <TaskSeparator icon={<CloudSun />} title="Tarde" />
                    {afternoonTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
                {/* NOITE */}
                <div className="my-6 space-y-3">
                    <TaskSeparator icon={<Moon />} title="Noite" />
                    {eveningTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Task
