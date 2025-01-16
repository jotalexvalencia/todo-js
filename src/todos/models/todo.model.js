import { v4 as uuid } from 'uuid';

/**
 * Representa una tarea en la lista de tareas.
 */
export class Todo {

    /**
     * Crea una nueva instancia de la tarea.
     * 
     * @param {string} description - La descripción de la tarea.
     */
    constructor(description) {
        this.id = uuid(); // Identificador único de la tarea (se puede modificar para ser único).
        this.description = description; // Descripción de la tarea.
        this.done = false; // Estado de la tarea, por defecto es false (no completada).
        this.createdAt = new Date(); // Fecha de creación de la tarea.
    }
}