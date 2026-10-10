import {TasksState} from "../App.tsx";
import {AddTodolistAction, RemoveTodolistAction} from "./todolists-reducer.ts";
import {v1} from "uuid";
import {ac} from "vitest/dist/chunks/reporters.D7Jzd9GS";

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
            const todolistId = action.payload.todolistId
            return {
                ...state,
                [todolistId]: state[todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case 'CREATE_TASK': {
            const todolistId = action.payload.todolistId
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [todolistId]: [newTask, ...state[todolistId]]}
        }
        case 'CHANGE_TASK_STATUS': {
            const todolistId = action.payload.todolistId
            return {...state,
                [todolistId]: state[todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            }
        }
        default:
            return state
    }
}

type Actions = AddTodolistAction
    | RemoveTodolistAction
    | DeleteTaskAction
    | CreateTaskAction
    | ChangeTaskStatusAction

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>

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

export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload,
    } as const
}