

$(document).ready(function(){

    //this is my firebas configuration
    var config = {
        apiKey: "AIzaSyBNQFogtyIQdRMzvdme0E5bte59mJA8z3s",
        authDomain: "new-train-schedule-d3bdf.firebaseapp.com",
        databaseURL: "https://new-train-schedule-d3bdf.firebaseio.com",
        projectId: "new-train-schedule-d3bdf",
        storageBucket: "",
        messagingSenderId: "606102389386"
      };
      firebase.initializeApp(config)
      var trainData = firebase.database()
      
      
  // this is my event listener function

  $("#trainBtn").on("click", function(event){
      event.preventDefault()
      var name = $("#trainName").val().trim();
      var destination  = $("#destination").val().trim();
      //convert firstrain time into military time
      var firstTrain = moment($("#firstTrain").val().trim(), "HH:mm").subtract(1, "year").format("x")
      var frequency = $("#frequency").val().trim();
      var trainData = firebase.database()
      
      var newTrain = {
          name : name,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
          

      }
     
     
      trainData.ref().push(newTrain)
     })
     //this is the function to retrieve data from firebase and to display on the screen
        trainData.ref().on("child_added",function(snapshop){
         var name = snapshop.val().name
         var destination = snapshop.val().destination
         var firstTrain = snapshop.val().firstTrain
         var frequency = snapshop.val().frequency
          var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency
          var minutes = frequency - remainder
          console.log(moment())
          var newArrival = moment().add(minutes).format("HH:mm A")
      
         $("#trainTable tbody").append("<tr><td>" + name +"</td><td>"+ destination + "</td><td>"+ frequency+ "</td><td>"+ newArrival + "</td><td>" + minutes + "</td></tr>")
         
         
     })

})
