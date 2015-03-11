# Fly template - a template engine that flies [![Build Status](https://travis-ci.org/leahciMic/fly-template.svg?branch=master)](https://travis-ci.org/leahciMic/fly-template)

Fly templates are similar to ES6 strings. You can interpolate variables and
expressions using the `${}` syntax. Template properties are exposed on this,
and can be accessed with `${this.property}`.

It compiles the template into a function that's very quick to execute.

## How to use

### Constructing templates

A template is very similar to ES6 template strings. Use ${} to enclose
expressions and have them interpolated on render.

```js
var template = 'Hello ${this.place}! It is currently ${new Date().toTimeString()}.';
```

### Compilation

Then we need to compile the template.

```js
var render = require('fly-template')(template);
```

### Rendering

Now we can render the template with some associated data.

```js
render({
  place: 'world'
});
```

Produces something like: `Hello world!, it is currently 16:20:29 GMT+1100 (AEDT)`.

### Full example

```js
var flyTemplate = require('fly-template'),
    template = 'Hello ${this.place}, it is currently ${new Date().toTimeString()}.',
    render = flyTemplate(template);

console.log(
  render({
    place: 'world!'
  })
);
```

Produces something like: `Hello world!, it is currently 16:20:29 GMT+1100 (AEDT)`.

## Methods

### .parse(template)

Parses the template and produces a JSON structure that can be passed/transmitted
around that can be converted to a function using `.convert()`. Ideal to save clients from having to
parse the template.

### .convert()

Converts the JSON structure exported by `.parse()` into the render function.

## Contributing

Fork the project, create a feature branch, and send a pull-request.