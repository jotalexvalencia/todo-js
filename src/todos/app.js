/**
 * Importa el contenido HTML de la aplicación y maneja la lógica para renderizar la lista de tareas.
 * 
 * @module App
 */

import html from './app.html?raw'; // Importa el contenido HTML como texto sin procesar.
import todoStore, { Filters } from '../store/todo.store'; // Importa el store que maneja el estado de las tareas.
import { renderTodos, renderPending } from './use-cases'; // Importa la función para renderizar la lista de tareas.

const ElementIDs = {
  ClearCompletedButton: '.clear-completed', // Selector para el botón de eliminar tareas completadas.
  TodoList: '.todo-list', // Selector para el contenedor de la lista de tareas.
  NewTodoInput: '#new-todo-input', //
  TodoFilters: '.filtro', //
  PendingCountLabel: '#pending-count', //
};

/**
 * Inicializa la aplicación de tareas y renderiza el contenido en el DOM.
 *
 * @param {string} elementId - El selector del elemento HTML donde se insertará la aplicación.
 *                             Puede ser un ID (por ejemplo, "#app") o cualquier selector válido de CSS.
 * 
 * @example
 * // Llamar a la función App de esta manera:
 * App('#app');
 */
export const App = (elementId) => {

  /**
   * Obtiene las tareas del store y las renderiza en el DOM.
   */
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIDs.TodoList, todos);
    updatePendingCount();
  };

  const updatePendingCount = () => {
    renderPending(ElementIDs.PendingCountLabel);
  };

  // Cuando la función App() se llama
  (() => {
    // Crear un nuevo elemento <div>
    const app = document.createElement('div');

    // Establecer el contenido HTML del nuevo elemento
    app.innerHTML = html; // Aquí se inyecta el contenido HTML importado

    // Buscar el elemento en el DOM con el selector proporcionado y agregar el nuevo <div>
    document.querySelector(elementId).append(app);
    displayTodos(); // Renderiza las tareas en el DOM
  })();

  //? Referencias HTML
  const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
  const todoListUL = document.querySelector(ElementIDs.TodoList);
  const clearCompletedButtonButton = document.querySelector(ElementIDs.ClearCompletedButton);
  const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);

  //? Listeners
  newDescriptionInput.addEventListener('keyup', (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = '';
  });

  todoListUL.addEventListener('click', (event) => {
    const element = event.target.closest('[data-id]');
    todoStore.toggleTodo(element.getAttribute('data-id'));
    displayTodos();
  });

  todoListUL.addEventListener('click', (event) => {
    const isDestroyElement = event.target.className === 'destroy';
    const element = event.target.closest('[data-id]');
    if (!element || !isDestroyElement) return;

    todoStore.deleteTodo(element.getAttribute('data-id'));
    displayTodos();
  });

  clearCompletedButtonButton.addEventListener('click', () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  filtersLIs.forEach(element => {
    element.addEventListener('click', (element) => {
      filtersLIs.forEach(el => el.classList.remove('selected'));
      element.target.classList.add('selected');

      switch (element.target.text) {
        case 'Todos':
          todoStore.setFilter(Filters.All);
          break;
        case 'Pendientes':
          todoStore.setFilter(Filters.Pending);
          break;
        case 'Completados':
          todoStore.setFilter(Filters.Completed);
          break;
      }
      displayTodos();
    });
  });


};