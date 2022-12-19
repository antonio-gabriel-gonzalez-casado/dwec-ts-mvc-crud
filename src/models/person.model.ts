import { PersonDto } from './types/person.dto.type';

/**
 * @class Model
 *
 * Entidad persona. Almacena los datos de una persona
 */
export class Person {
    private _id: string;
    private _name: string;
    private _birthday: Date;
    private _complete: boolean;

    /**
     * @constructor
     * Inicializa los datos de una persona a través de su DTO
     * @param personDto 
     */
    constructor(personDto: PersonDto) {
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
    private uuidv4(): string {
        return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
            /[018]/g,
            (c: number) =>
                (
                    c ^
                    (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
                ).toString(16)
        );
    }

    /** GETTERS AND SETTERS **/

    public getId(): string {
        return this._id;
    }
    public setId(value: string):void {
        this._id = value;
    }
    public getName(): string {
        return this._name;
    }
    public setName(value: string):void {
        this._name = value;
    }
    public getBirthday(): Date {
        return this._birthday;
    }
    public setBirthday(value: Date):void {
        this._birthday = value;
    }
    public getComplete(): boolean {
        return this._complete;
    }
    public setComplete(value: boolean):void {
        this._complete = value;
    }
}

