function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; 

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    };

    secondTick()
    var resetCheck = -1
    resetCheck = reset()
    if (resetCheck == 0) {
        console.log("weeklyTimeReset")
    }
    else if (resetCheck == 1) {
        console.log("dailyTimeReset")
    }

    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);    
}


window.onload = function () {
    var haifiveMinutes = 60 * 25,
        display = document.querySelector('#time');
    startTimer(haifiveMinutes, display);
};


//daily/weekly resets
function secondTick() {
    if (localStorage.getItem("daily") === null) {
        localStorage.setItem("daily","0");
    }else if (localStorage.getItem("weekly") === null) {
        localStorage.setItem("weekly","0");
    }
    let dailyPrev = localStorage.getItem("daily");
    localStorage.setItem("daily",toString(dailyPrev+1));
    let weeklyPrev = localStorage.getItem("weekly");
    localStorage.setItem("daily",toString(weeklyPrev+1));
    dailySum =  localStorage.getItem("daily")
    dailyHours =  (((dailySum - (dailySum % 60)) / 60) - (((dailySum - (dailySum % 60)) / 60) & 60)) / 60;
    dailyMins =  ((dailySum - (dailyHours * 3600)) - ((dailySum - (dailyHours * 3600)) % 60)) / 60;
    dailySecs = (dailySum - (dailyHours * 3600) - (dailyMins * 60));
    weeklySum = localStorage.getItem("weekly")
    weeklyHours =  (((weeklySum - (weeklySum % 60)) / 60) - (((weeklySum - (weeklySum % 60)) / 60) & 60)) / 60;
    weeklyMins =  ((weeklySum - (weeklyHours * 3600)) - ((weeklySum - (weeklyHours * 3600)) % 60)) / 60;
    weeklySecs = (weeklySum - (weeklyHours * 3600) - (weeklyMins * 60));
    console.log("daily study time" + dailyHours + "hours" + dailyMins + "minutes" + dailySecs + "seconds");
    console.log("weekly study time" + weeklyHours + "hours" + weeklyMins + "minutes" + weeklySecs + "seconds");
};


//daily/weekly resets
function reset() {
    const now = new Date()
    if (now.getDay() == "1") {
        localStorage.clear();
        console.log("resetting weekly time");
        return(0)
    }else if (now.getHours() == "0" && now.getMinutes() == "0" && now.getSeconds() == "0") {
        localStorage.removeItem("daily");
        console.log("resetting daily time");
        return(1)
    };
}
