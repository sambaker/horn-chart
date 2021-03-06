# &lt;horn-chart&gt;

> A Web Component that displays the notes available on a trumpet or a trombone with optional highlighting of scales

## Demo

[Check it live!](http://sambaker.github.io/horn-chart)

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install horn-chart --save
```

Or [download as ZIP](https://github.com/sambaker/horn-chart/archive/master.zip).

## Usage

1. Import Web Components' polyfill:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="bower_components/horn-chart/dist/horn-chart.html">
    ```

3. Start using it!

    ```html
    <horn-chart></horn-chart>
    ```

## Options

If either `key` or `showScale` attributes are present, then a scale will be shown on the position chart.

Attribute     | Options     | Default      | Description
---           | ---         | ---          | ---
`key`         | *string*    | `C`          | Selects a key whose scale tones should be rendered on the scale.
`showScale`   | *string*    | `major`      | Selects a key whose scale tones should be rendered on the scale.
`instrument`  | *string*    | `trombone`   | The type of horn to render. Options are `trombone` and `trumpet`. Notes are transposed for trumpet since it's a Bb instrument.
`scaleLabel`  | *string*    | `degrees`    | When a scale is rendered on the chart, scaleLabel can be set to `notes` to display the notes of the scale, rather than the default degrees (I, IV etc).
`info`        | *string*    | `false`      | Set to true to display a header with some info describing the scale. Mostly used for demo usage.


## Development

In order to run it locally you'll need to fetch some dependencies and a basic server setup.

* Install [Bower](http://bower.io/) & [Grunt](http://gruntjs.com/):

    ```sh
    $ [sudo] npm install -g bower grunt-cli
    ```

* Install local dependencies:

    ```sh
    $ bower install && npm install
    ```

* To test your project, start the development server and open `http://localhost:8000`.

    ```sh
    $ grunt server
    ```

* To build the distribution files before releasing a new version.

    ```sh
    $ grunt build
    ```

* To provide a live demo, send everything to `gh-pages` branch.

    ```sh
    $ grunt deploy
    ```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

For detailed changelog, check [Releases](https://github.com/sambaker/horn-chart/releases).

## License

[MIT License](http://opensource.org/licenses/MIT)
