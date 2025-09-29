import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys } from "../../keys/mutations"
import { taskQueryKeys } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useDeleteTask = (taskId) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: taskMutationKeys.delete(),
        mutationFn: async () => {
            const { data: deleteTask } = await api.delete(
                `/tasks/${taskId}`,
                taskId
            )
            return deleteTask
        },
        onSuccess: (deleteTask) => {
            queryClient.setQueryData(taskQueryKeys.getAll(), (currentTasks) => {
                return currentTasks.filter(
                    (oldtask) => oldtask.id !== deleteTask.id
                )
            })
        },
    })
}
