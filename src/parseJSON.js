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
//as we traverse, 
//if currentChar === "", then the end of the string has been reached

/////// define function to skip whitespace

  var skipSpace = function(){
    while (currentChar && currentChar <= " "){
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
    // console.log(currentChar);
    // console.log(numString);

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

    // console.log(currentChar);

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

  var escapees = {
    '"': '"',
    '\\': '\\',
    '/': '/',
    b: 'b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t' 
  };

  var stringCheck = function(){
    var string = "";
    if (currentChar === '"') { //open quote
      next();
      while(currentChar) {

        if (currentChar === '"') { //close quote
          next();
          return string;
        }
        else if (currentChar === "\\") {
          next();
          if (typeof escapees[currentChar] === "string") {
            string+=escapees[currentChar];
            next();
          }
          else {
            break;
          }
        }
        else{
          string+=currentChar;
          next();
        }
      }
    }
  }; 

  var objectCheck = function(){
    var obj = {};

    // console.log(currentChar);

    if (currentChar === "{") {
      next();
      skipSpace();

      if (currentChar === "}") {
        next();
        return obj;
      }
      
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
      return numCheck();  
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
      console.log("negativeCheck");
      return numCheck();
    }
  };

  //numcheck and boolcheck are checking the whole body
  next();
  var answer = checkAll();
  skipSpace();  //for end space padding

  // console.log("final check: " + currentChar);
  if (currentChar){         //if traversal through the string has successfully completed
    return "EROROROROR";    //   then currentChar should be "" and eval to false
  }

  return answer;
};

// var last = '{\r\n' +
//     '          "glossary": {\n' +
//     '              "title": "example glossary",\n\r' +
//     '      \t\t"GlossDiv": {\r\n' +
//     '                  "title": "S",\r\n' +
//     '      \t\t\t"GlossList": {\r\n' +
//     '                      "GlossEntry": {\r\n' +
//     '                          "ID": "SGML",\r\n' +
//     '      \t\t\t\t\t"SortAs": "SGML",\r\n' +
//     '      \t\t\t\t\t"GlossTerm": "Standard Generalized ' +
//     'Markup Language",\r\n' +
//     '      \t\t\t\t\t"Acronym": "SGML",\r\n' +
//     '      \t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n' +
//     '      \t\t\t\t\t"GlossDef": {\r\n' +
//     '                              "para": "A meta-markup language,' +
//     ' used to create markup languages such as DocBook.",\r\n' +
//     '      \t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n' +
//     '                          },\r\n' +
//     '      \t\t\t\t\t"GlossSee": "markup"\r\n' +
//     '                      }\r\n' +
//     '                  }\r\n' +
//     '              }\r\n' +
//     '          }\r\n' +
//     '      }\r\n';

// console.log(parseJSON(last));

