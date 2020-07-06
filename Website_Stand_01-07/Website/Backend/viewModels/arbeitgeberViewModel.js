// Arbeitgeber
$(document).ready(function(){ 
    var userID = localStorage.getItem("userID");
    console.log(userID);

    // get count arbeitgeber 
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
                console.log(response);
                $("tbody").append("<tr> <td>" + response.daten.name+ "</td>"
                                    +" <td>"+response.daten.stundenlohn.toFixed(2) +"€</td>"
                                    + "<td>" + response.daten.strasse + ", "
                                    + response.daten.plz + " "
                                    + response.daten.stadt + "</td>"
                                    + "<td class='icon_edit' ><button type='button' class='btn_edit' data-toggle='modal' data-target='#arbeitgeber_edit' >&#x2699;</button></td></tr>");
            }).fail(function (jqXHR, statusText, error) {
                console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
            });
        }
        
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
    });


    

    // save arbeitgeber
    $("#setArbeitgeber").click(function() {
        console.log("button setArbeitgeber clicked");
        
        var checkError = 0;

        var arbeitgeber = $("#nameArbeitgeber").val();
        if(arbeitgeber == ""){
            checkError = 1;
        }

         var lohn = $("#lohn").val();
         if(lohn == ""){
            checkError = 1;
        }

        var adresse = $("#strasseArbeitgeber").val();
        if(adresse == ""){
            checkError = 1;
        }

        var plz = $("#plzArbeitgeber").val();
        if(plz == ""){
            checkError = 1;
        }

        var stadt = $("#stadtArbeitgeber").val();
        if(stadt == ""){
            checkError = 1;
        }

        var obj = {userID, arbeitgeber, lohn, adresse, plz, stadt};
        console.log(obj);

        if(checkError == 1){
            return;
        }

        $.ajax({
            url: "http://localhost:8000/api/arbeitgeber",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify(obj),
        }).done(function (response) {
            console.log(response); 
            location.reload();
        }).fail(function (jqXHR, statusText, error) {
            console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        });
    });
  // update arbeitgeber

});

$(".btn_edit").click(function (){
    console.log("update ");
});