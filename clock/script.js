var HomeTimeZoneOffset = 5.5;
var blah;


runClock(HomeTimeZoneOffset);
runHomeTime(HomeTimeZoneOffset);
function runHomeTime(HomeTimeZoneOffset){
    blah = setInterval(runClock, 1000, HomeTimeZoneOffset);
}



function runClock(timeZoneOffset){
    let localTime = new Date();
    let utc = localTime.getTime()+(localTime.getTimezoneOffset()*60000);
    let now = new Date(utc+(3600000*timeZoneOffset));
    
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

function addTimeZoneOptions()
{
var selectID = document.querySelectorAll("#timezone");
var optionElement;

for(var j=0; j< selectID.length; j++)
{

    for(var i=-12; i<=14; i+=0.5){
        optionElement = document.createElement('option');
      
      if(i>0)
      optionElement.innerText = "GMT+"+i;
      else
      optionElement.innerText = "GMT"+i;

      if(j === 0)
      optionElement.setAttribute('value',("home-time-"+optionElement.innerText)); 
      else
      optionElement.setAttribute('value',("foreign-time-"+optionElement.innerText)); 
      selectID[j].append(optionElement);
    }
}
}

window.addEventListener('load', addTimeZoneOptions);


document.querySelector("#timezone").addEventListener("change",()=>{
    clearInterval(blah);
    var ttt=document.querySelector("#timezone");
    //console.log( (ttt.options[ttt.selectedIndex].value).substr("home-time-GMT".length)  );
    HomeTimeZoneOffset = 1 * (ttt.options[ttt.selectedIndex].value).substr("home-time-GMT".length);
    //console.log(HomeTimeZoneOffset, " ", typeof(HomeTimeZoneOffset));
    
    runHomeTime(HomeTimeZoneOffset);
});



