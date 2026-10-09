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
        default:
            return state
    }
}

type Actions = AddTodolistAction
    | RemoveTodolistAction