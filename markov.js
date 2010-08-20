var markov = function(inputString, l) {
  data = {};
  s = inputString.split("");
  for (var i = 0; i < s.length-1; i++) {
    if(s[i] in data) {
      data[s[i]].push(s[i+1]);
    } else {
      data[s[i]] = new Array(s[i+1]);
    }
  }
  this.data = data;
  out = new Array(data[s[0]][0]);
  for (var i = 0; i < l; i++) {
    var usableLength = data[out[i]].length-1;
    var randomInt = Math.round(Math.random() * usableLength);
    var nextLetter = data[out[i]][randomInt]
    //var nextLetter = data[out[i]][Math.random()*data[out[i]].length-1];
    out.push(nextLetter);
  }
  console.log(out.join(""));
}