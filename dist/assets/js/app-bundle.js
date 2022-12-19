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
        this.onUserListChanged = (people) => {
            this.personView.displayPeople(people);
        };
        // Display initial list o people
        this.onUserListChanged(this.personService.getPeople());
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
        this._id = this.uuidv4();
        this._name = personDto.name;
        this._birthday = personDto.birthday;
        this._complete = personDto.complete;
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
        this._onUserListChanged = null;
    }
    /**
     *
     * @param callback
     */
    bindUserListChanged(callback) {
        this._onUserListChanged = callback;
    }
    /** GETTERS AND SETTERS **/
    getPeople() {
        return this._people;
    }
    setPeople(value) {
        this._people = value;
    }
    getOnUserListChanged() {
        return this._onUserListChanged;
    }
    setOnUserListChanged(value) {
        this._onUserListChanged = value;
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
        // Inicialización de input para el nombre
        this.inputName = this.createInput({
            key: 'inputName',
            type: 'text',
            placeholder: 'Nombre',
            name: 'name'
        });
        // Inicialización de input para la fecha de nacimiento
        this.inputBirthday = this.createInput({
            key: 'inputBirthday',
            type: 'date',
            placeholder: 'Fecha de Nacimiento',
            name: 'birthday'
        });
        // Inicialización de botón del formulario
        this.submitButton = this.createElement('button');
        this.submitButton.textContent = 'Submit';
        // Se añade al formulario los campos y el botón
        this.form.append(this.inputName, this.inputBirthday, this.submitButton);
        this.title = this.createElement('h1');
        this.title.textContent = 'Personas';
        this.personList = this.createElement('ul', 'person-list');
        // Uso de optinal chaining para prevenir el null de app
        (_a = this.app) === null || _a === void 0 ? void 0 : _a.append(this.title, this.form, this.personList);
        this._temporaryBirthdayText = '';
        this._initLocalListeners();
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
        name: 'default'
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
     * Inicializa los listeners
     */
    _initLocalListeners() {
        this.personList.addEventListener('input', event => {
            if (event.target.className === 'editable') {
                this._temporaryBirthdayText = event.target.innerText;
            }
        });
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
            p.textContent = 'Nada que hacer! ¿Añadir una Persona?';
            this.personList.append(p);
        }
        else {
            // Crea los nodos
            people.forEach(person => {
                const li = this.createElement('li');
                li.id = person.getId();
                const checkbox = this.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = person.getComplete();
                const spanUser = this.createElement('span');
                const spanAge = this.createElement('span');
                spanAge.contentEditable = 'true';
                spanAge.classList.add('editable');
                if (person.getComplete()) {
                    const strikeName = this.createElement('s');
                    strikeName.textContent = person.getName();
                    spanUser.append(strikeName);
                    const strikeAge = this.createElement('s');
                    strikeAge.textContent = person.getBirthday().toDateString();
                    spanAge.append(strikeAge);
                }
                else {
                    spanUser.textContent = person.getName();
                    spanAge.textContent = person.getBirthday().toDateString();
                }
                const deleteButton = this.createElement('button', 'delete');
                deleteButton.textContent = 'Borrar';
                li.append(checkbox, spanUser, spanAge, deleteButton);
                // Append nodes
                this.personList.append(li);
            });
        }
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