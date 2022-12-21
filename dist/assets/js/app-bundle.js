/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./controllers/person.controller.ts":
/*!******************************************!*\
  !*** ./controllers/person.controller.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonController = void 0;
/**
 * @class Controller
 *
 * Realiza las comunicaciones entre la vista y el servicio
 *
 * @param model
 * @param view
 */
class PersonController {
    /**
     * @constructor
     *
     * Constructor de la clase PersonController
     *
     * @param personService servicio
     * @param personView vista
     *
     */
    constructor(personService, personView) {
        this.personService = personService;
        this.personView = personView;
        /**
         * Muestra en la vista la lista de personas que hay almacenadas
         * @param people Lista de personas a mostrar
         */
        this.onPersonListChanged = (people) => {
            this.personView.displayPeople(people);
        };
        /**
         * Invoca al servicio de añadir una versona
         * @param personDto DTO con los datos procedentes de la vista
         */
        this.handleAddPerson = (personDto) => {
            this.personService.add(personDto);
        };
        /**
         * Modifca los datos de una persona
         * @param person persona a editar
         */
        this.handleEditPerson = (person) => {
            this.personService.edit(person);
        };
        /**
         * Eliminar a la persona de la lista
         * @param id ID de la persona a borrar
         */
        this.handleDeletePerson = (id) => {
            this.personService.delete(id);
        };
        /**
         * Tacha a una persona de la lista
         * @param id ID de la persona a tachar
         */
        this.handleTogglePerson = (id) => {
            this.personService.toggle(id);
        };
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
}
exports.PersonController = PersonController;


/***/ }),

/***/ "./models/person.model.ts":
/*!********************************!*\
  !*** ./models/person.model.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Person = void 0;
/**
 * @class Model
 *
 * Entidad persona. Almacena los datos de una persona
 */
class Person {
    /**
     * @constructor
     * Inicializa los datos de una persona a través de su DTO
     * @param personDto
     */
    constructor(personDto) {
        var _a;
        this._id = (_a = personDto._id) !== null && _a !== void 0 ? _a : this.uuidv4();
        //this._id = this.uuidv4();
        this._name = personDto._name;
        this._birthday = personDto._birthday;
        this._complete = personDto._complete;
    }
    /**
    * @private
    * Genera una cadena aleatoria que sirve como id de la entidad
    * @param string cadena aleatoria autogenerada
    */
    uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
    }
    /** GETTERS AND SETTERS **/
    getId() {
        return this._id;
    }
    setId(value) {
        this._id = value;
    }
    getName() {
        return this._name;
    }
    setName(value) {
        this._name = value;
    }
    getBirthday() {
        return this._birthday;
    }
    setBirthday(value) {
        this._birthday = value;
    }
    getComplete() {
        return this._complete;
    }
    setComplete(value) {
        this._complete = value;
    }
}
exports.Person = Person;


/***/ }),

/***/ "./services/person.service.ts":
/*!************************************!*\
  !*** ./services/person.service.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonService = void 0;
const person_model_1 = __webpack_require__(/*! ../models/person.model */ "./models/person.model.ts");
/**
 * @class Service
 *
 * Gestiona la lógica de negocio (operaciones) que se pueden hacer con las personas.
 */
class PersonService {
    /**
     * @constructor
     *
     * Constructor de la clase PersonService
     * Se inicializa recuperando todas las personas que están almacenadas en el local storage
     */
    constructor() {
        let peopleJSON = localStorage.getItem('people');
        //Comprueba si es null (con nullable ??) y si lo es entonces le asigna cadena vacía
        peopleJSON = peopleJSON !== null && peopleJSON !== void 0 ? peopleJSON : "";
        let peopleStored = [];
        if (peopleJSON != "") {
            peopleStored = JSON.parse(peopleJSON);
        }
        this._people = peopleStored.map(person => new person_model_1.Person(person));
        // Inciialización a una función vacía.
        this._onPersonListChanged = () => { };
    }
    /**
     *
     * @param callback
     */
    bindPersonListChanged(callback) {
        this._onPersonListChanged = callback;
    }
    /**
     * Persiste en el local storage una lista de personas
     * @param people lista de personas a persistir en el local storage
     */
    _commit(people) {
        this._onPersonListChanged(people);
        localStorage.setItem('people', JSON.stringify(people));
    }
    /**
     * Transforma el DTO a Persona y lo añadie a la lista de personas, posteriormente invoca al método para persistir la información
     * @param personDTO DTO con los datos de la persona a persiste
     */
    add(personDTO) {
        const person = new person_model_1.Person(personDTO);
        this._people.push(person);
        this._commit(this._people);
    }
    /**
     * Busca a la persona que se va a editar por id y actualiza la fecha de nacimiento
     * @param personToEdit datos modificados para editar
     */
    edit(personToEdit) {
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
    delete(_id) {
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
    toggle(_id) {
        this._people = this._people.map(person => {
            if (person.getId() === _id) {
                person.setComplete(!person.getComplete());
            }
            return person;
        });
        this._commit(this._people);
    }
    /** GETTERS AND SETTERS **/
    getPeople() {
        return this._people;
    }
    setPeople(value) {
        this._people = value;
    }
    getOnPersonListChanged() {
        return this._onPersonListChanged;
    }
    setOnPersonListChanged(value) {
        this._onPersonListChanged = value;
    }
}
exports.PersonService = PersonService;


/***/ }),

/***/ "./views/person.view.ts":
/*!******************************!*\
  !*** ./views/person.view.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonView = void 0;
/**
 * @class View
 *
 * Gestiona las operaciones relacionadas con la visualización y captura de datos.
 */
class PersonView {
    /**
     * @constructor
     *
     * Constructor de la clase PersonView
     */
    constructor() {
        var _a;
        // Obtiene el contenedor raiz de la aplicación
        this.app = this.getElement('#person-management');
        // Crea un elemento de tipo forumalrio
        this.form = this.createElement('form');
        // Inicialización de input para el nombre y se añade a una columna
        this.inputName = this.createInput({
            key: 'inputName',
            type: 'text',
            placeholder: 'Nombre',
            name: 'name'
        });
        this.inputName.classList.add("form-control");
        const colForInputName = this.createElement("div", "col-4");
        colForInputName.append(this.inputName);
        // Inicialización de input para la fecha de nacimiento
        this.inputBirthday = this.createInput({
            key: 'inputBirthday',
            type: 'date',
            placeholder: 'Fecha de Nacimiento',
            name: 'birthday'
        });
        this.inputBirthday.classList.add("form-control");
        const colForInputBirthday = this.createElement("div", "col-4");
        colForInputBirthday.append(this.inputBirthday);
        // Inicialización de botón del formulario
        this.submitButton = this.createElement('button', 'btn');
        this.submitButton.textContent = 'Envíar';
        this.submitButton.classList.add("btn-primary");
        const colForSubmitButton = this.createElement("div", "col-3");
        colForSubmitButton.append(this.submitButton);
        //Se crea una columna vacía para conseguir 4 columnas y que el formulario quede alineado con las columnas de la tabla
        const colEmpty = this.createElement("div", "col-1");
        // Se añade al formulario los campos y el botón
        this.form.classList.add("row");
        this.form.append(colEmpty, colForInputName, colForInputBirthday, colForSubmitButton);
        this.title = this.createElement('h1');
        this.title.textContent = 'Personas';
        this.personList = this.createElement('div', 'person-list');
        this.personList.classList.add("row");
        // hr de separación entre el formulario y la lista
        const hr = this.createElement('hr', 'border');
        hr.classList.add("border-primary", "border-2", "gy-3");
        // Uso de optinal chaining para prevenir el null de app
        (_a = this.app) === null || _a === void 0 ? void 0 : _a.append(this.title, this.form, hr, this.personList);
    }
    /**
     * Creación de un Campo input con los datos pasados como parámetros
     * @param toInput
     * @returns {HTMLInputElement} devuele el elemento html input
     */
    createInput(toInput = {
        key: 'default',
        type: 'text',
        placeholder: 'default',
        name: '_default'
    }) {
        let inputName = this.createElement('input');
        inputName.type = toInput.type;
        inputName.placeholder = toInput.placeholder;
        inputName.name = toInput.name;
        return inputName;
    }
    /**
     * Devuelve el elemento html del selector pasado como parámetro
     * @param selector
     * @returns  HTMLElement | null Devuelve el html del elemento o null en caso de que no exista
     */
    getElement(selector) {
        return document.querySelector(selector);
    }
    /**
     * Crea un elemento HTML con el tag y la clase pasada como parámetro
     * @param tag
     * @param className
     * @returns HTMLElement Devuelve el HTML creado
     */
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className)
            element.classList.add(className);
        return element;
    }
    /**
     * Crea la tabla con la lista de personas
     * @param people
     */
    displayPeople(people) {
        // Borra todos los nodos
        while (this.personList.firstChild) {
            this.personList.removeChild(this.personList.firstChild);
        }
        // Muestra el mensaje por defecto
        if (people.length === 0) {
            const p = this.createElement('p');
            p.textContent = 'No hay personas! ¿Añadir una Persona?';
            this.personList.append(p);
        }
        else {
            // Crea los nodos
            people.forEach(person => {
                var _a, _b;
                // Se crea un contenedor generar para cada perosna con cuatro columnas
                const row = this.createElement('div', 'row');
                row.classList.add("gy-2");
                row.id = person.getId();
                // Se define el checkbox en la primera columna
                const checkbox = this.createElement('input', 'form-check-input');
                checkbox.type = 'checkbox';
                checkbox.checked = person.getComplete();
                const colForCheckbox = this.createElement('div', 'col-1');
                colForCheckbox.append(checkbox);
                //Se define la segunda columna para el nombre de la persona
                const colName = this.createElement('div', 'col-4');
                //Se define la tercera columna para la fecha de nacimiento
                const colBirthday = this.createElement('div', 'col-4');
                if (person.getComplete()) {
                    const strikeName = this.createElement('s');
                    strikeName.textContent = person.getName();
                    colName.append(strikeName);
                    const strikeBirthday = this.createElement('s');
                    strikeBirthday.textContent = (_a = person.getBirthday()) === null || _a === void 0 ? void 0 : _a.toString();
                    colBirthday.append(strikeBirthday);
                }
                else {
                    colName.textContent = person.getName();
                    const inputBirthday = this.createElement('input', "form-control");
                    inputBirthday.type = 'date';
                    inputBirthday.value = (_b = person.getBirthday()) === null || _b === void 0 ? void 0 : _b.toString();
                    inputBirthday.classList.add('editable');
                    colBirthday.append(inputBirthday);
                }
                // Se define la cuarta columna para el botón de borrar
                const deleteButton = this.createElement('button', 'btn');
                deleteButton.classList.add("btn-danger", "delete");
                deleteButton.textContent = 'Borrar';
                const colDeleteButton = this.createElement('div', 'col-3');
                colDeleteButton.append(deleteButton);
                //Se añaden las cuatro columnas al contenedor de la fila
                row.append(colForCheckbox, colName, colBirthday, colDeleteButton);
                // Se añanden las filas separadas por hr
                const hr = this.createElement('hr', 'border');
                hr.classList.add("border-default", "border-1", "gy-1");
                this.personList.append(row, hr);
            });
        }
    }
    /**
     * Definición de atributos en métodos
     */
    get _nameText() {
        return this.inputName.value;
    }
    get _birthDayText() {
        return this.inputBirthday.value;
    }
    /**
     * Resetea los campos del formulario
     */
    _resetInput() {
        this.inputName.value = '';
        this.inputBirthday.value = '';
    }
    /**
     * Captura el evento submit del formulario para pasar los datos al controlador
     * @param handler
     */
    bindAddPerson(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            if (this._nameText) {
                // ES IMPORTANTE QUE LOS ATRIBUTOS COINCIDAN CON LOS DEL DTO, ES DECIR CON EL _ DE PREFIJO
                handler({
                    _name: this._nameText,
                    _birthday: this._birthDayText
                });
                this._resetInput();
            }
        });
    }
    /**
     * Captura el evento para editar a una persona
     * @param handler
     */
    bindEditPerson(handler) {
        this.personList.addEventListener('change', event => {
            const element = event.target;
            if (element.type === "date") {
                handler({
                    _id: element.parentElement.parentElement.id,
                    _birthday: element.value.toString()
                });
            }
        });
    }
    /**
     * Captura el evento para borrar una persona
     * @param handler
     */
    bindDeletePerson(handler) {
        this.personList.addEventListener('click', event => {
            if (event.target.className.includes('delete')) {
                const id = event.target.parentElement.parentElement.id;
                handler(id);
            }
        });
    }
    /**
     * Captura el evento para tachar a una persona
     * @param handler
     */
    bindTogglePerson(handler) {
        this.personList.addEventListener('change', event => {
            if (event.target.type === 'checkbox') {
                const id = event.target.parentElement.parentElement.id;
                handler(id);
            }
        });
    }
}
exports.PersonView = PersonView;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!****************!*\
  !*** ./app.ts ***!
  \****************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const person_controller_1 = __webpack_require__(/*! ./controllers/person.controller */ "./controllers/person.controller.ts");
const person_service_1 = __webpack_require__(/*! ./services/person.service */ "./services/person.service.ts");
const person_view_1 = __webpack_require__(/*! ./views/person.view */ "./views/person.view.ts");
const app = new person_controller_1.PersonController(new person_service_1.PersonService(), new person_view_1.PersonView());

})();

/******/ })()
;
//# sourceMappingURL=app-bundle.js.map