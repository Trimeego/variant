/*global describe before it */
'use strict';
var variant = require('../index.js');
var assert  = require('assert');


var assertProperOutput = function(variants){
  assert(variants.camelCase === "simpleTestInput");
  assert(variants.classCase === "SimpleTestInput");
  assert(variants.hyphenated === "simple-test-input");
  assert(variants.titleCase === "Simple Test Input");
  assert(variants.snakeCase === "simple_test_input");

}

describe('Variant', function () {
  
  it('generates variants given hyphenated input', function() {
    var variants = variant("simple-test-input")
    assertProperOutput(variants);
  });

  it('generates variants given camelCase input', function() {
    var variants = variant("simpleTestInput")
    assertProperOutput(variants);
  });
  it('generates variants given snakeCase input', function() {
    var variants = variant("simple_test_input")
    assertProperOutput(variants);
  });
  it('generates variants given titleCase input', function() {
    var variants = variant("Simple Test Input")
    assertProperOutput(variants);
  });


});
