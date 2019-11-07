var config = {
    apiKey: "AIzaSyDlknVL6xqR8tZdt0WukhqzqQnzbctejxU",
    authDomain: "train-schedule-b2190.firebaseapp.com",
    databaseURL: "https://train-schedule-b2190.firebaseio.com",
    projectId: "train-schedule-b2190",
    storageBucket: "train-schedule-b2190.appspot.com",
    messagingSenderId: "333332172233"
  };
    firebase.initializeApp(config);
  
    var database = firebase.database();
  
  $("#addDestinationButton").on("click", function(event) {
    event.preventDefault();
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrainTime = moment($("#firstTrainInput").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequencyInput").val().trim();
    
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);
  
    var newDestinationComplete = {
      trainNameBase: trainName,
      destinationBase: destination,
      firstTrainTimeBase: firstTrainTime,
      frequencyBase: frequency
    };
  
    database.ref().push(newDestinationComplete);
  
    console.log(newDestinationComplete.trainNameBase);
    console.log(newDestinationComplete.destinationBase);
    console.log(newDestinationComplete.firstTrainTimeBase);
    console.log(newDestinationComplete.frequencyBase);
  
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().trainNameBase;
    var destination = childSnapshot.val().destinationBase;
    var firstTrainTime = childSnapshot.val().firstTrainTimeBase;
    var frequency = childSnapshot.val().frequencyBase;
    var minusYearFirstTrainTime = moment.unix(firstTrainTime, "hh:mm").subtract(1, "years");
    var timeNow = moment();
    var timeDifference = moment().diff(moment(minusYearFirstTrainTime), "minutes");
    console.log("First Arrival: " +minusYearFirstTrainTime);
    console.log("Time Now: " +timeNow);
    console.log("difference: " + timeDifference)
    var timeRemainder = timeDifference % frequency;
    var minutesTillTrain = frequency - timeRemainder;
    var nextTrainTime = moment().add(minutesTillTrain, "minutes");
    var formatNextTrainTime = moment(nextTrainTime).format("hh:mm");
    var formatFirstTrainTime = moment(firstTrainTime).format("hh:mm");
    console.log(minutesTillTrain);
    console.log(formatNextTrainTime);
    console.log(formatFirstTrainTime);
    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + formatNextTrainTime + "</td><td>" + minutesTillTrain + "</td></tr>")
  });