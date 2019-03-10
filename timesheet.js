
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBTUnBz3WmPn8YOhxJfxqJns5lSqLrrvG4",
    authDomain: "fir-practice-300ab.firebaseapp.com",
    databaseURL: "https://fir-practice-300ab.firebaseio.com",
    projectId: "fir-practice-300ab",
    storageBucket: "fir-practice-300ab.appspot.com",
    messagingSenderId: "960973115209"
};

firebase.initializeApp(config);
var database = firebase.database();
console.log(database);
//creating variables 
var nextArrival = "";
var minutesAway = "";
var trainName = $("#trainName-input").val().trim();
var trainDestination = $("#destination-input").val().trim();
var trainFrequency = moment($("#frequency-input").val().trim(), "0000").format("X");
var trainTime = $("#firstTrainTime-input").val().trim();




database.ref("/Train-Table").on("child_added", function (snapshot) {
    var trainDiff = 0;
    var trainRem = 0;
    var minTillArrival = "";
    var nextTrainTime = "";
    var frequency = snapshot.val(frequency);
    console.log(this);

    //moment JS to figure out the time difference from current to first train.
    trainDiff = moment().diff(moment.unix(snapshot.val().time), "minutes");
    //calculate modulus time remaining
    trainRem = trainDiff % frequency;
    minTillArrival = frequency - trainRem;
    nextTrainTime = moment().minTillArrival, "m".format("hh:mm A");

    $("#train-data").append(
        "<tr><td>" + snapshot.val().Name + "</td>" +
        "<td>" + snapshot.val().destination + "</td>" +
        "<td>" + frequency + "</td>" +
        "<td>" + minTillArrival + "</td>" +
        "<td>" + nextTrainTime
    );

    $("#train-data").on("click", function () {
        console.log(this);
        var trainDB = database.ref("/trains/");
        console.log(trainDB);
    })
});


var userInput = function (event) {
    event.preventDefault();

    database.ref("/trains").push({
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency,
        nextTrainTime: nextTrainTime,
        minTillArrival: minTillArrival,
        date_added: firebase.database.ServerValue.TIMESTAMP,

    });
    //empty user form for next input
    trainName.val("");
    console.log(trainName);
    trainDestination.val("");
    console.log(trainDestination);
    trainTime.val("")
    console.log(trainTime);
    trainFrequency.val("");
    console.log(trainFrequency);
    event.preventDefault();

}

// Calls userINput function when submitted
$("#add").on("click", function (event) {
    if (trainName.val().length === 0 || trainDestination.val().length === 0 || trainTime.val().length === 0 || trainFrequency.val().length === 0) {
        alert("Please Fill in ALL fields");
    } else userInput(events);
    console.log(event);

});

        //I dont know why this isn't working.
        //What am I missing?






