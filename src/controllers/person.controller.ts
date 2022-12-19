import { Person } from '../models/person.model';
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

        // Display initial list o people
        this.onUserListChanged(this.personService.getPeople());

    }

    private onUserListChanged = (people: Person[]) => {
        this.personView.displayPeople(people);
    };
    
}