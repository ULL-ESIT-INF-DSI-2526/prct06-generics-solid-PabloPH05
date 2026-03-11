import {describe, test, expect} from 'vitest'
import {Strength} from '../../src/ejercicio-practica/strength'

describe ('Test para la clase Stregth', () => {
    test('El objeto debe estar correctamente creado', () => {
        const fuerza1 = new Strength('Press Banca', 50, 3, 12, 20);
        expect (fuerza1.exerciseName).toEqual('Press Banca');
        expect (fuerza1.weigth).toEqual(50);
        expect (fuerza1.numReps).toEqual(12);
        expect (fuerza1.numSeries).toEqual(3);
        expect (fuerza1.caloriesBySerie).toEqual(20);
    });
    
    test('El nombre del ejercicio debe no estar vacio', () => {
        expect(() => {new Strength('', 50, 3, 12, 20)}).toThrow('El nombre del ejercicio debe no ser vacio')
    })

    test('El peso debe ser mayor que 0', () => {
        expect(() => {new Strength('Sentadilla', 0, 3, 12, 20)}).toThrow('El peso, numero de series y repeteciones y las calorias deben ser mayores que 0')
    })
    test('El numero de repeticiones debe ser mayor que 0', () => {
        expect(() => {new Strength('Sentadilla', 50, 3, 0, 20)}).toThrow('El peso, numero de series y repeteciones y las calorias deben ser mayores que 0')
    })
    test('El numero de series debe ser mayor que 0', () => {
        expect(() => {new Strength('Sentadilla', 23, 0, 12, 20)}).toThrow('El peso, numero de series y repeteciones y las calorias deben ser mayores que 0')
    })

    test('El metodo summary devuelve bien la informacion', () => {
        const fuerza1 = new Strength('Press Banca', 50, 3, 12, 20);
        expect(fuerza1.summary()).toEqual({exerciseName: 'Press Banca',weigth: 50})
    })

    test('El metodo calories calcula las calorias de manera adecuada', () => {
        const fuerza1 = new Strength('Press Banca', 50, 3, 12, 20);
        expect(fuerza1.calories()).toEqual(60)
    })
})