import { Person } from '../../models/person.model';

/**
 * @interface Service
 *
 * Gestiona la lógica de negocio (operaciones) que se pueden hacer con las personas.
 */
export interface IPersonService {


    bindUserListChanged(callback: Function):void;

    /** GETTERS AND SETTERS **/

    getPeople(): Person[];

    setPeople(value: Person[]):void;

    getOnUserListChanged(): Function | null;

    setOnUserListChanged(value: Function | null):void;

}