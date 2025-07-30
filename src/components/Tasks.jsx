import Button from "./Button"
import AddIcon from "../assets/icons/add.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"
import SunIcon from "../assets/icons/sun.svg?react"
import CloudSun from "../assets/icons/cloud-sun.svg?react"
import Moon from "../assets/icons/moon.svg?react"

const Task = () => {
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
                    <div className="flex gap-2 border-b border-solid border-[#f4f4f5] pb-1">
                        <SunIcon />
                        <p className="text-sm text-[#9a9c9f]">Manhã</p>
                    </div>
                </div>
                {/* TARDE */}
                <div className="my-6 space-y-3">
                    <div className="flex gap-2 border-b border-solid border-[#f4f4f5] pb-1">
                        <CloudSun />
                        <p className="text-sm text-[#9a9c9f]">Tarde</p>
                    </div>
                </div>
                {/* NOITE */}
                <div>
                    <div className="flex gap-2 border-b border-solid border-[#f4f4f5] pb-1">
                        <Moon />
                        <p className="text-sm text-[#9a9c9f]">Noite</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task
