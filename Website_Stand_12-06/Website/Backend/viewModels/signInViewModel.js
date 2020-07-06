// registrieren
$(document).ready(function(){ 
    $("#signUpSuccess").hide();
    $("#reg_button").click(function() {
        
        // define function to reset warnings
        $.fn.resetError = function(){ 
            $('#benutzername').removeClass('form-control is-invalid').addClass('form-control');
            $('#vorname').removeClass('form-control is-invalid').addClass('form-control');
            $('#nachname').removeClass('form-control is-invalid').addClass('form-control');
            $('#email').removeClass('form-control is-invalid').addClass('form-control');
            $('#adresse').removeClass('form-control is-invalid').addClass('form-control');
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


    // button "abbrechen" was clicked
        $(".clean").click(function() {
            $.fn.resetError();
            $('#benutzername').val('');
            $('#vorname').val('');
            $('#nachname').val('');
            $('#email').val('');
            $('#adresse').val('');
            $('#plz').val('');
            $('#stadt').val('');
            $('#passwort').val('');
        });

        // button "registrieren" was clicked
        $("#setUser").click(function() {
            console.log("button setUser clicked");
            $.fn.resetError();

            // variable to check input error
            var check=0;

            var benutzername = $("#benutzername").val();
            if (benutzername == "") {
                $('#benutzername').removeClass('form-control').addClass('form-control is-invalid');
                $("#benutzernameError").show();
                check=1;
            } 
            var vorname = $("#vorname").val();
            if (vorname == "") {
                $('#vorname').removeClass('form-control').addClass('form-control is-invalid');
                $("#vornameError").show();
                check=1;
            } 
            var nachname =$("#nachname").val();
            if (nachname == "") {
                $('#nachname').removeClass('form-control').addClass('form-control is-invalid');
                $("#nachnameError").show();
                check=1;
            } 
            var email = $("#email").val();
            if (email == "") {
                $('#email').removeClass('form-control').addClass('form-control is-invalid');
                $("#emailError").show();
                check=1;
            } 
            var strasse = $("#adresse").val();
            if (strasse == "") {
                $('#adresse').removeClass('form-control').addClass('form-control is-invalid');
                $("#adresseError").show();
                check=1;
            } 
            var plz = $("#plz").val();
            if (plz == "") {
                $('#plz').removeClass('form-control').addClass('form-control is-invalid');
                $("#plzError").show();
                check=1;
            } 
            var stadt = $("#stadt").val();
            if (stadt == "") {
                $('#stadt').removeClass('form-control').addClass('form-control is-invalid');
                $("#stadtError").show();
                check=1;
            } 
            var passwort = $("#passwort").val();
            if (passwort == "") {
                $('#passwort').removeClass('form-control').addClass('form-control is-invalid');
                $("#passwortError").show();
                check=1;
            } 

            var obj = {benutzername, vorname, nachname, email,passwort, strasse, plz, stadt  };

            if (check == 1) {
                return;
            }

            $.ajax({
                url: "http://localhost:8000/api/user",
                method: "post",
                contentType: "application/json",
                data: JSON.stringify(obj),
            }).done(function (response) {
                console.log(response); 
                $("#abb").click();
                $("#signUpSuccess").show();
            }).fail(function (jqXHR, statusText, error) {
                console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
            });
            
        });
        
    });
});
