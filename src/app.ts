import { PersonController } from './controllers/person.controller';
import { PersonService } from './services/person.service';
import { PersonView } from './views/person.view';

const app = new PersonController(new PersonService(), new PersonView());
