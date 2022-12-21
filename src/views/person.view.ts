import { Person } from '../models/person.model';
import { Input } from './types/input.type';


/**
 * @class View
 *
 * Gestiona las operaciones relacionadas con la visualización y captura de datos.
 */
export class PersonView {
  private app: HTMLElement | null;
  private form: HTMLElement | null;
  private submitButton: HTMLElement | null;
  private inputName: HTMLInputElement | null;
  private inputBirthday: HTMLInputElement | null;
  private personList: HTMLElement | null;

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
    this.inputName = this.getElement('#name') as HTMLInputElement;
    // Obtiene el elemento Input-Date para la fecha de nacimiento
    this.inputBirthday = this.getElement('#birthday') as HTMLInputElement;
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
  private createInput(
    toInput: Input = {
      id: 'default',
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


  /**********************************************************************************
   *  FUNCIONES RELACIONADAS CON LA MANIPULACIÓN DEL HTML DE LA LISTA DE USUARIOS   *
   **********************************************************************************/

  /**
   * Resetea la lista de personas HTML para posteriormente ser regenerada
   */
  private clearList(): void{
    // Borra todos los nodos
    while (this.personList?.firstChild) {
      this.personList.removeChild(this.personList.firstChild);
    }
  }

  /**
   * Muestra un mensaje indicando que no hay personas en la lista
   */
  private showEmptyListMessage():void {
    const p = this.createElement('p');
    p.textContent = 'No hay personas! ¿Añadir una Persona?';
    this.personList?.append(p);
  }

  /**
   * Crea un div que servida de contenedor para los datos de una persona
   * @param person persona a la que le corresponde el contenedor
   * @returns {HTMLElement} Devuelve el HTML asociado al contendor de la persona
   */
  private createPersonContainer(person: Person): HTMLElement{
    const row = this.createElement('div', 'row');
    row.classList.add("gy-2");
    row.id = person.getId();
    return row;
  }

  /**
   * Crea un HR con un estilo predefinido.
   * @returns {HTMLElement} Devuelve el HTML asociado al HR
   */
  private addHrtoList():HTMLElement{
    const hr = this.createElement('hr', 'border');
    hr.classList.add("border-default", "border-1", "gy-1");
    return hr;
  }

  /**
   * Crea un input de type checkbox y le establece un valor por defect.
   * @param {boolean} toChecked valor booleano para poder determinar si hay que marcar el check o no
   * @returns {HTMLElement} Devuelve el HTML asociado al Checkbox
   */
  private createCheckbox(toChecked: boolean): HTMLElement{
    const checkbox = this.createElement('input', 'form-check-input') as HTMLInputElement;
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
  private createStrikedText(text: string): HTMLElement{
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
  private createEditableInputDate(id: string, value: Date): HTMLInputElement{
    const birthdayInput: Input = {
      id: 'inputBirthday'+id,
      type: 'date',
      placeholder: 'default',
      name: 'birthday-'+id,
    }
    const inputBirthdayElement: HTMLInputElement = this.createInput(birthdayInput);
    inputBirthdayElement.value = value?.toString();
    inputBirthdayElement.classList.add('form-control', 'editable');

    return inputBirthdayElement;
  }

  /**
   * Crear un elemento HTML de tipo botón especificamente para borrar personas
   */
  private createDeleteButton(): HTMLElement{
    const deleteButton = this.createElement('button', 'btn');
    deleteButton.classList.add("btn-danger", "delete");
    deleteButton.textContent = 'Borrar';
    return deleteButton;
  }



  /**
   * FUNCIÓN PRINCIPAL. Crea la tabla con la lista de personas
   * @param {Person[]} people Lista de personas para mostrar en la tabla.
   */
  public displayPeople(people: Person[]): void {
    // En primer lugar se resetea la lista de personas.
    this.clearList();

    // Muestra el mensaje por defecto
    if (people.length === 0) {
      this.showEmptyListMessage();
    } else {
      // Crea los nodos de la lista para cada persona
      people.forEach(person => {
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

          const strikeBirthday = this.createStrikedText(person.getBirthday()?.toString());
          colBirthday.append(strikeBirthday);
        } else {
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
        this.personList?.append(row, hr);
      });
    }
  }

  /**
   * Definición de atributos en métodos
   */
  get _nameText() {
    return this.inputName?.value;
  }
  get _birthDayText() {
    return this.inputBirthday?.value;
  }

  /**
   * Resetea los campos del formulario
   */
  _resetInput() {
    if(this.inputName != null)
      this.inputName.value = '';
    if(this.inputBirthday != null)
      this.inputBirthday.value = '';
  }

  /**********************************************************************************
   *  FUNCIONES RELACIONADAS CON EL CONTROL DE EVENTOS DE LA INTERFAZ               *
   **********************************************************************************/

  /**
   * Captura el evento submit del formulario para pasar los datos al controlador
   * @param handler 
   */
  public bindAddPerson(handler: Function): void {
    this.form?.addEventListener('submit', event => {
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
    this.personList?.addEventListener('change', event => {
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
    this.personList?.addEventListener('click', event => {
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
    this.personList?.addEventListener('change', event => {
      if ((event.target as any).type === 'checkbox') {
        const id = (event.target as any).parentElement.parentElement.id;
        handler(id);
      }
    });
  }

}