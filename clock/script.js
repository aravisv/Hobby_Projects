runClock();
setInterval(runClock, 1000);
function runClock(){
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let sec = now.getSeconds();
    let am_or_pm = "AM";
    let time,today;
    let DD = now.getDate();
    let MM = now.getMonth()+1;
    let YYYY = now.getFullYear();

    if(hour>12){
        hour -= 12;
        am_or_pm = "PM";
    }

    if(hour<10){
        hour = "0" + hour;
    }

    if(minutes<10){
        minutes = "0" + minutes; 
    }

    if(sec < 10){
        sec = "0" + sec;
    }

    time = hour + " : " + minutes + " : " + sec + " " + am_or_pm;  
    today = DD + "/" + MM + "/" + YYYY;
    
    document.getElementsByClassName("clock")[0].querySelector("h1").innerText = time;
    document.getElementsByClassName("clock")[0].querySelector("h2").innerText = today;
}
