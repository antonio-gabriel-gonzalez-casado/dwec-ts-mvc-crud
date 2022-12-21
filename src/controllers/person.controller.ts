import { Person } from '../models/person.model';
import { PersonDto } from '../models/types/person.dto.type';
import { IPersonService } from '../services/interfaces/person.service.interface';
import { PersonView } from '../views/person.view';

/**
 * @class Controller
 *
 * Realiza las comunicaciones entre la vista y el servicio
 *
 * @param model
 * @param view
 */
export class PersonController {

    /**
     * @constructor 
     * 
     * Constructor de la clase PersonController
     * 
     * @param personService servicio
     * @param personView vista
     * 
     */
    constructor(private personService: IPersonService, private personView: PersonView) {

        // Cuando haya un cambio en la lista la vuelve a pintar actualizada
        this.personService.bindPersonListChanged(this.onPersonListChanged);
        // Invoca al servicio de añadir personas
        this.personView.bindAddPerson(this.handleAddPerson);
        // Invoca al servicio de editar personas
        this.personView.bindEditPerson(this.handleEditPerson);
        // Invoca al servicio de eliminar personas
        this.personView.bindDeletePerson(this.handleDeletePerson);
        // Invoca al servicio para tachar a una persona
        this.personView.bindTogglePerson(this.handleTogglePerson);

        // Muestra la lista inicial de personas
        this.onPersonListChanged(this.personService.getPeople());

    }

    /**
     * Muestra en la vista la lista de personas que hay almacenadas 
     * @param people Lista de personas a mostrar
     */
    public onPersonListChanged = (people: Person[]) => {
        this.personView.displayPeople(people);
    };

    /**
     * Invoca al servicio de añadir una versona
     * @param personDto DTO con los datos procedentes de la vista
     */
    public handleAddPerson = (personDto: PersonDto) => {
        this.personService.add(personDto);
    };

    /**
     * Modifca los datos de una persona
     * @param person persona a editar
     */
    public handleEditPerson = (person: PersonDto) => {
        this.personService.edit(person);
    };

    /**
     * Eliminar a la persona de la lista
     * @param id ID de la persona a borrar
     */
    public handleDeletePerson = (id: string) => {
        this.personService.delete(id);
    };

    /**
     * Tacha a una persona de la lista
     * @param id ID de la persona a tachar
     */
    public handleTogglePerson = (id: string) => {
        this.personService.toggle(id);
    };

}