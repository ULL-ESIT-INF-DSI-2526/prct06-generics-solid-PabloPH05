/**
 * Interfaz que representa los entrenamientos que 
 * son registrables
 * 
 */
export interface Registrable<T> {
    /**
     * Información escriptiva del entrenamiento
     * @returns Objeto con infomación
     */
    summary(): T;
    /**
     * Calorias estimadas quemadas
     * @returns Number con las calorias
     */
    calories(): number;
}