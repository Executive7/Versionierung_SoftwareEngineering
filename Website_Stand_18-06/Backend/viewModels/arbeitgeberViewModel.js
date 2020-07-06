// Arbeitgeber
$(document).ready(function(){ 

    $(".clean").click(function() {
        $('#arbeit').val('');
        $('#lohn').val('');
        $('#adresse').val('');
        $('#plz').val('');
        $('#stadt').val('');

        $('#arbeit').removeClass('form-control is-invalid').addClass('form-control');
        $('#lohn').removeClass('form-control is-invalid').addClass('form-control');
        $('#adresse').removeClass('form-control is-invalid').addClass('form-control');
        $('#plz').removeClass('form-control is-invalid').addClass('form-control');
        $('#stadt').removeClass('form-control is-invalid').addClass('form-control');
    });

    $("#setArbeitgeber").click(function() {
        console.log("button setArbeitgeber clicked");

        var check=0;

        var arbeit = $("#arbeit").val();
        if (arbeit == "") {
            $('#arbeit').removeClass('form-control').addClass('form-control is-invalid');
            check=1;
        } 
        var lohn = $("#lohn").val();
        if (lohn == "") {
            $('#lohn').removeClass('form-control').addClass('form-control is-invalid');
            check=1;
        } 
        var adresse =$("#adresse").val();
        if (adresse == "") {
            $('#adresse').removeClass('form-control').addClass('form-control is-invalid');
            check=1;
        } 
        var plz = $("#plz").val();
        if (plz == "") {
            $('#plz').removeClass('form-control').addClass('form-control is-invalid');
            check=1;
        } 
        var stadt = $("#stadt").val();
        if (stadt == "") {
            $('#stadt').removeClass('form-control').addClass('form-control is-invalid');
            check=1;
        } 
        userID = 1;        //localStorage.getItem("userID");
        var obj = {userID, arbeit, lohn, adresse, plz, stadt};

        if (check == 0) {
            $("#abb").click()
        }

        $.ajax({
            url: "http://localhost:8000/api/arbeitgeber",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify(obj)
        }).done(function (response) {
            console.log(response);   
        }).fail(function (jqXHR, statusText, error) {
            console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        });
    });
});
