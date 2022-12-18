import { Person } from '../models/person.model';
import { PersonService } from '../services/person.service';
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
     * @param userView vista
     * 
     */
    constructor(private personService: PersonService, private userView: PersonView) {

    }
}