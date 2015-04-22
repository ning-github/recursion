// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here

  var currentChar = "";
  var currentInd = 0;
 ////// define next function to traverse

  var next = function(){
    currentChar = json.charAt(currentInd);
    currentInd++; //this moves the currentInd in PREP for the next call
    return currentChar; 
  }; 
//NOOOOOOOOOOOOOOOOOOTE: as we traverse, 
//    if currentChar === "", then the end of the string has been reached

/////// define variable to skip whitespace

  var skipSpace = function(){
    while (currentChar === " "){
      next();
    };
  };

/////// check if Number   
  var numCheck = function(){
    var numString="";

    if (currentChar === "-") {
      numString+="-";
    } 

    while (/[0-9]/.test(currentChar)){
      numString+=currentChar;
      next();
    }
    if (currentChar === ".") {
      numString+=".";
      next();
      while (/[0-9]/.test(currentChar)){
        numString+=currentChar;
        next();
      }
    }
    skipSpace();
    console.log(currentChar);
    console.log(numString);

    if (!(isNaN(+numString))){

      return +numString;
    }  
  };

/////// check if Bool    
  var boolCheck = function(){


    //check for true
    if (currentChar === "t") {
      var trueLetters = json.substr(currentInd-1,4);
      
      if (trueLetters === "true"){
        next();
        next();
        next();
        next();
      }
      //now currentChar has advanced to what is after "true"
      skipSpace();
      return true;
    }
    //check for false
    else if (currentChar === "f") {
      var falseLetters = json.substr(currentInd-1,5);

      if (falseLetters==="false"){
        next();
        next();
        next();
        next();
        next();
      }
      //now currentChar has advanced to what is after "false"
      skipSpace();
      return false;
    }
    else if (currentChar === "n") {
      var nullLetters = json.substr(currentInd-1,4);

      if (nullLetters === "null") {
        next();
        next();
        next();
        next();
      }
      skipSpace();
      return null;
    }
  };

/////// check if Array
  var arrayCheck = function(){
    var array = []; //already assumes an array

    console.log(currentChar);

    if (currentChar === "["){
      next();
      skipSpace();
      //for an empty array
      if (currentChar === "]"){
        next();
        return array;
      }
      //now we reach the array's first element
      while (currentChar) { // "",which is the end of the string, evaluates to false
        var value = checkAll(); //checkAll function for the recurision
        array.push(value);
        skipSpace();

        //if (currentChar is "]" or "," !! figure out what to do for each)
        if (currentChar === "]")  { //then you know the array has ended
          next();
          skipSpace();
          return array;          
        }

        if (currentChar === ",") {
          next();
          skipSpace();
        }
      } //end while loop
    }    
  };

  var stringCheck = function(){
    var string = "";
    if (currentChar === '"') { //open quote
      next();
      while(currentChar !== '"') {
        string+=currentChar;
        next();
      }
      if (currentChar === '"') { //close quote
        next();
        return string;
      }
    }
  }; 

  var objectCheck = function(){
    var obj = {};

    console.log(currentChar);

    if (currentChar === "{") {
      next();
      skipSpace();

      if (currentChar === "}") {
        next();
        return obj;
      }
      ////////////stopped off here. first should find out how to address strings.
      //actually....can just try to detect strings here by looking for open and end quotes
      //  this is because any accepted strings are either property names OR values. 
      
      while(currentChar){
        //ALL property names are strings
        var key = stringCheck();
        skipSpace();

        //should now be at the : 
        if (currentChar === ":") {
          next();
          skipSpace();
          var value = checkAll();
          obj[key] = value;
        }

        skipSpace();
        if (currentChar === ",") {
          next();
          skipSpace();
        }

        if (currentChar === "}") {
          next();
          return obj;
        }
      }
    }    
  };

  var checkAll = function(){
    skipSpace();  //for front space padding

    console.log("this is currentChar");
    console.log(currentChar);

    if (currentChar === "[") {
      console.log("calling arrayCheck");
      return arrayCheck();
    }

    if (/[0-9]/.test(currentChar)) {
      console.log("calling numCheck");
      //return numCheck();  
    }

    if (currentChar === "f" || currentChar === "t" || currentChar === "n") { 
      console.log("calling boolCheck");
      return boolCheck();
    }

    if (currentChar === "{") {
      console.log("calling objectCheck");
      return objectCheck();
    }

    if (currentChar === '"') {
      console.log("stringCheck");
      return stringCheck();
    }

    if (currentChar === "-"){
      return numCheck();
    }

    if (currentChar === "."){
      console.log("decimal problem");
      return null;  //this is NOT enough, needs to know hwo to handle in numCheck
    }


  };

  //numcheck and boolcheck are checking the whole body
  next();
  var answer = checkAll();
  skipSpace();  //for end space padding

  console.log("final check: " + currentChar);
  if (currentChar){         //if traversal through the string has successfully completed
    return "EROROROROR";    //   then currentChar should be "" and eval to false
  }

  return answer;
};

// var parseJSON = function(json) {
//   // your code goes here

//   var currentChar = "";
//   var currentInd = 0;
//  ////// define next function to traverse

//   var next = function(){
//     currentChar = json.charAt(currentInd);
//     currentInd++; //this moves the currentInd in PREP for the next call
//     return currentChar; 
//   }; 
// //NOOOOOOOOOOOOOOOOOOTE: as we traverse, 
// //    if currentChar === "", then the end of the string has been reached

// /////// define variable to skip whitespace

//   var skipSpace = function(){
//     while (currentChar === " "){
//       next();
//     }
//   };

// /////// check if Number   
//   var numCheck = function(){
//     var numString=""; 

//     while (/[0-9]/.test(currentChar)){
//       numString+=currentChar;
//       next();
//     }
//     skipSpace();
//     // console.log(currentChar);
//     // console.log(numString);

//     if (!(isNaN(+numString))){

//       return +numString;
//     }  
//   };

// /////// check if Bool    
//   var boolCheck = function(){
//     //check for true
//     if (currentChar === "t") {
//       var trueLetters = json.substr(currentInd-1,4);
      
//       if (trueLetters === "true"){
//         next();
//         next();
//         next();
//         next();
//       }
//       //now currentChar has advanced to what is after "true"
//       skipSpace();
//       return true;
//     }
//     //check for false
//     else if (currentChar === "f") {
//       var falseLetters = json.substr(currentInd-1,5);

//       if (falseLetters==="false"){
//         next();
//         next();
//         next();
//         next();
//         next();
//       }
//       //now currentChar has advanced to what is after "false"
//       skipSpace();
//       return false;
//     }
//     else if (currentChar === "n") {
//       var nullLetters = json.substr(currentInd-1,4);

//       if (nullLetters === "null") {
//         next();
//         next();
//         next();
//         next();
//       }
//       skipSpace();
//       return null;
//     }
//   };

// /////// check if Array
//   var arrayCheck = function(){
//     var array = []; //already assumes an array
//     // console.log(currentChar);

//     if (currentChar === "["){
//       next();
//       skipSpace();
//       //for an empty array
//       if (currentChar === "]"){
//         next();
//         return array;
//       }
//       //now we reach the array's first element
//       while (currentChar) { // "",which is the end of the string, evaluates to false
//         var value = checkAll(); //checkAll function for the recurision
//         array.push(value);
//         skipSpace();

//         //if (currentChar is "]" or "," !! figure out what to do for each)
//         if (currentChar === "]")  { //then you know the array has ended
//           next();
//           skipSpace();
//           return array;          
//         }

//         if (currentChar === ",") {
//           next();
//           skipSpace();
//         }
//       } //end while loop
//     }    
//   };

//   var stringCheck = function(){
//     var string = "";
//     if (currentChar === '"') { //open quote
//       next();
//       while(currentChar !== '"') {
//         string+=currentChar;
//         next();
//       }
//       if (currentChar === '"') { //close quote
//         next();
//         return string;
//       }
//     }
//   }; 

//   var objectCheck = function(){
//     var obj = {};
//     // console.log(currentChar);
//     if (currentChar === "{") {
//       next();
//       skipSpace();

//       if (currentChar === "}") {
//         next();
//         return obj;
//       }
//       ////////////stopped off here. first should find out how to address strings.
//       //actually....can just try to detect strings here by looking for open and end quotes
//       //  this is because any accepted strings are either property names OR values. 
      
//       while(currentChar){
//         //ALL property names are strings
//         var key = stringCheck();
//         skipSpace();

//         //should now be at the : 
//         if (currentChar === ":") {
//           next();
//           skipSpace();
//           var value = checkAll();
//           obj[key] = value;
//         }

//         skipSpace();
//         if (currentChar === ",") {
//           next();
//           skipSpace();
//         }

//         if (currentChar === "}") {
//           next();
//           return obj;
//         }
//       }
//     }    
//   };

//   var checkAll = function(){
//     skipSpace();  //for front space padding

//     // console.log("this is currentChar");
//     // console.log(currentChar);

//     if (currentChar === "[") {
//       // console.log("calling arrayCheck");
//       return arrayCheck();
//     }

//     if (/[0-9]/.test(currentChar)) {
//       // console.log("calling numCheck");
//       return numCheck();  
//     }

//     if (currentChar === "f" || currentChar === "t" || currentChar === "n") { 
//       // console.log("calling boolCheck");
//       return boolCheck();
//     }

//     if (currentChar === "{") {
//       // console.log("calling objectCheck");
//       return objectCheck();
//     }
  
//     if (currentChar === '"') {
//       return stringCheck();
//     }

//   };

//   //numcheck and boolcheck are checking the whole body
//   next();
//   var answer= checkAll();
//   skipSpace();  //for end space padding

//   // console.log("final check: " + currentChar);
//   return answer;
// };

// var z = parseJSON(JSON.stringify({apple:1, peas: "I hate peas", pear: 3}));
// console.log(z);
