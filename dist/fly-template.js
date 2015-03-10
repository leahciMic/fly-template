(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.flyTemplate = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function parse(str) {
  var i,
      l,
      openCount = 0,
      startExpressionIndex = false,
      startIndex = 0,
      tokens;

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
},{}]},{},[1])(1)
});