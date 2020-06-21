const inquirer = require("inquirer");
const DB = require("./db/db");
const cTable = require('console.table');
const connection = require("./db/connection");

const database = new DB();

const startPrompt = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Employees by Department',
                'View All Employees by Manager',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'exit',
            ],
        })
        .then(function (answer) {
            switch (answer.action) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'View All Employees by Department':
                    viewAllEmployeesByDepartment();
                    break;
                case 'View All Employees by Manager':
                    viewAllEmployeesByManager();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Remove Employee':
                    removeEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;

                case 'exit':
                    break;
            }
        });
};


startPrompt();

const viewAllEmployees = () => {
    database.allEmployees().then((response) => {
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
                name: 'firstName',
                type: 'input',
                message: 'Enter employee first name: '

            },
            {
                name: 'lastName',
                type: 'input',
                message: 'Enter employee last name: '
            },
            {
                name: 'role',
                type: 'list',
                message: "Enter employee's role: ",
                choices: [
                    'Sales Manager',
                    'Software Engineer',
                    'Team Lead',
                    'Support Engineer',
                    'Manager',
                    'Software Test Engineer',
                    'Assistant Manager',
                    'Admin',
                    'IT Manager',
                ],
            },
            {
                name: 'manager',
                type: 'list',
                message: "Select manager name: ",
                choices: [
                    'Jeff Firrelli',
                    'Leslie Thompson',
                    'None'
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
            if (answer.manager === 'Jeff Firrelli') {
                answer.manager = 3
            }
            else if (answer.manager === 'Leslie Thompson') {
                answer.manager = 4
            }
            else if (answer.manager === 'None') {
                answer.manager = null;
            }

            database.addEmp(answer.firstName, answer.lastName, answer.role, answer.manager).then((response) => {

                console.table(response);
            });
            startPrompt();
        });

};

const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: 'Enter department name: '

            },
        ])
        .then((answer) => {

            database.addDept(answer.name).then((response) => {

                console.table(response);
            });
            startPrompt();
        });

};

const removeEmployee = () => {
    inquirer
        .prompt([
            {
                name: 'id',
                type: 'input',
                message: "Enter the id of an employee to delete ",
            },
        ])
        .then((answer) => {

            database.removeEmp(answer.id).then((response) => {

                console.table(response);
            });
            startPrompt();
        });

};

const updateEmployeeRole = () => {
    inquirer
        .prompt([
            {
                name: 'employeeId',
                type: 'input',
                message: "Enter employee id",
            },
            {
                name: 'roleId',
                type: 'input',
                message: "Enter role id",
            },
        ])
        .then((answer) => {

            database.updateEmpRole(answer.employeeId, answer.roleId).then((response) => {

                console.table(response);
            });
        });

};

