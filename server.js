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
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'Update Employee Role',
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

                case 'Add Employee':
                    addEmployee();
                    break;

                // case 'Find data within a specific range':
                //     rangeSearch();
                //     break;

                // case 'Search for a specific song':
                //     songSearch();
                //     break;

                case 'exit':
                    break;
            }
        });
};


startPrompt();

// const artistSearch = () => {
//     inquirer
//         .prompt({
//             name: 'artist',
//             type: 'input',
//             message: 'What artist would you like to search for?',
//         })
//         .then(function (answer) {
//             database.getSongsByArtist(answer.artist).then((response) => {
//                 console.table(response);
//             });
//             startPrompt();
//         });
// };

const viewAllEmployees = () => {
    database.allEmployees().then((response) => {
        console.table(response);
        startPrompt();
    });

};

const viewAllEmployeesByDepartment = () => {
    database.allEmployeesDepartment().then((response) => {
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
        .then(function (answer) {
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

    // database.addEmp().then((response) => {
    //     console.table(response);
    //     startPrompt();
    // });
    // connection.query("select * from employee", (err, res) => {
    //     if (err) throw err
    //     console.log(res);
    //     res.forEach((row) => {
    //         console.table(row);
    //     })
    //     console.table(res);
    // });

};

// function afterConnection() {
//     connection.query('SELECT * FROM songs', function (err, res) {
//         if (err) throw err;
//         console.log(res);
//         res.forEach((row) => {
//             console.log(row.id, row.title, row.artist, row.genre);
//         })

//     });
// }