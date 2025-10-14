import { Loader, TasksIcon, TasksTwo } from "../assets/icons"
import { useGetTasks } from "../hooks/data/use-get-tasks"
import DashBoardCard from "./DashboardCard"

const DashboardCards = () => {
    const { data: tasks } = useGetTasks()

    const notStartedTasks = tasks?.filter(
        (task) => task.status === "not_started"
    ).length

    const inProgressTasks = tasks?.filter(
        (task) => task.status === "in_progress"
    ).length

    const completedTasks = tasks?.filter(
        (task) => task.status === "done"
    ).length
    return (
        <div className="grid grid-cols-4 gap-9">
            <DashBoardCard
                icon={<TasksTwo />}
                mainText={tasks?.length}
                secondaryText="Tarefas totais"
            />

            <DashBoardCard
                icon={<Loader />}
                mainText={notStartedTasks}
                secondaryText="Tarefas não iníciada"
            />

            <DashBoardCard
                icon={<Loader />}
                mainText={inProgressTasks}
                secondaryText="Tarefas andamento"
            />

            <DashBoardCard
                icon={<TasksIcon />}
                mainText={completedTasks}
                secondaryText="Tarefas concluídas"
            />
        </div>
    )
}

export default DashboardCards
