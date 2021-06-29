

function getBathValue() {
    var uibath = document.getElementsByName("uiBathrooms");
    for (var i in uibath) {
        if (uibath[i].checked) {
            return parseInt(i);
        }
    }
    return -1;
}

function getBhkValue() {
    var uibhk = document.getElementsByName("uiBHK");
    for (var i in uibhk) {
        if (uibhk[i].checked) {
            return parseInt(i);
        }
    }
    return -1;
}

function onClickedEstimatePrice() {
    console.log("Final Estimated Price");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBhkValue();
    var bath = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice")

    var url = "http://127.0.0.1:5000/predict_home_price";
    if(bath==-1 || bhk==-1 || location.value=="")
    {

    }
    else
    {
    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bath,
        location: location.value
    }, function (data, status) {
        console.log(data.estimated_price)
        estPrice.innerHTML = "<h2>" + data.estimated_price + " LAKHS</h2>";
        console.log(status);
    });
}
}


function onPageLoad() {
    console.log("Document Loading Started");
    var url = "http://127.0.0.1:5000/get_location_names";
    $.get(url, function (data, status) {
        console.log("Get response from get_location_names");
        if (data) {
            var loc = data.locations;
            var uiloc = document.getElementById("uiLocations");

            for (var i in loc) {
                var tmp = new Option(loc[i]);
                $('#uiLocations').append(tmp);
            }
        }
    });
}

window.onload = onPageLoad;



