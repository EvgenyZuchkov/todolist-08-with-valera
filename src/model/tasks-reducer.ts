import {TasksState} from "../App.tsx";
import {AddTodolistAction} from "./todolists-reducer.ts";

const initialState: TasksState = {}

export const tasksReducer = (state = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            return {...state, [action.payload.id]: []}
        default:
            return state
    }
}

type Actions = AddTodolistAction