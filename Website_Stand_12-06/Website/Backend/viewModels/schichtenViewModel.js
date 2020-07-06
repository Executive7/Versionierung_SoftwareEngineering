// registrieren
$(document).ready(function(){ 

    $(".clean").click(function() {
        $('#bezeichnung').val('');
        $('#arbeitgeber').val('');
        $('#datum').val('');
        $('#startzeit').val('');
        $('#endzeit').val('');

        $('#bezeichnung').removeClass('form-control is-invalid').addClass('form-control');
        $('#arbeitgeber').removeClass('form-control is-invalid').addClass('form-control');
        $('#datum').removeClass('form-control is-invalid').addClass('form-control');
        $('#startzeit').removeClass('form-control is-invalid').addClass('form-control');
        $('#endzeit').removeClass('form-control is-invalid').addClass('form-control');
    });

    $("#setSchicht").click(function() {
        console.log("button setSchicht clicked");

        var check=0;

        var bezeichnung = $("#bezeichnung").val();
        if (bezeichnung == "") {
            $('#bezeichnung').removeClass('form-control').addClass('form-control is-invalid');
            check=1;
        } 
        var arbeitgeber = $("#arbeitgeber").val();
        if (arbeitgeber == "") {
            $('#arbeitgeber').removeClass('form-control').addClass('form-control is-invalid');
            check=1;
        } 
        var datum =$("#datum").val();
        if (datum == "") {
            $('#datum').removeClass('form-control').addClass('form-control is-invalid');
            check=1;
        } 
        var startzeit = $("#startzeit").val();
        if (startzeit == "") {
            $('#startzeit').removeClass('form-control').addClass('form-control is-invalid');
            check=1;
        } 
        var endzeit = $("#endzeit").val();
        if (endzeit == "") {
            $('#endzeit').removeClass('form-control').addClass('form-control is-invalid');
            check=1;
        } 

        var obj = {bezeichnung, arbeitgeber, datum, startzeit, endzeit};

        if (check == 0) {
            $("#abb").click()
        }

        $.ajax({
            url: "http://localhost:8000/api/schicht",
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
