// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
){
  // your code here
  var output = [];
  //begin with all nodes (since technically, <body> can hold a class attr)
  var allNodes = document.childNodes;

  var testThisLevel = function(children){
    for (var i = 0; i < children.length; i++) {
      var current = children[i];
      // the undefined check will filter out text nodes and unenumerable properties
      if (current.classList !== undefined && current.classList.contains(className)){
          output.push(current);
      } 
      //recursive call is enclosed under a limiting if statement
      if (current.childNodes.length>0){
        testThisLevel(current.childNodes);
      }
    };
  };
  
  testThisLevel(allNodes);
  return output;
};
