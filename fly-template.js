function parse(str) {
  var i,
      l,
      openCount = 0,
      startExpressionIndex = false,
      startIndex = 0,
      tokens = [];

  for (i = 0, l = str.length; i <= l; i++) {
    if (startExpressionIndex === false) {
      if (str[i] == '$' && str[i+1] == '{') {
        tokens.push({
          type: 'text',
          value: str.substring(startIndex, i)
        });
        startExpressionIndex = i;
      }
      continue;
    }

    if (str[i] == '{') {
      openCount++;
    }

    if (str[i] == '}' && --openCount == 0) {
      tokens.push({
        type: 'expression',
        value: str.substring(startExpressionIndex + 2, i)
      });
      startExpressionIndex = false;
      startIndex = i + 1;
    }
  }

  if (startIndex !== i) {
    tokens.push({
      type: 'text',
      value: str.substring(startIndex, i)
    });
  }

  return tokens;
}

function convert(tokens) {
  var fn = new Function(
    'return ' + tokens.map(function(token) {
      return token.type == 'text' ? JSON.stringify(token.value) : token.value;
    }).join(' + ') + ';'
  );
  return function sync(properties) {
    return fn.call(properties);
  };
}

module.exports = function(str) {
  return convert(parse(str));
};