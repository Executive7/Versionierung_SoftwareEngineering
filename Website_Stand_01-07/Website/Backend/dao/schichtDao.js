const helper = require("../helper.js");

class SchichtDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {

        var sql = "SELECT * FROM Schicht WHERE UserID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        result = helper.objectKeysToLower(result);

        return result;
    }

    loadAll() {
        var sql = "SELECT * FROM Schicht";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        result = helper.arrayObjectKeysToLower(result);

        return result;
    }

    loadByUserId(id, offset) {

        var sql = "SELECT * FROM Schicht WHERE UserID=? LIMIT 1 OFFSET ?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id, offset);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        result = helper.objectKeysToLower(result);

        return result;
    }

    exists(id) {
        var sql = "SELECT COUNT(ID) AS cnt FROM Schicht WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    count(userID){
        var sql = "SELECT COUNT(ID) as cnt FROM Schicht WHERE UserID =?"
        var statement = this._conn.prepare(sql);
        var result = statement.get(userID);

        return result.cnt;
    }

    salaryToday(userID, datum){
        var sql = "SELECT SUM(Stunden) as stunden, SUM(Verdient) as verdient FROM Schicht WHERE UserID =? AND Datum =?"
        var statement = this._conn.prepare(sql);
        var result = statement.get(userID, datum );

        return result;
    }

    salaryMonth(userID, month){
        var sql = "SELECT SUM(Stunden) as stunden, SUM(Verdient) as verdient FROM Schicht WHERE UserID =? AND strftime('%m', Datum) =?"
        var statement = this._conn.prepare(sql);
        var result = statement.get(userID, month);

        return result;
    }

    salaryYear(userID, year){
        var sql = "SELECT SUM(Stunden) as stunden, SUM(Verdient) as verdient FROM Schicht WHERE UserID =? AND strftime('%Y', datum) =? "
        var statement = this._conn.prepare(sql);
        var result = statement.get(userID,year);

        return result;
    }

    salaryFromTo(from, to, userID, offset){
        var sql = "SELECT a.name as name, (SELECT SUM(verdient) from Schicht s where s.ArbeitgeberID = a.ID AND s.datum between ? AND ?) as verdient FROM Arbeitgeber a where userID=? LIMIT 1 OFFSET ?"

        var statement = this._conn.prepare(sql);
        var result = statement.get(from, to, userID, offset);

        return result;
    }

    salaryOverall(userID){
        var sql = "SELECT sum(verdient) as insgesamt from Schicht where UserID =?"
        var statement = this._conn.prepare(sql);
        var result = statement.get(userID);

        return result;
    }

    nextShifts(userID, datum, offset){
        var sql = "SELECT * FROM Schicht WHERE UserID=? AND Datum>? LIMIT 1 OFFSET ?"
        var statement = this._conn.prepare(sql);
        var result = statement.get(userID,datum, offset);

        return result;
    }

    countNextShifts(userID, datum){
        var sql = "SELECT count(*) as cnt FROM Schicht WHERE UserID=? AND Datum >?"
        var statement = this._conn.prepare(sql);
        var result = statement.get(userID,datum);

        return result.cnt;
    }

    

    create(userID = null, arbeitgeberID = null,  bezeichnung, datum, startzeit, endzeit, verdient, stunden) {
        var sql = "INSERT INTO Schicht (UserID, ArbeitgeberID, Bezeichnung, Datum, Startzeit, Endzeit, Verdient, Stunden) VALUES (?,?,?,?,?,?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [userID, arbeitgeberID, bezeichnung, datum, startzeit, endzeit, verdient, stunden];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        
        return result;
    }

    update(id,arbeitgeberID = null,  bezeichnung = "", datum = "", startzeit="", endzeit="") {
        var sql = "UPDATE Schicht SET arbeitgeberID=?,bezeichnung=?,datum=?, startzeit=?, endzeit=? WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var params = [arbeitgeberID, bezeichnung, datum, startzeit, endzeit];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not update existing Record. Data: " + params);

        var updatedObj = this.loadById(id);
        return updatedObj;
    }

    delete(id) {
        try {
            var sql = "DELETE FROM Schicht WHERE ID=?";
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
        helper.log("SchichtDao [_conn=" + this._conn + "]");
    }
}

module.exports = SchichtDao;