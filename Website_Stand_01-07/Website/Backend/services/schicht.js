const helper = require("../helper.js");
const SchichtDao = require("../dao/schichtDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/schicht/gib/:id", function(request, response) {
    helper.log("Service Adresse: Client requested one record, id=" + request.params.id);

    const schichtDao = new SchichtDao(request.app.locals.dbConnection);
    try {
        var result = schichtDao.loadById(request.params.id);
        helper.log("Service Adresse: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Adresse: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/schicht/alle", function(request, response) {
    helper.log("Service Adresse: Client requested all records");

    const schichtDao = new SchichtDao(request.app.locals.dbConnection);
    try {
        var result = schichtDao.loadAll();
        helper.log("Service Adresse: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Adresse: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});
serviceRouter.get("/schicht/day/:userID/:datum", function(request, response) {
    helper.log("Service Adresse: Client requested all records");

    const schichtDao = new SchichtDao(request.app.locals.dbConnection);
    try {
        var result = schichtDao.salaryToday(request.params.userID,request.params.datum );
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Adresse: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/schicht/month/:userID/:month", function(request, response) {
    helper.log("Service Adresse: Client requested all records");

    const schichtDao = new SchichtDao(request.app.locals.dbConnection);
    try {
        var result = schichtDao.salaryMonth(request.params.userID, request.params.month);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Adresse: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/schicht/year/:userID/:year", function(request, response) {
    helper.log("Service Adresse: Client requested all records");

    const schichtDao = new SchichtDao(request.app.locals.dbConnection);
    try {
        var result = schichtDao.salaryYear(request.params.userID, request.params.year);
        helper.log("Service Adresse: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Adresse: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/schicht/fromTo/:from/:to/:userID/:offset", function(request, response) {
    helper.log("Service Adresse: Client requested all records");

    const schichtDao = new SchichtDao(request.app.locals.dbConnection);
    try {
        var result = schichtDao.salaryFromTo(request.params.from, request.params.to, request.params.userID, request.params.offset);
        helper.log("Service Adresse: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Adresse: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});
serviceRouter.get("/schicht/overall/:userID", function(request, response) {
    helper.log("Service Adresse: Client requested all records");

    const schichtDao = new SchichtDao(request.app.locals.dbConnection);
    try {
        var result = schichtDao.salaryOverall(request.params.userID);
        helper.log("Service Adresse: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Adresse: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/schicht/next/:userID/:datum/:offset", function(request, response) {
    helper.log("Service Adresse: Client requested all records");

    const schichtDao = new SchichtDao(request.app.locals.dbConnection);
    try {
        var result = schichtDao.nextShifts(request.params.userID, request.params.datum, request.params.offset);
        helper.log("Service Adresse: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Adresse: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/schicht/nextCount/:userID/:datum", function(request, response) {
    helper.log("Service Adresse: Client requested all records");

    const schichtDao = new SchichtDao(request.app.locals.dbConnection);
    try {
        var result = schichtDao.countNextShifts(request.params.userID, request.params.datum);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Adresse: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/schicht/existiert/:id", function(request, response) {
    helper.log("Service Adresse: Client requested check, if record exists, id=" + request.params.id);

    const schichtDao = new SchichtDao(request.app.locals.dbConnection);
    try {
        var result = schichtDao.exists(request.params.id);
        helper.log("Service Adresse: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service Adresse: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/schicht/anzahl/:userID", function(request, response) {
    helper.log("Service Adresse: Client requested check, if record exists, id=" + request.params.userID);

    const schichtDao = new SchichtDao(request.app.locals.dbConnection);
    try {
        var result = schichtDao.count(request.params.userID);
        helper.log("Service Adresse: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Adresse: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/schicht/gib/userID/:id/:offset", function(request, response) {
    helper.log("Service Adresse: Client requested one record, id=" + request.params.id);

    const schichtDao = new SchichtDao(request.app.locals.dbConnection);
    try {
        var result = schichtDao.loadByUserId(request.params.id, request.params.offset);
        helper.log("Service Adresse: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Adresse: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});


serviceRouter.post("/schicht", function(request, response) {
    helper.log("Service Adresse: Client requested creation of new record");

    var errorMsgs=[];
    if (request.body.bezeichnung === "") {
        errorMsgs.push("bezeichnung fehlt");
    }
    if (request.body.arbeitgeber === "") {
        errorMsgs.push("arbeitgeber fehlt");
    }
    if (request.body.datum === "") {
        errorMsgs.push("datum fehlt");
    }
    if (request.body.startzeit === "") {
        errorMsgs.push("startzeit fehlt");
    }
    if (request.body.endzeit === "") {
        errorMsgs.push("endzeit fehlt");
    }

    if (request.body.verdient === "") {
        errorMsgs.push("verdient fehlt");
    }
    if (request.body.stunden === "") {
        errorMsgs.push("stunden fehlt");
    }
    if (errorMsgs.length > 0) {
        helper.log("Service Adresse: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const schichtDao = new SchichtDao(request.app.locals.dbConnection);
    try {
        var result = schichtDao.create(request.body.userID,request.body.arbeitgeberID, request.body.bezeichnung, request.body.datum, request.body.startzeit, request.body.endzeit, request.body.verdient, request.body.stunden);
        helper.log("Service Adresse: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Adresse: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.put("/schicht", function(request, response) {
    helper.log("Service Adresse: Client requested update of existing record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push("bezeichnung fehl");
    if (helper.isUndefined(request.body.arbeitgeber)) 
        errorMsgs.push("arbeitgeber fehl");
    if (helper.isUndefined(request.body.datum)) 
        errorMsgs.push("datum fehl");
    if (helper.isUndefined(request.body.startzeit)) 
        errorMsgs.push("startzeit fehl");
    if (helper.isUndefined(request.body.endzeit)) 
        errorMsgs.push("endzeit fehl");

    if (errorMsgs.length > 0) {
        helper.log("Service Adresse: Update not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Update nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const schichtDao = new SchichtDao(request.app.locals.dbConnection);
    try {
        var result = schichtDao.update(request.body.id, request.body.strasse, request.body.hausnummer, request.body.adresszusatz, request.body.plz, request.body.ort, request.body.land.id);
        helper.log("Service Adresse: Record updated, id=" + request.body.id);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Adresse: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.delete("/schicht/:id", function(request, response) {
    helper.log("Service Adresse: Client requested deletion of record, id=" + request.params.id);

    const schichtDao = new SchichtDao(request.app.locals.dbConnection);
    try {
        var obj = schichtDao.loadById(request.params.id);
        schichtDao.delete(request.params.id);
        helper.log("Service Adresse: Deletion of record successfull, id=" + request.params.id);
        response.status(200).json(helper.jsonMsgOK({ "gelöscht": true, "eintrag": obj }));
    } catch (ex) {
        helper.logError("Service Adresse: Error deleting record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;