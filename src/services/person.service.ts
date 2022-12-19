import { Person } from '../models/person.model';
import { PersonDto } from '../models/types/person.dto.type';
import { IPersonService } from './interfaces/person.service.interface';

/**
 * @class Service
 *
 * Gestiona la lógica de negocio (operaciones) que se pueden hacer con las personas.
 */
export class PersonService implements IPersonService {

    private _people: Person[];
    private _onUserListChanged: Function | null;

    /**
     * @constructor 
     * 
     * Constructor de la clase PersonService
     * Se inicializa recuperando todas las personas que están almacenadas en el local storage 
     */
    constructor() {
        let peopleJSON: string | null = localStorage.getItem('people');
        //Comprueba si es null (con nullable ??) y si lo es entonces le asigna cadena vacía
        peopleJSON = peopleJSON ?? "";
        let peopleStored: PersonDto[] = [];
        if (peopleJSON != "") {
            peopleStored = JSON.parse(peopleJSON);
        }
        this._people = peopleStored.map(person => new Person(person));
        this._onUserListChanged = null;
    }

    /**
     * 
     * @param callback 
     */
    public bindUserListChanged(callback: Function): void {
        this._onUserListChanged = callback;
    }

    /** GETTERS AND SETTERS **/

    public getPeople(): Person[] {
        return this._people;
    }
    public setPeople(value: Person[]): void {
        this._people = value;
    }

    public getOnUserListChanged(): Function | null {
        return this._onUserListChanged;
    }
    public setOnUserListChanged(value: Function | null): void {
        this._onUserListChanged = value;
    }

}