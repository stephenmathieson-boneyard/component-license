
# component-license

  Find component licenses (WIP)

## Installation

  With npm,

    $ npm install -g stephenmathieson/component-license

## API

### `component-license(repo, version, cb)`

```js
license('stephenmathieson/rndid', '0.0.1', function (err, licenses) {
  if (err) throw err;
  console.log('licensed by', licenses.join(', ')); 
});
```

## Usage

  Usage from the command line:

    # specific component
    $ component-license stephenmathieson/rndid

    # specific component@version
    $ component-license stephenmathieson/rndid master

    # component in cwd
    $ component-license

## Warnings

  This is a work in progress.  API is likely to change.

  This thing is slow -- very slow.  It hits github at least once per component (and each of its dependencies).

## License 

(The MIT License)

Copyright (c) 2013 Stephen Mathieson &lt;me@stephenmathieson.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.