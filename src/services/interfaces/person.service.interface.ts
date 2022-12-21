import { Person } from '../../models/person.model';
import { PersonDto } from '../../models/types/person.dto.type';


/**
 * @interface Service
 *
 * Gestiona la lógica de negocio (operaciones) que se pueden hacer con las personas.
 */
export interface IPersonService {


    bindPersonListChanged(callback: Function):void;

    add(personDTO: PersonDto): void;

    edit(personToEdit: PersonDto):void;

    delete(_id: string):void;

    toggle(_id: string):void;

    /** GETTERS AND SETTERS **/

    getPeople(): Person[];

    setPeople(value: Person[]):void;

    getOnPersonListChanged(): Function | null;

    setOnPersonListChanged(value: Function | null):void;

}