import { v7 } from "uuid";

export class Employee {
    private _id: string = v7();
    private _name: string;
    constructor(name: string) {
        this._name = name;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    receiveNoti(message: string): void {
        console.log(`[${this._id}] - [${this._name}] received notification: ${message}`);
    }

}