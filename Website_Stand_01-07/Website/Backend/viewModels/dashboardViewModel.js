// login
$(document).ready(function(){
        
    var id = localStorage.getItem("userID");
    var benutzername;
    var vorname;
    var nachname;
    var email;
    var strasse;
    var stadt;
    var plz;
    var passwort;
    

    $.fn.resetError = function(){ 
        $('#benutzername').removeClass('form-control is-invalid').addClass('form-control');
        $('#vorname').removeClass('form-control is-invalid').addClass('form-control');
        $('#nachname').removeClass('form-control is-invalid').addClass('form-control');
        $('#email').removeClass('form-control is-invalid').addClass('form-control');
        $('#strasse').removeClass('form-control is-invalid').addClass('form-control');
        $('#plz').removeClass('form-control is-invalid').addClass('form-control');
        $('#stadt').removeClass('form-control is-invalid').addClass('form-control');
        $('#passwort').removeClass('form-control is-invalid').addClass('form-control');

        $("#benutzernameError").hide();
        $("#vornameError").hide();
        $("#nachnameError").hide();
        $("#emailError").hide();
        $("#adresseError").hide();
        $("#plzError").hide();
        $("#stadtError").hide();
        $("#passwortError").hide();
   }
   $.fn.resetError();
    
    $.ajax({
        url: "http://localhost:8000/api/user/gib/" + id,
        method: "get",
        dataType: "json"
    }).done(function (response) {

        // Header ausfüllen
        benutzername = response.daten.benutzername;
        vorname = response.daten.vorname
        nachname = response.daten.nachname;
        email = response.daten.email;
        strasse = response.daten.strasse;
        stadt = response.daten.stadt;
        plz = response.daten.plz;
        passwort = response.daten.passwort;

        $("#name").text(vorname + " " + nachname);
        $("#adresse").text(strasse + ", " + plz + " " + stadt);


        // Input-Felder "Profil bearbeiten"
        $("#benutzername").val(benutzername);
        $("#vorname").val(vorname);
        $("#nachname").val(nachname);
        $("#email").val(email);
        $("#strasse").val(strasse);
        $("#plz").val(plz);
        $("#stadt").val(stadt);

        // Button "speichern" wird gedrückt
        $("#updateUser").click(function() {
            $.fn.resetError();
        
            var error = 0;
            // no input handling
            if($('#benutzername').val() === ""){
                $('#benutzername').removeClass('form-control').addClass('form-control is-invalid');
                $("#benutzernameError").show();
                error = 1;
            }
            if($('#vorname').val() === ""){
                $('#vorname').removeClass('form-control').addClass('form-control is-invalid');
                $("#vornameError").show();
                error = 1;
            }
            if($('#nachname').val() === ""){
                $('#nachname').removeClass('form-control').addClass('form-control is-invalid');
                $("#nachnameError").show();
                error = 1;
            }
            if($('#email').val() === ""){
                $('#email').removeClass('form-control').addClass('form-control is-invalid');
                $("#emailError").show();
                error = 1;
            }
            if($('#strasse').val() === ""){
                $('#strasse').removeClass('form-control').addClass('form-control is-invalid');
                $("#adresseError").show();
                error = 1;
            }
            if($('#plz').val() === ""){
                $('#plz').removeClass('form-control').addClass('form-control is-invalid');
                $("#plzError").show();
                error = 1;
            }
            if($('#stadt').val() === ""){
                $('#stadt').removeClass('form-control').addClass('form-control is-invalid');
                $("#stadtError").show();
                error = 1;
            }

            if($("#newPassword").val() !== ""){
                passwort = $("#newPassword").val();
            }

            if(error == 1){
                return;
            }
            benutzername = $('#benutzername').val();
            vorname = $('#vorname').val();
            nachname = $('#nachname').val();
            email = $('#email').val();
            strasse = $('#strasse').val();
            plz = $('#plz').val();
            stadt = $('#stadt').val();
            obj = {id, benutzername, vorname, nachname, email, passwort,  strasse, plz, stadt};
            
            $.ajax({
                url: "http://localhost:8000/api/update/user",
                method: "put",
				contentType: "application/json",
				data: (obj)
            }).done(function (response) {
                location.reload();
            }).fail(function (jqXHR, statusText, error) {
                console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
            });
        });
     
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
    });   

    // load overview salary
    // today
    var userID = localStorage.getItem("userID");
    var datum = new Date();
    datum.setUTCHours(0,0,0,0);
    $.ajax({
        url: "http://localhost:8000/api/schicht/day"+ "/" +userID + "/" + datum.toISOString() ,
        method: "get",
        dataType: "json",
    }).done(function (response) {
        if(response.daten.verdient == null){
            $("#salaryDay").append(0 + " €");
            $("#hoursDay").append(0 + " Std.");
        }
        else{
            $("#salaryDay").append((response.daten.verdient).toFixed(2) + " €");
            $("#hoursDay").append(response.daten.stunden + " Std.");
        }
        
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
    }); 

    // month
    var month = ("0" + (datum.getMonth() + 1)).slice(-2);
    monthString = datum.toLocaleString('default', { month: 'long' });
    $("#month").append(monthString);
    $.ajax({
        url: "http://localhost:8000/api/schicht/month/" +userID + "/" + month ,
        method: "get",
        dataType: "json",
    }).done(function (response) {
        if(response.daten.verdient == null){
            $("#salaryMonth").append(0 + " €");
            $("#hoursMonth").append(0+ " Std.");
        }
        else{
            $("#salaryMonth").append((response.daten.verdient).toFixed(2) + " €");
            $("#hoursMonth").append(response.daten.stunden + " Std.");
        }
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
    }); 

    // year
    var year = datum.getFullYear();
    $("#year").append(year);
    $.ajax({
        url: "http://localhost:8000/api/schicht/year/" +userID + "/" + year ,
        method: "get",
        dataType: "json",
    }).done(function (response) {
        if(response.daten.verdient == null){
            $("#salaryYear").append(0 + " €");
            $("#hoursYear").append(0+ " Std.");
        }
        else{
            $("#salaryYear").append((response.daten.verdient).toFixed(2) + " €");
            $("#hoursYear").append(response.daten.stunden + " Std.");
        }
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
    }); 

    // next shifts
    $.ajax({
        url: "http://localhost:8000/api/schicht/nextCount/" +userID + "/" + year ,
        method: "get",
        dataType: "json",
    }).done(function (response) {
        var anzahl = response.daten;
        for(i=1; i<anzahl; i++){
            $.ajax({
                url: "http://localhost:8000/api/schicht/next/" +userID + "/" + year + "/" + i,
                method: "get",
                dataType: "json",
            }).done(function (responseSchicht) {
                var arbeitgeberID = responseSchicht.daten.ArbeitgeberID;
                $.ajax({
                    url: "http://localhost:8000/api/arbeitgeber/gib/"+ arbeitgeberID,
                    method: "get",
                    dataType: "json",
                }).done(function (response) {
                    $("#nextShifts").append("<tr><td>" + response.daten.name + "</td>"
                                + "<td>" + new Date(responseSchicht.daten.Datum).toLocaleDateString() + "</td>"
                                + "<td>" + responseSchicht.daten.Startzeit +" - " + responseSchicht.daten.Endzeit + "</td>"
                                + "<td>" + responseSchicht.daten.Verdient.toFixed(2) +  " €</td></tr>");
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
   
});
 