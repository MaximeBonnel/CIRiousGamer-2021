function zoomin() {
    var myImg = document.getElementById("chartdiv");
    var currWidth = myImg.clientWidth;
    if (currWidth == 2500) return false;
    else {
        myImg.style.width = (currWidth + 100) + "px";
    }
}

function zoomout() {
    var myImg = document.getElementById("chartdiv");
    var currWidth = myImg.clientWidth;
    if (currWidth == 100) return false;
    else {
        myImg.style.width = (currWidth - 100) + "px";
    }
}