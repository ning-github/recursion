// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  var result = obj;

  //null values should simply return "null" as string
  if (obj === null){
    return "null";
  }

  if (Array.isArray(obj)){
    for (var i = 0; i < obj.length; i++) {
      obj[i] = stringifyJSON(obj[i]); //recurse
    };
    result = "["+result+"]";
  }
  else if (typeof obj === "object"){ 
    var contents ="";
    for(var key in obj){
      //undefined and function properties don't go through
      if (obj[key]!==undefined && typeof obj[key]!=="function"){  
        var item="";
        item+=stringifyJSON(key)+":";   //recurse
        item+=stringifyJSON(obj[key]);  //recurse
        contents+=item+",";
      }
    }
    //to remove extra comma at end
    var edited = contents.substr(0, contents.length-1);
    result = "{"+edited+"}";
  }
  //the actual string-making (has to be a primitive value)
  else{
    //so that numbers and bools aren't turned to strings when they are property values
    if(typeof obj !== "string"){
      result=""+obj+"";
    }
    else{
      console.log("it ran");
      result = "\""+obj+"\"";
    }
  }

  return result;
};
