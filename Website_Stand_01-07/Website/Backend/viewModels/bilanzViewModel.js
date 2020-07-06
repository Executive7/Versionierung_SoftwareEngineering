function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 1300);
    });
  }

$(document).ready(function(){
    $("#tabelleBilanz").hide();
    $("#zeitraum").click(function(){
        $("#salaryOverall").empty();
        var userID = localStorage.getItem("userID");
        var from = new Date($("#start").val());
        var to = new Date($("#end").val());
    
    var data = [];
    var insgesamt = 0;
    
    $.ajax({
        url: "http://localhost:8000/api/arbeitgeber/anzahl/" +userID ,
        method: "get",
        dataType: "json",
    }).done(function (response) {
        var anzahl = response.daten;
        var counter = 0;
        for(i=0; i<anzahl; i++){
            $.ajax({
                url: "http://localhost:8000/api/schicht/fromTo/" +from.toISOString() + "/" + to.toISOString() + "/" + userID + "/" + i,
                method: "get",
                dataType: "json",
            }).done(function (response) {
                $("#tabelleBilanz").show();
                console.log("das wahere" + response.daten.name);
                data.push({y : response.daten.verdient , name: response.daten.name});
                insgesamt += response.daten.verdient;
                // create chart
                var options = {
                    exportEnabled: true,
                    animationEnabled: true,
                    title:{
                        text: "Bilanz"
                    },
                    legend:{
                        horizontalAlign: "right",
                        verticalAlign: "center"
                    },
                    data: [{
                        type: "pie",
                        showInLegend: true,
                        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
                        indexLabel: "{name}",
                        legendText: "{name} (#percent%)",
                        indexLabelPlacement: "inside",
                        dataPoints: data
                    }]
                };
               
                $("#chartContainer").CanvasJSChart(options);
                if(response.daten.verdient != null){
                    $("#salaryOverall").append("<tr><td>" +response.daten.name + "</td>"
                                                + "<td>" + response.daten.verdient.toFixed(2) +"€</td></tr>");
                }else{
                    $("#salaryOverall").append("<tr><td>" +response.daten.name + "</td>"
                                                + "<td>" + 0 +"€</td></tr>");
                }
                
            }).fail(function (jqXHR, statusText, error) {
                console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
            }); 
        }
        async function asyncCall() {
            const result = await resolveAfter2Seconds();
            $("#salaryOverall").append('<tr class="bilanz_border">'
                            + '<th scope="col">Gesamt:</th>'
                            + '<td>' + insgesamt.toFixed(2)+ '€</td></tr>');
        }
    asyncCall();
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
    }); 



  
    });
});