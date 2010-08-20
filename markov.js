/*sample regexes:

 /./g - every letter
 /../g - every two letter
 /[.,?"();\-!':—^\w]+ /g - every word
 /([.,?"();\-!':—^\w]+ ){2}/g - every two words 

*/ 
var markov = function(input, type, reg) {
  var data;
  if (type == "string") {
    data = {};
    s = input.match(reg);
    for (var i = 0; i < s.length-1; i++) {
      if(s[i] in data) {
        if (s[i+1] in data[s[i]]) {
          data[s[i]][s[i+1]]++;
        } else {
          data[s[i]][s[i+1]] = 1;
        }
      } else {
        data[s[i]] = new Object();
        data[s[i]][s[i+1]] = 1;
      }
    }
  } else if (type == "json") {
    data = eval("(" + input + ")");
  }
  this.data = data;
  
  var gen = function(l) {
    var sanitycheck = false;
    var out = new Array();
    while (sanitycheck == false) {
      sanitycheck = true;
      var rProperty = findRandomProperty(data);
      var rList = expand(rProperty);
      var l1 = rList.length;
      out[0] = rList[Math.round(Math.random() * l1)];
      if (typeof out[0] == "undefined") { sanitycheck = false; }
      if (sanitycheck) {
        for (var i = 0; i < l-1; i++) {
          var usableLength = expand(data[out[i]]).length-1;
          var randomInt = Math.round(Math.random() * usableLength);
          var nextLetter = expand(data[out[i]])[randomInt];
          out.push(nextLetter);
        }
      }
    }
    return out.join("");
  }
  this.gen = gen;
  
  var findRandomProperty = function(o) {
    l1 = 0;
    for (i in o) {
      l1++;
    }
    var r1 = Math.round(Math.random() * l1);
    l2 = 0;
    for (i in o) {
      l2++;
      if (l2 == r1) {
        return o[i];
      }
    }
  }
  
  var expand = function(obj) {
    oArray = new Array();
    for (var prop in obj) {
      for (var i = 0; i < obj[prop]; i++) {
        oArray.push(prop);
      }
    }
    return oArray;
  }
  
  var getJson = function() {
    if (typeof JSON === "object") {
      return JSON.stringify(data);
    }
  }
  this.getJson = getJson;
}