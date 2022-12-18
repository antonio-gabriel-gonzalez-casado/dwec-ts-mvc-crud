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
     * @param userView vista
     *
     */
    constructor(personService, userView) {
        this.personService = personService;
        this.userView = userView;
    }
}
exports.PersonController = PersonController;


/***/ }),

/***/ "./services/person.service.ts":
/*!************************************!*\
  !*** ./services/person.service.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonService = void 0;
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
     */
    constructor() { }
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
class PersonView {
    /**
     * @constructor
     *
     * Constructor de la clase PersonView
     */
    constructor() { }
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