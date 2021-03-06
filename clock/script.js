var HomeTimeZoneOffset = 5.5;
//var blah;
var homeTimeIntervalID;
const homeClockNumber = 0;
var clockNumber = 0;

runClock(HomeTimeZoneOffset,homeClockNumber);
runHomeTime(HomeTimeZoneOffset);
function runHomeTime(HomeTimeZoneOffset){
    homeTimeIntervalID = setInterval(runClock, 1000, HomeTimeZoneOffset, homeClockNumber);
}

function runClock(timeZoneOffset, clockNumber){
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
    today = ('0' + now.getDate()).slice(-2) + '/' + ('0' + (now.getMonth()+1)).slice(-2) + '/' + now.getFullYear();

    //document.getElementsByClassName("clock")[0].querySelector("h1").innerText = time;
    document.querySelectorAll(".clock")[clockNumber].querySelector("h1").innerText = time;
    document.querySelectorAll(".clock")[clockNumber].querySelector("h2").innerText = today;
}

var selectID = document.querySelectorAll("#timezone");
var optionElement;

function addTimeZoneOptions1()
{
for(var j=0; j< selectID.length; j++)
{
    for(var i=-12; i<=14; i+=0.5){
        optionElement = document.createElement('option');
      
      if(i>0)
      optionElement.innerText += "GMT+"+i;
      else
      optionElement.innerText += "GMT"+i;

      if(j === 0)
      optionElement.setAttribute('value',("home-time-"+optionElement.innerText)); 
      else
      optionElement.setAttribute('value',("foreign-time-"+optionElement.innerText)); 
      selectID[j].append(optionElement);
    }
}
}

let addClockButton = document.getElementById("add-clock-button");

function addTimeZoneOptions2()
{
    for(var i=-12; i<=14; i+=0.5){
        optionElement = document.createElement('option');
      
      if(i>0)
      optionElement.innerText += "GMT+"+i;
      else
      optionElement.innerText += "GMT"+i;

      optionElement.setAttribute('value',("foreign-time-"+optionElement.innerText)); 
      addClockButton.append(optionElement);      

    }
}

window.addEventListener('load', addTimeZoneOptions1);
window.addEventListener('load', addTimeZoneOptions2);


for(var j=0; j< selectID.length; j++)
{
    
    if( j === 0){
        selectID[j].addEventListener("change",()=>{
            clearInterval(homeTimeIntervalID);
            //ttt = document.querySelectorAll("#timezone")[0];
            //console.log( (ttt.options[ttt.selectedIndex].value).substr("home-time-GMT".length)  );           

            HomeTimeZoneOffset = 1 * (selectID[0].options[selectID[0].selectedIndex].value).substr("home-time-GMT".length);
            //console.log(HomeTimeZoneOffset, " ", typeof(HomeTimeZoneOffset));
            
            runHomeTime(HomeTimeZoneOffset, homeClockNumber);            
        });
    }
}


addClockButton.addEventListener("change",()=>{

    //add this value as class
    console.log(addClockButton.options[addClockButton.selectedIndex].value);

    var parent = document.querySelector(".my-grid");
    var child1 = document.createElement('div');
    var child11 = document.createElement('div');
    child11.classList.add("delete-clock-button");
    
    var deleteIcon = document.createElement('i');  

    deleteIcon.classList.add("fa-solid","fa-trash-can");
            
    child1.classList.add("clock");
    child1.classList.add("foreign-time");
    
    var foreignClockTimeZone = addClockButton.options[addClockButton.selectedIndex].value.substr("foreign-time-GMT".length);

    deleteIcon.setAttribute('onclick', 'deleteThisClock(this)' );

    child11.append( ("GMT" + foreignClockTimeZone) , deleteIcon);

    var grandChild = document.createElement('div');
    grandChild.setAttribute('class', "time-and-date");
    
    grandChild.append(document.createElement('h1') , document.createElement('h2') );
    
    child1.append(grandChild);
    parent.append(child1);
    child1.append(child11);

    clockNumber = clockNumber + 1;
    console.log(clockNumber);
    runClock(foreignClockTimeZone,clockNumber);
    setInterval(runClock , 1000, foreignClockTimeZone, clockNumber);

    //delete this option from select tag
    addClockButton.options[addClockButton.selectedIndex].remove();
}
);

function deleteThisClock(clockToDelete){
    console.log(this);
}