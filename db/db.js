const connection = require("./connection");

class DB {
    constructor() {
        this.connection = connection;
    }

    allManager() {
        return this.connection.query(
            "select * from manager;"

        );
    }

    viewEmployees() {
        return this.connection.query(
            "select * from employee;"
        )
    }

    allEmployees() {
        return this.connection.query(
            "select employee.id,employee.first_name,employee.last_name,emp_role.title,emp_role.salary,department.name As department,manager.name AS Manager from employee left join emp_role on emp_role.id=employee.role_id left join department on emp_role.department_id=department.id left join manager on employee.manager_id=manager.id;"

        );
    }

    viewAllRoles() {
        return this.connection.query(
            "SELECT * FROM emp_role;"

        );
    }

    viewAllDepartments() {
        return this.connection.query(
            "SELECT * FROM department;"

        );
    }

    employeesByDepartment() {
        return this.connection.query(
            "select employee.id,employee.first_name,employee.last_name,department.name As department from employee left join emp_role on emp_role.id=employee.role_id left join department on emp_role.department_id=department.id;"

        );
    }

    employeesByManager() {
        return this.connection.query(
            // "select employee.id," +
            // "concat(employee.first_name" + "  " + ", employee.last_name) AS Employee," +
            // "manager.name AS Manager from employee left join manager on employee.manager_id=manager.id;"
            "select employee.id ,employee.first_name,employee.last_name,manager.name AS Manager from employee left join manager on employee.manager_id=manager.id;"
        );
    }
    viewTotalDeptBudget() {
        return this.connection.query(
            "select department.name AS Department_Name, emp_role.department_id,  sum(emp_role.salary) AS Dept_Budget from emp_role join department on emp_role.department_id=department.id group by emp_role.department_id order by Dept_Budget desc ;"
        );


    }
    addEmp(firstName, lastName, roleId, managerId) {
        return this.connection.query(
            "insert into employee set ?",
            {
                first_name: firstName,
                last_name: lastName,
                role_id: roleId,
                manager_id: managerId

            }

        );
    }

    addDept(name) {
        return this.connection.query(
            "insert into department set ?",
            { name: name }

        );
    }
    addRole(title, salary, department_id) {
        return this.connection.query(
            "insert into emp_role set ?",
            {
                title: title,
                salary: salary,
                department_id: department_id
            }

        );
    }
    removeEmp(id) {
        return this.connection.query(
            "delete from employee where id=?",
            [id]

        );
    }
    removeRole(id) {
        return this.connection.query(
            "delete from emp_role where id=?",
            [id]

        );
    }
    removeDepartment(id) {
        return this.connection.query(
            "delete from department where id=?",
            [id]

        );
    }

    updateEmpRole(id, roleId) {
        return this.connection.query(
            "update employee set role_id=? where id=?",
            [roleId, id],
        );
    }
    updateEmpManager(id, managerId) {
        return this.connection.query(
            "update employee set manager_id=? where id=?",
            [managerId, id]

        );
    }

}
module.exports = DB;
