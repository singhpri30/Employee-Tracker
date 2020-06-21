const connection = require("./connection");

class DB {
    constructor() {
        this.connection = connection;
    }

    allEmployees() {
        return this.connection.query(
            "select employee.id,employee.first_name,employee.last_name,emp_role.title,emp_role.salary,department.name As department,manager.name AS Manager from employee left join emp_role on emp_role.id=employee.role_id left join department on emp_role.department_id=department.id left join manager on employee.manager_id=manager.id;"

        );
    }

    allEmployeesDepartment() {
        return this.connection.query(
            "select employee.id,employee.first_name,employee.last_name,department.name As department from employee left join emp_role on emp_role.id=employee.role_id left join department on emp_role.department_id=department.id;"

        );
    }
    addEmp(firstName, lastName, role, manager) {
        return this.connection.query(
            "insert into employee set ?",
            {
                first_name: firstName,
                last_name: lastName,
                role_id: role,
                manager_id: manager

            }

        );
    }

    //     // addRoles() {
    //     //     return this.connection.query(
    //     //         "SELECT artist FROM songs GROUP BY ARTIST having COUNT(*) > 1;",
    //     //     );
    //     // }

    //     // addEmployees(start, end) {
    //     //     return this.connection.query(
    //     //         "SELECT * FROM songs where position BETWEEN ? AND ?;",
    //     //         [start, end]
    //     //     );
    //     // }

    //     // getSongsByTitle(title) {
    //     //     return this.connection.query(
    //     //         "SELECT * FROM songs WHERE song = ?;",
    //     //         [title],
    //     //     );
    //     // }

}
module.exports = DB;
