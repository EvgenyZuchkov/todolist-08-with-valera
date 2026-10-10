import {TasksState} from "../App.tsx";
import {AddTodolistAction, RemoveTodolistAction} from "./todolists-reducer.ts";
import {v1} from "uuid";

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
        case 'CREATE_TASK': {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        default:
            return state
    }
}

type Actions = AddTodolistAction
    | RemoveTodolistAction
    | DeleteTaskAction
    | CreateTaskAction

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>

export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => {
    return {
        type: 'DELETE_TASK',
        payload,
    } as const
}

export const createTaskAC = (payload: { todolistId: string, title: string }) => {
    return {
        type: 'CREATE_TASK',
        payload,
    } as const
}