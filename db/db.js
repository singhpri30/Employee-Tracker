const connection = require("./connection");

class DB {
    constructor() {
        this.connection = connection;
    }

    allEmployees() {
        return this.connection.query(
            "select * from employee"

        );
    }
    addEmp(firstName, lastName, role) {
        return this.connection.query(
            // "insert into employee (first_name,last_name,role_id,manager_id) values(?);",
            // {
            //     first_name: firstName,
            //     last_name: lastName,
            //     role_id: role
            // }
            "insert into employee set ?",
            {
                first_name: firstName,
                last_name: lastName,
                role_id: role
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
