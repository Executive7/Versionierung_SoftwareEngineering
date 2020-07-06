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
    
    console.log("button gettaxes clicked");

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
        console.log(response);

        // .replace(/[""]/g, "") --> anführungszeichen löschen
        // Header ausfüllen
        benutzername = JSON.stringify(response.daten.benutzername).replace(/[""]/g, "");
        vorname = JSON.stringify(response.daten.vorname).replace(/[""]/g, "");
        nachname = JSON.stringify(response.daten.nachname).replace(/[""]/g, "");
        email = JSON.stringify(response.daten.email).replace(/[""]/g, "");
        strasse = JSON.stringify(response.daten.strasse).replace(/[""]/g, "");
        stadt = JSON.stringify(response.daten.stadt).replace(/[""]/g, "");
        plz = JSON.stringify(response.daten.plz).replace(/[""]/g, "");
        passwort = JSON.stringify(response.daten.passwort).replace(/[""]/g, "");

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
				data: JSON.stringify(obj)
            }).done(function (response) {
                
                console.log(response);
                location.reload();
            }).fail(function (jqXHR, statusText, error) {
                console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
            });
        });
     
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });   
});
 