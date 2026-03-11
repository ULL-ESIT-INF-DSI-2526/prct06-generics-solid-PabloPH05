import {describe, test, expect} from 'vitest'
import {TraningLog} from '../../src/ejercicio-practica/training_log'
import { Cardio } from '../../src/ejercicio-practica/cardio'
import { Strength } from '../../src/ejercicio-practica/strength'

describe ('Test para la clase geerica TraningLog', () => {

    const cardio1 = new Cardio('Carrera1', 45, 124, 'Carrera', 350);
    const cardio2 = new Cardio('Ciclismo1', 67, 70, 'Ciclismo', 230);
    const fuerza1 = new Strength('Press Banca', 50, 3, 12, 20);
    const fuerza2 = new Strength('Sentadilla', 80, 4, 8, 25);
    test('Se peude crear un log solo de cardios', () => {
        const log_cardio = new TraningLog<Cardio>(cardio1, cardio2);
        expect(log_cardio.size()).toEqual(2);
    })

    test('Se puede crear un log solo de stregth', () => {
        const log_fuerza = new TraningLog<Strength>(fuerza1,fuerza2);
        expect(log_fuerza.size()).toEqual(2);
    })

    test('Permite crear una coleccion de vambos tipos', () => {
        const log_varios = new TraningLog<Cardio|Strength>(cardio1,fuerza2);
        expect (log_varios.size()).toEqual(2);
    })

    
    describe('Test metodo add', () => {
        const log_varios = new TraningLog<Cardio|Strength>(cardio1,fuerza2);
        test('Funciona normal', () => {
            log_varios.add(cardio2);
            expect(log_varios.size()).toEqual(3);
            expect(log_varios.get(2)).toEqual(cardio2);
        })

        test('No permite añadir algo que ya estaba', () => {
            expect (() => {log_varios.add(cardio2)}).toThrow('Esta actividad ya está en la colección')
        })
    })

    describe('Test metodo remove', () => {
        const log_varios = new TraningLog<Cardio|Strength>(cardio1,fuerza2);
        test('Funciona normal', () => {
            log_varios.remove(cardio1);
            expect(log_varios.size()).toEqual(1);
        })

        test('No permite eliminar un elemento que no esta', () => {
            expect (() => {log_varios.remove(cardio2)}).toThrow('Esta actividad no está en la colección')
        })
    })

    describe('Test metodo size', () => {
        const log_varios = new TraningLog<Cardio|Strength>(cardio1,fuerza2);      
        test('Funciona normal', () => {
            expect(log_varios.size()).toEqual(2);
        })
    })

    describe('Test metodo get', () => {
        const log_varios = new TraningLog<Cardio|Strength>(cardio1,fuerza2);
        test('Funciona normal', () => {
            expect(log_varios.get(0)).toEqual(cardio1);
        })

        test('Da error si el indice no es valido', () => {
            expect(() => {log_varios.get(4)}).toThrow('Indice invalido');
        })
    })

    test('Test emetodo calorias' ,() => {
        const log_varios = new TraningLog<Cardio|Strength>(cardio1,fuerza2);
        expect(log_varios.totalBurn()).toEqual(450);
    })
})