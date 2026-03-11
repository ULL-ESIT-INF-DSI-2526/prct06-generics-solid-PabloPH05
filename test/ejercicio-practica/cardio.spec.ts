import {describe, test, expect} from 'vitest'
import {Cardio} from '../../src/ejercicio-practica/cardio'

describe ('Test para la clase Cardio', () => {
    test('El objeto debe estar correctamente creado', () => {
        const cardio1 = new Cardio('Carrera1', 45, 124, 'Carrera', 350);
        expect(cardio1.activityName).toEqual('Carrera1');
        expect(cardio1.activityType).toEqual('Carrera');
        expect(cardio1.duration).toEqual(124);
        expect(cardio1.distanceKm).toEqual(45);
        expect(cardio1.calories()).toEqual(350);
    });

    test('El nombre de la actividad debe no estar vacio', () => {
        expect (() => {new Cardio('',23,123,'Carrera',120)}).toThrow('El nombre de la actividad no puede ser vacio')
    })

    test('La distancia de la actividad debe ser positiva', () => {
        expect (() => {new Cardio('Carrera1',-23,123,'Carrera',120)}).toThrow('La distancia y duracion deben ser positivas')
    })

    test('La duracion de la actividad debe ser positiva', () => {
        expect (() => {new Cardio('Carrera1',23,-123,'Carrera',120)}).toThrow('La distancia y duracion deben ser positivas')
    })

    test('El metodo summary devuelve bien la informacion', () => {
        const cardio1 = new Cardio('Carrera1', 45, 124, 'Carrera', 350);
        expect(cardio1.summary()).toEqual('Carrera1 - 45 km')
    })
})