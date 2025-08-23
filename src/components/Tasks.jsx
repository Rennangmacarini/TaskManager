import { useState } from "react"
import { toast } from "sonner"

import {
    AddIcon,
    CloudSunIcon,
    MoonIcon,
    SunIcon,
    TrashIcon,
} from "../assets/icons"
import TASKS from "../constants/tasks"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"
import TaskItem from "./TaskItem"
import TaskSeparator from "./TasksSeparator"

const Task = () => {
    const [tasks, setTask] = useState(TASKS)
    const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

    const morningTasks = tasks.filter((task) => task.time === "morning")
    const afternoonTasks = tasks.filter((task) => task.time === "afternoon")
    const eveningTasks = tasks.filter((task) => task.time === "evening")

    const handleTaskDeleteClick = (taskId) => {
        const newTasks = tasks.filter((task) => task.id !== taskId)
        setTask(newTasks)
        toast.success("Tarefa deletada com sucesso!")
    }

    const handleTaskCheckBoxClick = (taskId) => {
        const newTasks = tasks.map((task) => {
            if (task.id !== taskId) return task

            if (task.status === "not_started") {
                toast.success("Tarefa iniciada com sucesso!")
                return { ...task, status: "in_progress" }
            }

            if (task.status === "in_progress") {
                toast.success("Tarefa concluída com sucesso!")
                return { ...task, status: "done" }
            }

            if (task.status === "done") {
                toast.success("Tarefa reiniciada com sucesso!")
                return { ...task, status: "not_started" }
            }

            return task
        })

        setTask(newTasks)
    }

    const handleAddTaskSubmit = (task) => {
        setTask([...tasks, task])
        toast.success("Tarefa adicionada com sucesso!")
    }

    return (
        <div className="w-full space-y-6 px-8 py-16">
            <div className="flex justify-between">
                <div>
                    <span className="text-xs font-semibold text-brand-primary">
                        Minhas Tarefas
                    </span>
                    <h2 className="text-xl font-semibold"> Minhas Trefas</h2>
                </div>
                <div className="flex items-center gap-3">
                    <Button color="ghost">
                        Limpar tarefas
                        <TrashIcon />
                    </Button>
                    <Button onClick={() => setAddTaskDialogIsOpen(true)}>
                        <AddIcon />
                        Nova tarefa
                    </Button>

                    <AddTaskDialog
                        isOpen={addTaskDialogIsOpen}
                        handleClose={() => setAddTaskDialogIsOpen(false)}
                        handleSubmit={handleAddTaskSubmit}
                    />
                </div>
            </div>

            {/* LISTA DE TAREFAS */}
            <div className="rounded-xl bg-brand-white p-6">
                {/* MANHÃ */}
                <div className="space-y-3">
                    <TaskSeparator title="Manhã" icon={<SunIcon />} />
                    {morningTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            handleCheckBoxClick={handleTaskCheckBoxClick}
                            handleDeleteClick={handleTaskDeleteClick}
                        />
                    ))}
                </div>
                {/* TARDE */}
                <div className="my-6 space-y-3">
                    <TaskSeparator title="Tarde" icon={<CloudSunIcon />} />
                    {afternoonTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            handleCheckBoxClick={handleTaskCheckBoxClick}
                            handleDeleteClick={handleTaskDeleteClick}
                        />
                    ))}
                </div>
                {/* NOITE */}
                <div className="my-6 space-y-3">
                    <TaskSeparator title="Noite" icon={<MoonIcon />} />
                    {eveningTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            handleCheckBoxClick={handleTaskCheckBoxClick}
                            handleDeleteClick={handleTaskDeleteClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Task
