import { Registrable } from "./registrable.js";

/**
 * Interfaz para representar la información que
 * se devuelve por la clase fuerza
 */
interface StrengthInfo {
    exerciseName: string,
    weigth: number
}

/**
 * Clase concreta Stregth que implementa la interfaz Registrable
 */
export class Strength implements Registrable<StrengthInfo> {
    /**
     * Constructor de la clase Stregth
     * @param _exerciseName - Nombre del ejercicio
     * @param _weigth - Peso total
     * @param _numSeries - numero de series
     * @param _numReps - Numero de repeticiones
     * @param _caloriesBySerie - Calorias por serie
     * 
     * Se comprueba que el nombre del ejercicio no esté vacio y
     * que ninguno de los atributos numericos sean 0 o negativos.
     */
    constructor(
        private readonly _exerciseName: string,
        private readonly _weigth: number,
        private readonly _numSeries: number,
        private readonly _numReps: number,
        private readonly _caloriesBySerie: number
    ) {
        if (!_exerciseName.trim()) {
            throw new Error ('El nombre del ejercicio debe no ser vacio');
        }

        if (_weigth <= 0 || _numSeries <= 0 || _numReps <= 0 || _caloriesBySerie <= 0) {
            throw new Error ('El peso, numero de series y repeteciones y las calorias deben ser mayores que 0');
        }
    }

    /**
     * Getter del nombre
     * @returns string con el nombre
     */
    get exerciseName(): string {return this._exerciseName};
    /**
     * Getter del peso
     * @returns number con el peso
     */
    get weigth(): number {return this._weigth};
    /**
     * Getter del numero de series
     * @returns number con el numero de series
     */
    get numSeries(): number {return this._numSeries};
    /**
     * Getter del numero de repeticiones
     * @returns number con el numero de repeticiones
     */
    get numReps(): number {return this._numReps};
    /**
     * Getter de las calorias por series
     * @returns number con las calorias
     */
    get caloriesBySerie(): number {return this._caloriesBySerie};

    /**
     * metodo que devuelve un objeto con un resumen del ejercicio
     * @returns objeto StrengthInfo con la información
     */
    summary(): StrengthInfo {
        return {
            exerciseName: this.exerciseName,
            weigth: this.weigth
        }
    }

    /**
     * Metodo que devuelve la calorias totales
     * numero de calorias * numero de series
     * @returns number con el total de calorias 
     */
    calories(): number {
        return this.caloriesBySerie * this.numSeries;
    }
}