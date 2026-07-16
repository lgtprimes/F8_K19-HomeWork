import { v7 } from "uuid";
import { EmployeeService } from "../employeeService";
import { Project } from "../../models/Project"; 

export class ProjectService {
    private _projects: Project[] = [];
    constructor(private EmployeeService: EmployeeService) {
        this.EmployeeService = EmployeeService;
    }

    create(project: Omit<Project, "id">): Project {
        const newProject: Project = {
            id: v7(),
            ...project,
        }
        this._projects.push(newProject);

        const employee = this.EmployeeService.findById(newProject.employeeId);
        if(employee) {
            employee.receiveNoti("Bạn vừa được gán vào dự án mới");
        }

        return newProject;
    }

    updateById(id: string, data: Partial<Omit<Project, "id">>): Project | null {
        const project = this._projects.find(p => p.id === id);
        if(!project) return null;
        Object.assign(project, data);

        const oldEmployeeId = project.employeeId;
        if(data.employeeId !== undefined && data.employeeId !== oldEmployeeId) {
            const newEmployee = this.EmployeeService.findById(data.employeeId);
            if(newEmployee) {
                newEmployee.receiveNoti("Bạn đã được chuyển giao phụ trách dự án này.");
            }
        }

        return project;
    }

}