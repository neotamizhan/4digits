
  function getDistance (original, guessed) {
    original = asArray(original);
    guessed = asArray(guessed);

    var b = arrayCommon(original, guessed).length;
    var a = 0;
    for (var i = 0; i < original.length; i++) {      
      if (original[i] == guessed[i])
        a++;
    };

    return a + "A" + b + "B";
  }


  // Helper Methods

  function asArray (a) {
    if (typeof(a) == "string")
      a = a.split('');

    return a;
  }

  function isNumberValid (num, digits) {
    return (num.length == digits && areDigitsUnique(num));
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


