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
                "Exit",
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
                case "Exit":
                    exit();
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
                message: "Enter employee first name: ",

            },
            {
                name: "lastName",
                type: "input",
                message: "Enter employee last name: "

            },
            {
                name: "roleId",
                type: "input",
                message: "Enter role id: "

            },
            {
                name: "managerId",
                type: "input",
                message: "Enter manager id: "

            },
        ])
        .then((answer) => {

            database.addEmp(answer.firstName, answer.lastName, answer.roleId, answer.managerId).then((response) => {

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
const exit = () => {
    console.log("Good Bye!!")

};


startPrompt();