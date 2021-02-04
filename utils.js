export const emailValidator = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email !== "" 
        && email.slice(-11, email.length) === "@hufs.ac.kr"
        && emailRegex.test(email)){
        return true;
    }
    return false;
}

export const formatTime = (time) => {
    let minutes;
    let seconds;
    if (time >= 60){
        minutes = parseInt(time / 60);
        seconds = time % 60;
    } else{
        minutes = 0;
        seconds = time;
    }
    if  (seconds < 10){
        return `${minutes}:0${seconds}`
    } else{
        return `${minutes}:${seconds}`
    }
}

export const getTimeStamp = (timeString) => {
    const current = new Date();
    const target = new Date(timeString);
    if (//same date
        current.getFullYear() === target.getFullYear()
        && current.getMonth() === target.getMonth()
        && current.getDate() === target.getDate()
    ){
        let hour = target.getHours();
        let minute = target.getMinutes();
        if (hour < 10){
            hour = `0${hour}`;
        }
        if (minute < 10){
            minute = `0${minute}`;
        }
        return `${hour}:${minute}`
    } else if (current.getFullYear() === target.getFullYear()){//same year
        return `${target.getMonth()+1}월 ${target.getDate()}일`
    } else{ //different year
        return `${target.getFullYear()}년 ${target.getMonth()+1}월 ${target.getDate()}일`
    }
}