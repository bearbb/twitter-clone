export const sinceThen = (date) => {
  //create a new date with data
  const then = new Date(date);
  const now = new Date();
  let timeSinceThen;
  //Function calculate time since that post
  //if it smaller than an hour => show in min (m)
  //if it <day >hour => show in hour (h)
  // hour<it<month => show in day
  // rest show in month
  let millisecSinceThen = now - then;
  //smaller than a minutes => show in second (s)
  if (millisecSinceThen < 60000) {
    timeSinceThen = millisecSinceThen / 1000;
    return `${parseInt(timeSinceThen)}s`;
  } else {
    //convert to second
    timeSinceThen = millisecSinceThen / 1000;
    if (timeSinceThen > 60) {
      //convert to minutes
      timeSinceThen = timeSinceThen / 60;

      //if minutes greater than 60
      if (timeSinceThen > 60) {
        //convert to hours
        timeSinceThen = timeSinceThen / 60;

        //if hours > 24
        if (timeSinceThen > 24) {
          //convert to days
          timeSinceThen = timeSinceThen / 24;
          //if days > 30
          if (timeSinceThen > 30) {
            //convert to months
            timeSinceThen = timeSinceThen / 30;
            return `${parseInt(timeSinceThen)}months`;
          } else {
            return `${parseInt(timeSinceThen)}d`;
          }
        } else {
          return `${parseInt(timeSinceThen)}d`;
        }
      } else {
        return `${parseInt(timeSinceThen)}m`;
      }
    } else {
      return `${parseInt(timeSinceThen)}s`;
    }
  }
  //   let minutesSinceThen = millisecSinceThen / 60000;

  //   let hoursSinceThen = minutesSinceThen / 60;

  //   let daysSinceThen = hoursSinceThen / 24;

  //   let monthsSinceThen = daysSinceThen / 30;
  //   console.log(minutesSinceThen);
  //   console.log(hoursSinceThen);
  //   console.log(daysSinceThen);
};
