import { Person } from '../models/person.model';
import { Input } from './types/input.type';


/**
 * @class View
 *
 * Gestiona las operaciones relacionadas con la visualización y captura de datos.
 */
export class PersonView {
  private app: HTMLElement | null;
  private form: HTMLElement;
  private submitButton: HTMLElement;
  private inputName: HTMLInputElement;
  private inputBirthday: HTMLInputElement;
  private title: HTMLElement;
  private personList: HTMLElement;
  private _temporaryBirthdayText: string;

  /**
   * @constructor 
   * 
   * Constructor de la clase PersonView
   */
  constructor() {
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
    this.app?.append(this.title, this.form, this.personList);

    this._temporaryBirthdayText = '';
    this._initLocalListeners();
  }

  /**
   * Creación de un Campo input con los datos pasados como parámetros
   * @param toInput 
   * @returns {HTMLInputElement} devuele el elemento html input
   */
  private createInput(
    toInput: Input = {
      key: 'default',
      type: 'text',
      placeholder: 'default',
      name: 'default'
    }
  ): HTMLInputElement {
    let inputName: HTMLInputElement = this.createElement('input') as HTMLInputElement;
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
  private getElement(selector: string): HTMLElement | null {
    return document.querySelector(selector);
  }

  /**
   * Crea un elemento HTML con el tag y la clase pasada como parámetro
   * @param tag 
   * @param className 
   * @returns HTMLElement Devuelve el HTML creado
   */
  private createElement(tag: string, className?: string): HTMLElement {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

  /**
   * Inicializa los listeners 
   */
  private _initLocalListeners(): void {
    this.personList.addEventListener('input', event => {
      if ((event.target as any).className === 'editable') {
        this._temporaryBirthdayText = (event.target as any).innerText;
      }
    });
  }

  /**
   * Crea la tabla con la lista de personas
   * @param people 
   */
  public displayPeople(people: Person[]): void {
    // Borra todos los nodos
    while (this.personList.firstChild) {
      this.personList.removeChild(this.personList.firstChild);
    }

    // Muestra el mensaje por defecto
    if (people.length === 0) {
      const p = this.createElement('p');
      p.textContent = 'Nada que hacer! ¿Añadir una Persona?';
      this.personList.append(p);
    } else {
      // Crea los nodos
      people.forEach(person => {
        const li = this.createElement('li');
        li.id = person.getId();

        const checkbox = this.createElement('input') as HTMLInputElement;
        checkbox.type = 'checkbox';
        checkbox.checked = person.getComplete();

        const spanUser = this.createElement('span');

        const spanAge = this.createElement('span') as HTMLInputElement;
        spanAge.contentEditable = 'true';
        spanAge.classList.add('editable');

        if (person.getComplete()) {
          const strikeName = this.createElement('s');
          strikeName.textContent = person.getName();
          spanUser.append(strikeName);

          const strikeAge = this.createElement('s');
          strikeAge.textContent = person.getBirthday().toDateString();
          spanAge.append(strikeAge);
        } else {
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