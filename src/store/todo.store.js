import { Todo } from "../todos/models/todo.model";

export const Filters = {
  All: 'all',
  Completed: 'Completed',
  Pending: 'Pending',
}

const state = {
  todos: [
    new Todo('Piedra del alma'),
    new Todo('Piedra del infinito'),
    new Todo('Piedra del tiempo'),
    new Todo('Piedra del poder'),
    new Todo('Piedra del realidad'),
  ],
  filter: Filters.All,
}

/**
 * Inicializa el store y muestra el estado actual en la consola.
 */
const initStore = () => {
  loadStore();
  console.log('InitStore 🥑');
};

/**
 * Carga el estado desde una fuente externa (no implementado).
 * @throws {Error} Si se llama a esta función, lanzará un error indicando que no está implementada.
 */
const loadStore = () => {
  if (!localStorage.getItem('state')) return;

  const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));

  state.todos = todos;
  state.filter = filter;

};

const saveStateToLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify(state));
}

/**
 * Obtiene las tareas filtradas según el filtro proporcionado.
 * @param {string} filter - El filtro a aplicar (por defecto es Filters.All).
 * @returns {Array} - Un array de tareas que cumplen con el filtro.
 */
const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];
    case Filters.Completed:
      return state.todos.filter(todo => todo.done);
    case Filters.Pending:
      return state.todos.filter(todo => !todo.done);
    default:
      throw new Error(`Option ${filter} is not valid.`);
  }
};

/**
 * Agrega una nueva tarea a la lista.
 * @param {string} description - La descripción de la nueva tarea.
 * @throws {Error} Si la descripción está vacía.
 */
const addTodo = (description) => {
  if (!description) throw new Error('Description is required');
  state.todos.push(new Todo(description));

  saveStateToLocalStorage();
};

/**
 * Cambia el estado de completado de una tarea específica (no implementado).
 * @param {string} todoId - El ID de la tarea a modificar.
 * @throws {Error} Si se llama a esta función, lanzará un error indicando que no está implementada.
 */
const toggleTodo = (todoId) => {
  state.todos = state.todos.map(todo => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }
    return todo;
  });
  saveStateToLocalStorage();

};

/**
 * Elimina una tarea específica de la lista.
 * @param {string} todoId - El ID de la tarea a eliminar.
 */
const deleteTodo = (todoId) => {
  state.todos = state.todos.filter(todo => todo.id !== todoId);
  saveStateToLocalStorage();
};

/**
 * Elimina todas las tareas completadas.
 */
const deleteCompleted = () => {
  state.todos = state.todos.filter(todo => !todo.done);
  saveStateToLocalStorage();
};

/**
 * Establece el filtro actual para las tareas.
 * @param {string} newFilter - El nuevo filtro a aplicar (por defecto es Filters.All).
 */
const setFilter = (newFilter = Filters.All) => {
  if (!Object.values(Filters).includes(newFilter)) {
    throw new Error(`Filter ${newFilter} is not valid.`);
  }
  state.filter = newFilter;
  saveStateToLocalStorage();
};

/**
 * Obtiene el filtro actual aplicado a las tareas.
 * @returns {string} - El filtro actual.
 */
const getCurrentFilter = () => {
  return state.filter;
};

export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
}