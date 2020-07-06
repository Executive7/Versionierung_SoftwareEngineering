const helper = require("../helper.js");

class UserDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {

        var sql = "SELECT * FROM User WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        result = helper.objectKeysToLower(result);

        return result;
    }

    loadAll() {

        var sql = "SELECT * FROM User";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        result = helper.arrayObjectKeysToLower(result);

        return result;
    }

    loadUser(benutzername, passwort){
        var sql = "SELECT * FROM User WHERE Benutzername=? AND Passwort=?"
        var statement = this._conn.prepare(sql);
        var result = statement.get(benutzername, passwort);

        if (helper.isUndefined(result)) {
            throw new Error("No Record found by benutzername " + benutzername + " or passwort" + passwort );
        }

        result = helper.objectKeysToLower(result);

        return result;
    }

    update(id,benutzername, vorname, nachname, email, passwort, strasse , plz, stadt) {
        var sql = "UPDATE User SET Benutzername=?,Vorname=?,Nachname=?, Email=?, Passwort=?, Strasse=?, PLZ=?, Stadt=? WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var params = [benutzername, vorname, nachname, email, passwort, strasse , plz, stadt, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not update existing Record. Data: " + params);

        var updatedObj = this.loadById(id);
        return updatedObj;
    }

    exists(id) {
        var sql = "SELECT COUNT(ID) AS cnt FROM User WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(benutzername, vorname, nachname, email, passwort, strasse , plz, stadt) {
        var sql = "INSERT INTO User (Benutzername, Vorname, Nachname, EMail, Passwort, Strasse, PLZ, Stadt) VALUES (?,?,?,?,?,?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [benutzername, vorname, nachname, email, passwort, strasse, plz, stadt];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }

    delete(id) {
        try {
            var sql = "DELETE FROM User WHERE ID=?";
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error("Could not delete Record by id=" + id);

            return true;
        } catch (ex) {
            throw new Error("Could not delete Record by id=" + id + ". Reason: " + ex.message);
        }
    }

    toString() {
        helper.log("AdresseDao [_conn=" + this._conn + "]");
    }
}

module.exports = UserDao;