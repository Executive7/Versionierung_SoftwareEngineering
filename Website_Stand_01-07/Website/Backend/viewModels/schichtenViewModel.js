// registrieren
$(document).ready(function(){ 
    var userID = localStorage.getItem("userID");
    // load overview 
    $.ajax({
        url: "http://localhost:8000/api/schicht/anzahl/"+ userID,
        method: "get",
        dataType: "json",
    }).done(function (response) {
        var anzahlSchicht = response.daten;
        // get schicht
        for(i=0; i<anzahlSchicht; i++){
            $.ajax({
                url: "http://localhost:8000/api/schicht/gib/userID/"+userID + "/" + i,
                method: "get",
                dataType: "json",
            }).done(function (response) {
                var arbeitgeberID = response.daten.arbeitgeberid;
                // get arbeitgeber name
                $.ajax({
                    url: "http://localhost:8000/api/arbeitgeber/gib/"+ arbeitgeberID,
                    method: "get",
                    dataType: "json",
                }).done(function (responseArbeitgeber) {
                    $("tbody").append("<tr> <td>" + response.daten.bezeichnung+ "</td>"
                                    + "<td>" + responseArbeitgeber.daten.name+ "</td>"
                                    + "<td>" + new Date(response.daten.datum).toLocaleDateString()+ "</td>"
                                    + "<td>" + response.daten.startzeit + " - " +  response.daten.endzeit + "</td>"
                                    + "<td class='icon_edit'><button type='button' class='btn_edit' data-toggle='modal' data-target='#schicht_edit'>&#x2699;</button></td></tr>");
                }).fail(function (jqXHR, statusText, error) {
                    console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
                });
                   }).fail(function (jqXHR, statusText, error) {
                console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
            });
        }
        
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
    });


    // load option menu with arbeitgeber
    $.ajax({
        url: "http://localhost:8000/api/arbeitgeber/anzahl/"+ userID,
        method: "get",
        dataType: "json",
    }).done(function (response) {
        var anzahlArbeitgeber = response.daten;
        // get arbeitgeber
        for(i=0; i<anzahlArbeitgeber; i++){
            $.ajax({
                url: "http://localhost:8000/api/arbeitgeber/gib/userID/"+userID + "/" + i,
                method: "get",
                dataType: "json",
            }).done(function (response) {
                $("#arbeitgeber").append("<option>" + response.daten.name + "</option>");
            }).fail(function (jqXHR, statusText, error) {
                console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
            });
        }
        
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
    });



    $("#setSchicht").click(function(){
        var bezeichnung = $("#bezeichnung").val();
        var arbeitgeber = $("#arbeitgeber").val();
        var datum = new Date($("#datum").val());
        var startzeit = $("#startzeit").val();
        var endzeit = $("#endzeit").val();



        // get arbeitgeberID
        $.ajax({
            url: "http://localhost:8000/api/arbeitgeber/gib/name/" + arbeitgeber,
            method: "get",
            dataType: "json",
        }).done(function (response) {
            var arbeitgeberID = response.daten.id;
            // calculate verdient 
            var lohn = response.daten.stundenlohn;
           
            // split hours & minutes from startTime/endTime
            var startHours = startzeit.substring(0,2);
            var startMinutes = startzeit.substring(3,5);
            var endHours = endzeit.substring(0,2);
            var endMinutes = endzeit.substring(3,5);

            // set new Date to get difference endDate-startDate
            var startDate = new Date();
            startDate.setHours(startHours);
            startDate.setMinutes(startMinutes);
            var endDate = new Date();
            endDate.setHours(endHours);
            endDate.setMinutes(endMinutes);
            var stunden = new Date(endDate.getTime() - startDate.getTime());
            stunden = ((stunden.getTime() * 0.000016666666666667)/60).toFixed(2);

            // calculate difference * salary/hour
            var verdient = lohn * stunden;
            console.log(verdient);

            obj = {userID, arbeitgeberID, bezeichnung, datum, startzeit, endzeit, verdient, stunden};
            
            $.ajax({
                url: "http://localhost:8000/api/schicht",
                method: "post",
                contentType: "application/json",
                data: JSON.stringify(obj),
            }).done(function (response) {
                console.log(response); 
                location.reload();
            }).fail(function (jqXHR, statusText, error) {
                console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
            });
        }).fail(function (jqXHR, statusText, error) {
            console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        });
        
        
    });
});
