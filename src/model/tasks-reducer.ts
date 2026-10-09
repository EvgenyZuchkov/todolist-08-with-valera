import {TasksState} from "../App.tsx";
import {AddTodolistAction, RemoveTodolistAction} from "./todolists-reducer.ts";

const initialState: TasksState = {}

export const tasksReducer = (state = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            return {...state, [action.payload.id]: []}
        case 'REMOVE_TODOLIST':
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        case 'DELETE_TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        default:
            return state
    }
}

type Actions = AddTodolistAction
    | RemoveTodolistAction
    | DeleteTaskAction

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>

export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => {
    return {
        type: 'DELETE_TASK',
        payload,
    } as const
}