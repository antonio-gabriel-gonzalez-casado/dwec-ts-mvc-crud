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
    private _onPersonListChanged: Function;

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
        // Inciialización a una función vacía.
        this._onPersonListChanged = () => { };
    }

    /**
     * 
     * @param callback 
     */
    public bindPersonListChanged(callback: Function): void {
        this._onPersonListChanged = callback;
    }

    /**
     * Persiste en el local storage una lista de personas
     * @param people lista de personas a persistir en el local storage
     */
    private _commit(people: Person[]): void {
        this._onPersonListChanged(people);
        localStorage.setItem('people', JSON.stringify(people));
    }

    /**
     * Transforma el DTO a Persona y lo añadie a la lista de personas, posteriormente invoca al método para persistir la información
     * @param personDTO DTO con los datos de la persona a persiste
     */
    public add(personDTO: PersonDto): void {
        const person: Person = new Person(personDTO);
        this._people.push(person);
        this._commit(this._people);
    }

    /**
     * Busca a la persona que se va a editar por id y actualiza la fecha de nacimiento
     * @param personToEdit datos modificados para editar
     */
    public edit(personToEdit: PersonDto): void {
        this._people = this._people.map(person => {
            if (person.getId() === personToEdit._id) {
                person.setBirthday(personToEdit._birthday);
            }
            return person;
        });
        this._commit(this._people);
    }

    /**
     * Buscar a la persona que se va a elminar por id y la elmina de la lista
     * @param _id id de la persona a elminar
     */
    public delete(_id: string): void {
        this._people = this._people.filter(person => {
            if (person.getId() !== _id) {
                return true;
            }
            return false;
        });
        this._commit(this._people);
    }

     /**
     * Buscar a la persona que se va a tachar o quitar el tachado y se cambia el valor de complete
     * @param _id id de la persona a tachar
     */
    public toggle(_id: string): void {
        this._people = this._people.map(person => {
            if (person.getId() === _id) {
                person.setComplete(!person.getComplete());
            }
            return person;
        });
        this._commit(this._people);
    }

    /** GETTERS AND SETTERS **/

    public getPeople(): Person[] {
        return this._people;
    }
    public setPeople(value: Person[]): void {
        this._people = value;
    }

    public getOnPersonListChanged(): Function {
        return this._onPersonListChanged;
    }
    public setOnPersonListChanged(value: Function): void {
        this._onPersonListChanged = value;
    }

}