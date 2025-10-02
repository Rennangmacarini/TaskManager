import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { CloudSunIcon, MoonIcon, SunIcon } from "../assets/icons"
import { useGetTasks } from "../hooks/data/use-get-tasks"
import { taskQueryKeys } from "../keys/queries"
import Header from "./Header"
import TaskItem from "./TaskItem"
import TaskSeparator from "./TasksSeparator"

const Tasks = () => {
    const queryClient = useQueryClient()
    const { data: tasks } = useGetTasks()
    const morningTasks = tasks?.filter((task) => task.time === "morning")
    const afternoonTasks = tasks?.filter((task) => task.time === "afternoon")
    const eveningTasks = tasks?.filter((task) => task.time === "evening")

    const handleTaskCheckBoxClick = (taskId) => {
        const newTask = tasks.map((task) => {
            if (task.id !== taskId) {
                return task
            }

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

        queryClient.setQueryData(taskQueryKeys.getAll(), newTask)
    }

    return (
        <div className="w-full space-y-6 px-8 py-16">
            <Header subtitle="Minhas Tarefas" title="Minhas Tarefas" />
            {/* LISTA DE TAREFAS */}
            <div className="rounded-xl bg-brand-white p-6">
                {/* MANHÃ */}
                <div className="space-y-3">
                    <TaskSeparator title="Manhã" icon={<SunIcon />} />
                    {morningTasks?.length === 0 && (
                        <p className="text-sm text-brand-text-gray">
                            Nenhuma tarefa cadastrada para o período da manhâ
                        </p>
                    )}
                    {morningTasks?.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            handleCheckBoxClick={handleTaskCheckBoxClick}
                        />
                    ))}
                </div>
                {/* TARDE */}
                <div className="my-6 space-y-3">
                    <TaskSeparator title="Tarde" icon={<CloudSunIcon />} />
                    {afternoonTasks?.length === 0 && (
                        <p className="text-sm text-brand-text-gray">
                            Nenhuma tarefa cadastrada para o período da tarde
                        </p>
                    )}
                    {afternoonTasks?.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            handleCheckBoxClick={handleTaskCheckBoxClick}
                        />
                    ))}
                </div>
                {/* NOITE */}
                <div className="my-6 space-y-3">
                    <TaskSeparator title="Noite" icon={<MoonIcon />} />
                    {eveningTasks?.length === 0 && (
                        <p className="text-sm text-brand-text-gray">
                            Nenhuma tarefa cadastrada para o período da noite
                        </p>
                    )}
                    {eveningTasks?.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            handleCheckBoxClick={handleTaskCheckBoxClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Tasks
