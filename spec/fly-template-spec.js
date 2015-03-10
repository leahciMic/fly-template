var flyTemplate = require('../fly-template.js');

describe('Fly template', function() {
  it('should handle variables', function() {
    var render = flyTemplate('Hello ${this.thing}');
    expect(render({thing: 'world!'})).toEqual('Hello world!');
  });
  it('should handle expressions', function() {
    var render = flyTemplate('Hello ${this.names.join(\', \')}');
    expect(render({names: ['Michael', 'Ema']})).toEqual('Hello Michael, Ema');
  });
});