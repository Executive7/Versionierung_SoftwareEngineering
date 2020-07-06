

// login
$(document).ready(function(){
    $("#loginError").hide();
    $("#login_button").click(function() {
        console.log("button loginUser clicked");

        var benutzername = $("#user").val();
        var passwort = $("#pwd").val();

        $('#user').removeClass('form-control is-invalid').addClass('form-control');
        $('#pwd').removeClass('form-control is-invalid').addClass('form-control');

        

        if((benutzername === "")||(passwort === "")){
            $('#user').removeClass('form-control').addClass('form-control is-invalid');
            $('#pwd').removeClass('form-control').addClass('form-control is-invalid');
            $("#loginError").show();
            return;
        }

        var obj = {benutzername, passwort};

        $.ajax({
            url: "http://localhost:8000/api/user/existiert/"+benutzername + "/"+ passwort,
            method: "get",
            dataType: "json",
        }).done(function (response) {
            window.location.href = "dashboard.html";
            console.log(response);    
            // userID zur nächsten Seite
            var id = JSON.stringify(response.daten.id);      
            localStorage.setItem("userID", id);
        }).fail(function (jqXHR, statusText, error) {
            $("#loginError").show();
            $('#user').removeClass('form-control').addClass('form-control is-invalid');
            $('#pwd').removeClass('form-control').addClass('form-control is-invalid');
            console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        });
    });
});
