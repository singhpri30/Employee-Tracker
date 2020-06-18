const connection = require("./connection");

class DB {
    constructor() {
        this.connection = connection;
    }

    addDepartment(deptName) {
        return this.connection.query(
            "INSERT into department SET = ?;",
            [artist]
        );
    }

    getDoubleArtists() {
        return this.connection.query(
            "SELECT artist FROM songs GROUP BY ARTIST having COUNT(*) > 1;",
        );
    }

    getSongsByRange(start, end) {
        return this.connection.query(
            "SELECT * FROM songs where position BETWEEN ? AND ?;",
            [start, end]
        );
    }

    getSongsByTitle(title) {
        return this.connection.query(
            "SELECT * FROM songs WHERE song = ?;",
            [title],
        );
    }

}

module.exports = DB;