import {FilterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";

const initialState: Todolist[] = []

type Actions = RemoveTodolistAction
    | AddTodolistAction
    | ChangeTodolistTitleAction
    | ChangeTodolistFilterAction

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'ADD_TODOLIST': {
            const newTodolist: Todolist = {id: v1(), title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'CHANGE_TODOLIST': {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case 'CHANGE_FILTER': {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state
    }
}

export type RemoveTodolistAction = ReturnType<typeof removeTodolistAC>
export type AddTodolistAction = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>


export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id
        }
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {id: v1(), title}
    } as const
}

export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
    return {
        type: 'CHANGE_TODOLIST',
        payload
    } as const
}

export const changeTodolistFilterAC = (payload: { id: string, filter: FilterValues }) => {
    return {
        type: 'CHANGE_FILTER',
        payload
    } as const
}

