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