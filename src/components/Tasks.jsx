import { useEffect, useState } from "react"
import { toast } from "sonner"

import {
    AddIcon,
    CloudSunIcon,
    MoonIcon,
    SunIcon,
    TrashIcon,
} from "../assets/icons"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"
import TaskItem from "./TaskItem"
import TaskSeparator from "./TasksSeparator"

const Task = () => {
    const [tasks, setTasks] = useState([])
    const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch("http://localhost:3000/tasks", {
                method: "GET",
            })
            const tasks = await response.json()
            setTasks(tasks)
        }

        fetchTasks()
    }, [])

    const morningTasks = tasks.filter((task) => task.time === "morning")
    const afternoonTasks = tasks.filter((task) => task.time === "afternoon")
    const eveningTasks = tasks.filter((task) => task.time === "evening")

    const onDeleteTaskSuccess = async (taskId) => {
        const newTasks = tasks.filter((task) => task.id !== taskId)
        setTasks(newTasks)
        toast.success("Tarefa deletada com sucesso!")
    }

    const handleTaskCheckBoxClick = async (taskId) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id !== taskId) return task

            let newStatus = task.status
            if (task.status === "not_started") newStatus = "in_progress"
            else if (task.status === "in_progress") newStatus = "done"
            else if (task.status === "done") newStatus = "not_started"

            return { ...task, status: newStatus }
        })

        setTasks(updatedTasks)

        const updatedTask = updatedTasks.find((t) => t.id === taskId)
        await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: updatedTask.status }),
        })
    }

    const onTaskSubmitSucess = (task) => {
        setTasks([...tasks, task])
        toast.success("Tarefa adicionada com sucesso!")
    }

    const onTaskSubmitError = () => {
        toast.error("Erro ao adicionar tarefa. Por favor, tente novamente.")
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
                        onSubmiteSucess={onTaskSubmitSucess}
                        onSubmiteError={onTaskSubmitError}
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
                            onDeleteSuccess={onDeleteTaskSuccess}
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
                            onDeleteSuccess={onDeleteTaskSuccess}
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
                            onDeleteSuccess={onDeleteTaskSuccess}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Task
