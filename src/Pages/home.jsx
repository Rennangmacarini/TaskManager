import { Loader, TasksIcon, TasksTwo, Water } from "../assets/icons"
import DashBoardCard from "../components/DashboardCard"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { useGetTasks } from "../hooks/data/use-get-tasks"

const HomePage = () => {
    const { data: tasks } = useGetTasks()

    const inProgressTasks = tasks?.filter(
        (task) => task.status === "in_progress"
    ).length

    const completedTasks = tasks?.filter(
        (task) => task.status === "done"
    ).length

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full space-y-6 px-8 py-16">
                <Header subtitle="Dashboard" title="Dashboard" />
                <div className="grid grid-cols-4 gap-9">
                    <DashBoardCard
                        icon={<TasksTwo />}
                        mainText={tasks?.length}
                        secondaryText="Tarefas disponíveis"
                    />

                    <DashBoardCard
                        icon={<TasksIcon />}
                        mainText={completedTasks}
                        secondaryText="Tarefas concluídas"
                    />

                    <DashBoardCard
                        icon={<Loader />}
                        mainText={inProgressTasks}
                        secondaryText="Tarefas andamento"
                    />

                    <DashBoardCard
                        icon={<Water />}
                        mainText="5"
                        secondaryText="Água"
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage
