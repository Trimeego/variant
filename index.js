'use strict';
var _ = require('underscore');

var nameParts = function(match){
  var parts = null;
  if(match&&match.length>0) {
    parts = _.compact(_.rest(match, 1));
  }
  return parts;
}

var capitalize = function(string)
{
  string = string.toLowerCase()
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  
module.exports = function(input){
  var name = input.replace(/\s/g, '')

  // I am not particularly enamored with these regex patterns.  Would be better to figure out how to capture a repeating pattern, but this works for now up to 6 segments or so.

  var hyphenRegex  = /^(\w(?:[a-z]|\d)*)(?:\-([\w\d]*))(?:\-([\w\d]*))?(?:\-([\w\d]*))?(?:\-([\w\d]*))?(?:\-([\w\d]*))?/
      , titleRegex = /^([A-Z](?:[a-z]|\d)*)(?:([A-Z](?:[a-z]|\d)*)?)(?:([A-Z](?:[a-z]|\d)*)?)(?:([A-Z](?:[a-z]|\d)*)?)(?:([A-Z](?:[a-z]|\d)*)?)(?:([A-Z](?:[a-z]|\d)*)?)/
      , camelRegex = /^([a-z](?:[a-z]|\d)*)(?:([A-Z](?:[a-z]|\d)*)?)(?:([A-Z](?:[a-z]|\d)*)?)(?:([A-Z](?:[a-z]|\d)*)?)(?:([A-Z](?:[a-z]|\d)*)?)(?:([A-Z](?:[a-z]|\d)*)?)/
      , snakeRegex = /^((?:[a-z]|\d)*)(?:\_((?:[a-z]|\d)*))(?:\_((?:[a-z]|\d)*))?(?:\_((?:[a-z]|\d)*))?(?:\_((?:[a-z]|\d)*))?(?:\_((?:[a-z]|\d)*))?/;

  var parts = nameParts(name.match(hyphenRegex))
  if(!parts){
    parts = nameParts(name.match(titleRegex))
    if(!parts){
      parts = nameParts(name.match(snakeRegex))
      if(!parts){
        parts = nameParts(name.match(camelRegex))
      }    
    }    
  }

  var result = {}
  result.titleCase= _.map(parts, function(w){
      return capitalize(w);
    }).join(' ');
  result.classCase = _.map(parts, function(w){
      return capitalize(w);
    }).join('')
  result.hyphenated = _.map(parts, function(w){
      return w.toLowerCase();
    }).join('-')
  result.snakeCase = _.map(parts, function(w){
      return w.toLowerCase();
    }).join('_')
  result.camelCase = _.map(parts, function(w, i){
    if(i == 0){
      return w.toLowerCase();
    } else {
      return capitalize(w);
    }
      
    }).join('')
  return result;
}
