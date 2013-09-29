  // Helper Methods

  function asArray (a) {
    if (typeof(a) == "string")
      a = a.split('');

    return a;
  }

  function isNumberValid (num) {
    return (num.length == 4 && areDigitsUnique(num));
  }

  function areDigitsUnique (num) {    
    var num_array = num.split('');
    return num_array.length == arrayUnique(num_array).length;
  }

  var arrayUnique = function (a) {
    return a.reduce(function(p, c) {
        if (p.indexOf(c) < 0) p.push(c);
        return p;
    }, []);
  };

  var arrayCommon = function (a, b) {
    return a.filter(function(n) {
      return b.indexOf(n) != -1
    });
  }


