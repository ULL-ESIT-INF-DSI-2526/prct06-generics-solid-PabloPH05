import { Registrable } from "./registrable.js";

/**
 * Tipo que define la union de tipos de los string que definen 
 * los tipos de actividades
 */
export type ActivityTypes =
    'Carrera'|
    'Natacion'|
    'Ciclismo';

/**
 * Clase concreta Cardio que implementa la interfaz Registrable
 */
export class Cardio implements Registrable<string> {
    /**
     * Constructor de la clase Cardio
     * @param _activityName - Nombre de la actividad
     * @param _distanceKm - Distancia recorrida en kilometros
     * @param _duration - Duracion de la actividad en minutos
     * @param _activityType - Tipo de actividad ('Carrera', 'Natacion' o 'Ciclismo')
     * @param _calories - Calorias quemadas totales
     * Se comprueba que el nombre de la actividad no esté vacio y que la duración
     * y la distancia no sean inforiores a 0.
     */
    constructor(
        private readonly _activityName: string,
        private readonly _distanceKm: number,
        private readonly _duration: number,
        private readonly _activityType: ActivityTypes,
        private readonly _calories: number
    ) {
        if (!_activityName.trim()) {
            throw new Error ('El nombre de la actividad no puede ser vacio');
        }

        if (_distanceKm < 0 || _duration < 0) {
            throw new Error ('La distancia y duracion deben ser positivas');
        }
    }

    /**
     * Getter del nombre
     * @returns string con el nombre
     */
    get activityName(): string {return this._activityName};
    /**
     * Getter de la distancia
     * @returns number con la distancia en kilometros
     */
    get distanceKm(): number {return this._distanceKm};
    /**
     * Getter de la duración
     * @returns number con la duracion en minutos
     */
    get duration(): number {return this._duration};
    /**
     * Getter del tipo de actividad
     * @returns string de la unión con el tipo
     */
    get activityType(): ActivityTypes {return this._activityType};

    /**
     * Metodo que devuelve un resumen (nombre y distancia)
     * de la actividad
     * @returns string con el nombre de la activiadad
     * @example 'Carrera1 - 45 km'
     */
    summary(): string {
        return `${this._activityName} - ${this.distanceKm} km`;
    }

    /**
     * Metodo para devolver las calorias de la actividad,
     * actua a su vez como getter del atributo `_calories`
     * @returns number con el numero de calorias
     */
    calories(): number {
        return this._calories
    }
}