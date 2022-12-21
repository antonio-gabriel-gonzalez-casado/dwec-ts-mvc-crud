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
        // Obtiene el contenedor raiz de la aplicación
        this.app = this.getElement('#person-management');
        // Obtiene el elemento formulario
        this.form = this.getElement('#form-add-person');
        // Obtiene el elemento Input-Text para el nombre
        this.inputName = this.getElement('#name');
        // Obtiene el elemento Input-Date para la fecha de nacimiento
        this.inputBirthday = this.getElement('#birthday');
        // Obtiene el botón de añadir persona btn-submit
        this.submitButton = this.getElement('#btn-submit');
        // Obtiene el contenedor donde se almacenarán las personas
        this.personList = this.getElement("#div-person-list");
    }
    /********************************************************************************************
     *  FUNCIONES GENÉRICAS RELACIONADAS CON LA MANIPULACIÓN DE LOS DATOS DE LA INTERFAZ (HTML) *
     ********************************************************************************************/
    /**
     * Creación de un Campo input con los datos pasados como parámetros
     * @param toInput
     * @returns {HTMLInputElement} devuele el elemento html input
     */
    createInput(toInput = {
        id: 'default',
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
    /**********************************************************************************
     *  FUNCIONES RELACIONADAS CON LA MANIPULACIÓN DEL HTML DE LA LISTA DE USUARIOS   *
     **********************************************************************************/
    /**
     * Resetea la lista de personas HTML para posteriormente ser regenerada
     */
    clearList() {
        var _a;
        // Borra todos los nodos
        while ((_a = this.personList) === null || _a === void 0 ? void 0 : _a.firstChild) {
            this.personList.removeChild(this.personList.firstChild);
        }
    }
    /**
     * Muestra un mensaje indicando que no hay personas en la lista
     */
    showEmptyListMessage() {
        var _a;
        const p = this.createElement('p');
        p.textContent = 'No hay personas! ¿Añadir una Persona?';
        (_a = this.personList) === null || _a === void 0 ? void 0 : _a.append(p);
    }
    /**
     * Crea un div que servida de contenedor para los datos de una persona
     * @param person persona a la que le corresponde el contenedor
     * @returns {HTMLElement} Devuelve el HTML asociado al contendor de la persona
     */
    createPersonContainer(person) {
        const row = this.createElement('div', 'row');
        row.classList.add("gy-2");
        row.id = person.getId();
        return row;
    }
    /**
     * Crea un HR con un estilo predefinido.
     * @returns {HTMLElement} Devuelve el HTML asociado al HR
     */
    addHrtoList() {
        const hr = this.createElement('hr', 'border');
        hr.classList.add("border-default", "border-1", "gy-1");
        return hr;
    }
    /**
     * Crea un input de type checkbox y le establece un valor por defect.
     * @param {boolean} toChecked valor booleano para poder determinar si hay que marcar el check o no
     * @returns {HTMLElement} Devuelve el HTML asociado al Checkbox
     */
    createCheckbox(toChecked) {
        const checkbox = this.createElement('input', 'form-check-input');
        checkbox.type = 'checkbox';
        // Complete contiene el valor boolean para determinar si se tiene que marcar o no el check
        checkbox.checked = toChecked;
        return checkbox;
    }
    /**
     * Tacha el texto pasado como parámetro
     * @param text texto al que se le dará el formato de tachado
     * @returns {HTMLElement} Devuelve el HTML asociado al texto tachado.
     */
    createStrikedText(text) {
        const strikeName = this.createElement('s');
        strikeName.textContent = text;
        return strikeName;
    }
    /**
     * Crea un campo input de tipo date con el valor pasado como parámetro
     * @param {string} id id de la persona para concatenarlo en el atributo id y name
     * @param {Date} value fecha de nacimiento para establecerla como valor
     * @returns {HTMLInputElement} Devuelve el HTML asociado al texto tachado.
     */
    createEditableInputDate(id, value) {
        const birthdayInput = {
            id: 'inputBirthday' + id,
            type: 'date',
            placeholder: 'default',
            name: 'birthday-' + id,
        };
        const inputBirthdayElement = this.createInput(birthdayInput);
        inputBirthdayElement.value = value === null || value === void 0 ? void 0 : value.toString();
        inputBirthdayElement.classList.add('form-control', 'editable');
        return inputBirthdayElement;
    }
    /**
     * Crear un elemento HTML de tipo botón especificamente para borrar personas
     */
    createDeleteButton() {
        const deleteButton = this.createElement('button', 'btn');
        deleteButton.classList.add("btn-danger", "delete");
        deleteButton.textContent = 'Borrar';
        return deleteButton;
    }
    /**
     * FUNCIÓN PRINCIPAL. Crea la tabla con la lista de personas
     * @param {Person[]} people Lista de personas para mostrar en la tabla.
     */
    displayPeople(people) {
        // En primer lugar se resetea la lista de personas.
        this.clearList();
        // Muestra el mensaje por defecto
        if (people.length === 0) {
            this.showEmptyListMessage();
        }
        else {
            // Crea los nodos de la lista para cada persona
            people.forEach(person => {
                var _a, _b;
                // Se crea un contenedor que engloba a cada persona cuatro columnas (1: checkbox, 2: nombre, 3: fecha de nacimiento, 4: botón borrar)
                // Se define el checkbox en la primera columna
                const checkbox = this.createCheckbox(person.getComplete());
                const colForCheckbox = this.createElement('div', 'col-1');
                colForCheckbox.append(checkbox);
                //Se define la segunda columna para el nombre de la persona
                const colName = this.createElement('div', 'col-4');
                //Se define la tercera columna para la fecha de nacimiento
                const colBirthday = this.createElement('div', 'col-4');
                if (person.getComplete()) {
                    //Si la persona tiene el atributo complete establecido a true entonces se creará una fila con el texto tachado y la fecha deshabilitada
                    const strikeName = this.createStrikedText(person.getName());
                    colName.append(strikeName);
                    const strikeBirthday = this.createStrikedText((_a = person.getBirthday()) === null || _a === void 0 ? void 0 : _a.toString());
                    colBirthday.append(strikeBirthday);
                }
                else {
                    //Si la persona tiene el atributo complete establecido a falso entonces se creará una fila con el texto y la fecha editable
                    colName.textContent = person.getName();
                    const inputBirthdayElement = this.createEditableInputDate(person.getId(), person.getBirthday());
                    colBirthday.append(inputBirthdayElement);
                }
                // Se define la cuarta columna para el botón de borrar
                const deleteButton = this.createDeleteButton();
                const colDeleteButton = this.createElement('div', 'col-3');
                colDeleteButton.append(deleteButton);
                //Se añaden las cuatro columnas al contenedor de la fila
                const row = this.createPersonContainer(person);
                row.append(colForCheckbox, colName, colBirthday, colDeleteButton);
                // Se crea un hr para separar las filas
                const hr = this.addHrtoList();
                // Se añade la fila y el separador
                (_b = this.personList) === null || _b === void 0 ? void 0 : _b.append(row, hr);
            });
        }
    }
    /**
     * Definición de atributos en métodos
     */
    get _nameText() {
        var _a;
        return (_a = this.inputName) === null || _a === void 0 ? void 0 : _a.value;
    }
    get _birthDayText() {
        var _a;
        return (_a = this.inputBirthday) === null || _a === void 0 ? void 0 : _a.value;
    }
    /**
     * Resetea los campos del formulario
     */
    _resetInput() {
        if (this.inputName != null)
            this.inputName.value = '';
        if (this.inputBirthday != null)
            this.inputBirthday.value = '';
    }
    /**********************************************************************************
     *  FUNCIONES RELACIONADAS CON EL CONTROL DE EVENTOS DE LA INTERFAZ               *
     **********************************************************************************/
    /**
     * Captura el evento submit del formulario para pasar los datos al controlador
     * @param handler
     */
    bindAddPerson(handler) {
        var _a;
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', event => {
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
        var _a;
        (_a = this.personList) === null || _a === void 0 ? void 0 : _a.addEventListener('change', event => {
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
        var _a;
        (_a = this.personList) === null || _a === void 0 ? void 0 : _a.addEventListener('click', event => {
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
        var _a;
        (_a = this.personList) === null || _a === void 0 ? void 0 : _a.addEventListener('change', event => {
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