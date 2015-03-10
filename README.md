# Fly template - a template engine that flies

Fly templates are similar to ES6 strings. You can interpolate variables and
expressions using the `${}` syntax. Template properties are exposed on this,
and can be accessed with `${this.property}`.

## Why

Why not?

## How to use

### Constructing templates

A template is very similar to ES6 template strings. Use ${} to enclose
expressions and have them interpolated on render.

```js
var template = 'Hello ${this.name}, it is currently ${new Date().toTimeString()}.';
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
  name: 'Michael'
});
```

Produces something like: `Hello Michael, it is currently 16:20:29 GMT+1100 (AEDT)`.

### Full example

```js
var flyTemplate = require('fly-template'),
    template = 'Hello ${this.name}, it is currently ${new Date().toTimeString()}.',
    render = flyTemplate(template);

console.log(
  render({
    name: 'Michael'
  })
);
```

Produces something like: `Hello Michael, it is currently 16:20:29 GMT+1100 (AEDT)`.

## Contributing

Create a branch, send a PR.