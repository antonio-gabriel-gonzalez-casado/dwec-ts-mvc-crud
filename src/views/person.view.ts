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
    this.app?.append(this.title, this.form, hr, this.personList);

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
      name: '_default'
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
      p.textContent = 'No hay personas! ¿Añadir una Persona?';
      this.personList.append(p);
    } else {
      // Crea los nodos
      people.forEach(person => {
        // Se crea un contenedor generar para cada perosna con cuatro columnas
        const row = this.createElement('div', 'row');
        row.classList.add("gy-2");
        row.id = person.getId();

        // Se define el checkbox en la primera columna
        const checkbox = this.createElement('input', 'form-check-input') as HTMLInputElement;
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
          strikeBirthday.textContent = person.getBirthday()?.toString();
          colBirthday.append(strikeBirthday);
        } else {
          colName.textContent = person.getName();
          const inputBirthday: HTMLInputElement = this.createElement('input', "form-control") as HTMLInputElement;
          inputBirthday.type = 'date';
          inputBirthday.value = person.getBirthday()?.toString();
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
  public bindAddPerson(handler: Function): void {
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
  public bindEditPerson(handler: Function) {
    this.personList.addEventListener('change', event => {
      const element = (event.target as any);
      if (element.type === "date"){
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
  public bindDeletePerson(handler: Function) {
    this.personList.addEventListener('click', event => {
      if ((event.target as any).className.includes('delete')) {
        const id = (event.target as any).parentElement.parentElement.id;
        handler(id);
      }
    });
  }

  /**
   * Captura el evento para tachar a una persona
   * @param handler 
   */
  public bindTogglePerson(handler: Function) {
    this.personList.addEventListener('change', event => {
      if ((event.target as any).type === 'checkbox') {
        const id = (event.target as any).parentElement.parentElement.id;
        handler(id);
      }
    });
  }

}