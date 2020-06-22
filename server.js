const inquirer = require("inquirer");
const DB = require("./db/db");
const cTable = require("console.table");
const connection = require("./db/connection");

const database = new DB();

const startPrompt = () => {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Roles",
                "View All Departments",
                "View All Employees by Department",
                "View All Employees by Manager",
                "View Total Department Budget",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role",
                "Update Employee Manager",
                "Remove Employee",
                "Remove Role",
                "Remove Department",
                "exit",
            ],
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "View All Employees by Department":
                    viewAllEmployeesByDepartment();
                    break;
                case "View All Employees by Manager":
                    viewAllEmployeesByManager();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Update Employee Manager":
                    updateEmployeeManager();
                    break;
                case "Remove Employee":
                    removeEmployee();
                    break;
                case "Remove Role":
                    removeRole();
                    break;
                case "Remove Department":
                    removeDepartment();
                    break;

                case "View Total Department Budget":
                    viewTotalDeptBudget();
                    break;
                case "exit":
                    break;
            }
        });
};




const viewAllEmployees = () => {
    database.allEmployees().then((response) => {
        console.table(response);
        startPrompt();
    });

};
const viewAllRoles = () => {
    database.viewAllRoles().then((response) => {
        console.table(response);
        startPrompt();
    });

};
const viewAllDepartments = () => {
    database.viewAllDepartments().then((response) => {
        console.table(response);
        startPrompt();
    });

};

const viewAllEmployeesByDepartment = () => {
    database.employeesByDepartment().then((response) => {
        console.table(response);
        startPrompt();
    });

};
const viewAllEmployeesByManager = () => {
    database.employeesByManager().then((response) => {
        console.table(response);
        startPrompt();
    });

};

const addEmployee = () => {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "Enter employee first name: "

            },
            {
                name: "lastName",
                type: "input",
                message: "Enter employee last name: "
            },
            {
                name: "role",
                type: "list",
                message: "Enter employee,s role: ",
                choices: [
                    "Sales Manager",
                    "Software Engineer",
                    "Team Lead",
                    "Support Engineer",
                    "Manager",
                    "Software Test Engineer",
                    "Assistant Manager",
                    "Admin",
                    "IT Manager",
                ],
            },
            {
                name: "manager",
                type: "list",
                message: "Select manager name: ",
                choices: [
                    "Jeff Firrelli",
                    "Leslie Thompson",
                    "None"
                ],
            },
        ])
        .then((answer) => {
            if (answer.role === "Sales Manager") {
                answer.role = 1;
            }
            else if (answer.role === "Software Engineer") {
                answer.role = 2;
            }
            else if (answer.role === "Team Lead") {
                answer.role = 3;
            }
            else if (answer.role === "Support Engineer") {
                answer.role = 4;
            }
            else if (answer.role === "Manager") {
                answer.role = 5;
            }
            else if (answer.role === "Software Test Engineer") {
                answer.role = 6;
            }
            else if (answer.role === "Assistant Manager") {
                answer.role = 7;
            }
            else if (answer.role === "Admin") {
                answer.role = 8;
            }
            else if (answer.role === "IT Manager") {
                answer.role = 9;
            };
            if (answer.manager === "Jeff Firrelli") {
                answer.manager = 3
            }
            else if (answer.manager === "Leslie Thompson") {
                answer.manager = 4
            }
            else if (answer.manager === "None") {
                answer.manager = null;
            }

            database.addEmp(answer.firstName, answer.lastName, answer.role, answer.manager).then((response) => {

                console.table(response);
            });
            viewAllEmployees();
        });

};

const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "Enter department name: "

            },
        ])
        .then((answer) => {

            database.addDept(answer.name).then((response) => {

                console.table(response);
            });
            viewAllDepartments();
        });

};

const addRole = () => {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "Enter role's title",

            },
            {
                name: "salary",
                type: "input",
                message: "Enter role's salary "

            },
            {
                name: "department_id",
                type: "input",
                message: "Enter department id: "

            },
        ])
        .then((answer) => {

            database.addRole(answer.title, answer.salary, answer.department_id).then((response) => {

                console.table(response);
            });
            viewAllRoles();
        });

};

const removeEmployee = () => {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Enter employee id",
            },
        ])
        .then((answer) => {

            database.removeEmp(answer.id).then((response) => {

                console.table(response);
            });
            viewAllEmployees();
        });

};

const removeRole = () => {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Enter role id ",
            },
        ])
        .then((answer) => {

            database.removeRole(answer.id).then((response) => {

                console.table(response);
            });
            viewAllRoles();
        });

};

const removeDepartment = () => {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Enter department id ",
            },
        ])
        .then((answer) => {

            database.removeDepartment(answer.id).then((response) => {

                console.table(response);
            });
            viewAllDepartments();
        });

};
const updateEmployeeRole = () => {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Enter employee id",
            },
            {
                name: "roleId",
                type: "input",
                message: "Enter role id",
            },
        ])
        .then((answer) => {

            database.updateEmpRole(answer.id, answer.roleId).then((response) => {

                console.table(response);
                viewAllEmployees();
            });
        });

};
const updateEmployeeManager = () => {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Enter employee id",
            },
            {
                name: "managerId",
                type: "list",
                message: "Select manager id ",
                choices: [3, 4, 9]
            },
        ])
        .then((answer) => {
            database.updateEmpManager(answer.id, answer.managerId).then((response) => {

                console.table(response);
            });
            viewAllEmployeesByManager();
        });

};

const viewTotalDeptBudget = () => {
    database.viewTotalDeptBudget().then((response) => {
        console.table(response);
        startPrompt();
    });

};

startPrompt();