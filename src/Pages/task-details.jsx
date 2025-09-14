import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import { Arrow, ArrowLeft, LoaderIcon, TrashIcon } from "../assets/icons"
import Button from "../components/Button"
import Input from "../components/Input"
import Sidebar from "../components/Sidebar"
import TimeSelect from "../components/TimeSelect"

const TaskDetailsPage = () => {
    const { taskId } = useParams()
    const [task, setTask] = useState()
    const navigate = useNavigate()
    const [saveIsLoading, setSaveIsLoading] = useState(false)
    const [errors, setErrors] = useState([])

    const titleRef = useRef()
    const descriptionRef = useRef()
    const timeRef = useRef()

    const handleBackClick = () => {
        navigate(-1)
    }

    useEffect(() => {
        const fetchTask = async () => {
            const response = await fetch(
                `http://localhost:3000/tasks/${taskId}`,
                {
                    method: "GET",
                }
            )
            const data = await response.json()
            setTask(data)
        }
        fetchTask()
    }, [taskId])

    const handleSaveClick = async () => {
        setSaveIsLoading(true)
        const newErros = []

        const title = titleRef.current.value
        const description = descriptionRef.current.value
        const time = timeRef.current.value

        if (!title.trim()) {
            newErros.push({
                inputName: "title",
                message: "O título é obrigatorio!",
            })
        }

        if (!time.trim()) {
            newErros.push({
                inputName: "time",
                message: "O horário é obrigatorio!",
            })
        }

        if (!description.trim()) {
            newErros.push({
                inputName: "description",
                message: "A descrição é obrigatorio!",
            })
        }

        setErrors(newErros)

        if (newErros.length > 0) {
            return setSaveIsLoading(false)
        }

        const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                title,
                description,
                time,
            }),
        })

        if (!response.ok) {
            toast.error("Ocorreu um erro ao salvar a tarefa.")
            return setSaveIsLoading(false)
        }

        const newTask = await response.json()
        setTask(newTask)
        setSaveIsLoading(false)
        toast.success("Tarefa salva com sucesso!")
    }

    const titleError = errors.find((error) => error.inputName === "title")
    const timeError = errors.find((error) => error.inputName === "time")
    const descriptionError = errors.find(
        (error) => error.inputName === "description"
    )

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full space-y-6 px-8 py-16">
                <div className="flex w-full justify-between">
                    <div>
                        <button
                            onClick={handleBackClick}
                            className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
                        >
                            <ArrowLeft />
                        </button>
                        <div className="flex items-center gap-1 text-xs">
                            <Link
                                className="cursor-pointer text-brand-text-gray"
                                to="/"
                            >
                                Minhas tarefas
                            </Link>
                            <Arrow className="text-brand-text-gray" />
                            <span className="font-semibold text-brand-primary">
                                {task?.title}
                            </span>
                        </div>
                        <h1 className="mt-6 text-xl font-semibold">
                            {task?.title}
                        </h1>
                    </div>

                    <Button className="h-fit self-end" color="danger">
                        <TrashIcon />
                        Deletar Tarefa
                    </Button>
                </div>

                <div className="space-y-6 rounded-xl bg-brand-white p-6">
                    <div>
                        <Input
                            id="title"
                            label="Nome"
                            defaultValue={task?.title}
                            errorMessage={titleError?.message}
                            ref={titleRef}
                        />
                    </div>

                    <div>
                        <TimeSelect
                            label="Time"
                            defaultValue={task?.time}
                            errorMessage={timeError?.message}
                            ref={timeRef}
                        />
                    </div>

                    <div>
                        <Input
                            id="description"
                            label="Descrição"
                            defaultValue={task?.description}
                            errorMessage={descriptionError?.message}
                            ref={descriptionRef}
                        />
                    </div>
                </div>

                <div className="w-ful flex justify-end gap-3">
                    <Button
                        size="large"
                        color="primary"
                        onClick={handleSaveClick}
                        disabled={saveIsLoading}
                    >
                        {saveIsLoading && (
                            <LoaderIcon className="animate-spin" />
                        )}
                        Salvar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TaskDetailsPage
