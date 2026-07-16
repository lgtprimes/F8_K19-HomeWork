import { Employee } from "../../models/Employee";

export class EmployeeService {
    private _employees: Employee[] = [];

    create(employee: Omit<Employee, "id" | "receiveNoti">): Employee {
        const newEmployee: Employee = new Employee(employee.name);
        this._employees.push(newEmployee);
        return newEmployee;
    }

    findById(id: string): Employee | null {
        const employee = this._employees.find(e => e.id === id);
        return employee || null;
    }

    updateById(id: string, data: Partial<Omit<Employee, "id">>): Employee | null {
        const employee = this.findById(id);
        if(!employee) return null;
        Object.assign(employee, data);
        return employee;
    }


}