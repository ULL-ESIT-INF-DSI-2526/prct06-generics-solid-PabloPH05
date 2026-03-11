import { Registrable } from "./registrable.js"

/**
 * Clase generica que almacena las actividades de un entrenamiento
 */
export class TraningLog<T extends Registrable<any>> {
    private colection: T[] = [];
    /**
     * Constructor de la clase TraningLog
     * @param initialActivities - Parametro rest con el numero de activiades iniciales
     */
    constructor(...initialActivities: T[]) {
        this.colection = initialActivities;
    }

    /**
     * Metodo para añadir una actividad a la colección
     * @param act - Elemento a añadir
     * 
     * Se comprueba que el elemento no esté ya en la coleccion
     */
    add(act: T): void {
        if (this.colection.indexOf(act) !== -1) {
            throw new Error ('Esta actividad ya está en la colección');
        }

        this.colection.push(act);
    }

    /**
     * Metodo para eliminar un elemento de la colección
     * @param act - Elemento a eliminar
     * 
     * Se comprueba que el elemento esté en la colección
     */
    remove(act: T): void {
        const index = this.colection.indexOf(act);
        if (index === -1) {
            throw new Error ('Esta actividad no está en la colección');
        }

        this.colection.splice(index,1);
    }
    
    /**
     * Metodo que devuelve el tamaño de la colección
     * @returns number con el tamaño de la coleccion
     */
    size(): number {
        return this.colection.length;
    }

    /**
     * Metodo para obtener el elemento de indice indicado
     * @param index - Indice a buscar
     * @returns El elemento en la posición `index`
     * 
     * Se comprueba que el indice sea adecuado [0, size - 1]
     */
    get(index: number): T {
        if (index >= this.size() || index < 0) {
            throw new Error ('Indice invalido')
        }

        return this.colection[index];
    }

    /**
     * Metodo para obtener la suma de las calorias totales de la colección
     * @returns number con las calorias totales.
     */
    totalBurn(): number {
        return this.colection.reduce((sum,item) => sum + item.calories(),0);
    }

}
