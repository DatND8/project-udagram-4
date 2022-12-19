import { TodosAccess } from './todosAcess'
// import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
// import * as createError from 'http-errors'
import { getUserId } from '../lambda/utils'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const todosAccess = new TodosAccess()

// TODO: Implement businessLogic
export const getAllTodos = async (event) => {
    const userId = getUserId(event)
    return await todosAccess.getTodos(userId)
}

export const createTodo = async (createTodoRequest: CreateTodoRequest, event: APIGatewayProxyEvent) => {
    const userId = getUserId(event)
    const itemId = uuid()

    const newTodo: TodoItem = {
        userId,
        todoId: itemId,
        createdAt: new Date().toISOString(),
        name: createTodoRequest.name,
        dueDate: createTodoRequest.dueDate,
        done: false
    }

    return await todosAccess.createTodo(newTodo)
}

export const updateTodo = async (updateTodoRequest: UpdateTodoRequest, todoId: string, event: APIGatewayProxyEvent) => {
    const userId = getUserId(event);
    await todosAccess.updateTodo(todoId, userId, updateTodoRequest)
}