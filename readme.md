# Gulp Build for Wordpress

```
Note: gulp-uncss not working yet. Have a look, help is much appreciated 😅
```

This is the working environment I use to create Wordpress Themes. If you want to improve on this template, please feel free to do so. It has the following Gulp-powered build system features:

- Sass compilation and prefixing
- Less compilation and prefixing
- JavaScript concatenation
- BrowserSync capability
- For production builds:
  - CSS compression
  - JavaScript compression
  - Image compression


### Installation

To use it as a template, your computer needs:

- [NodeJS](https://nodejs.org/en/) (0.12 or greater)
- [Git](https://git-scm.com/)

#### Step 1

- The easiest way to set it up is by downloading the zip file using the `Download ZIP` button above. Then unzip the file and copy its content to your wp themes folder(`'your-wp-root-folder'/wp-content/themes`).

- Otherwise you can clone this repo, but you first need to delete your themes folder at `'your-wp-root-folder'/wp-content/themes` (so backup the stuff you have inside it if you want to put them back after installing this repo).
Then clone it to the `wp-content` folder and call it `themes`:

  ```bash
  cd 'your-wp-root-folder'/wp-content
  git clone https://github.com/bendecastro/gulp-build-wp themes
  ```

#### Step 2

- cd into `themes` and install the needed dependencies:

  ```bash
  cd themes
  npm install
  bower install
  ```

#### Step 3

- Finally, run `npm start` to run Gulp. The distribution files will be created in the folder called `dist`.


### Options

To create compressed, production-ready assets, run `npm run build`. A file named `production build.zip` inside `dist/Compressed Build` will contain the full production-ready theme.

You can configure the following options in the gulpfile.js:

- If you want to have live reload on your browser set the `URL` variable to be your local server's root address

  ```javascript
  var URL = 'http://localwebsite.dev';
  ```
</br>

- Decide wheter to use Sass, Less or both. The default is Sass, but to change this, change the value of the variable `cssLang`. It can take 3 different strings: `'sassOnly'`, `'lessOnly'` or `'bothCSS'`.

  ```javascript
  var cssLang = 'sassOnly';
  ```
</br>

- Give a different name to the zip file created in production mode.

  ```javascript
  var THEME = 'new name';
  ```
</br>

- Choose wich js files you want to load into `dist/js/main-app.js` by adding/removing their paths to the PATHS.javascript array in the order you want them to be concatenated.

  ```javascript
  var PATHS = {
    javascript: [
      'bower_components/jquery/dist/jquery.js',
      'path/to/more-js-i-want-to-add.js',
      'src/assets/js/main.js'
    ]
  };
  ```
  This project comes with Bootstrap, Foundation and Google Material Design Lite in the `bower_components` folder. To use them in your project, just uncomment the paths to their js files.
</br>

- The file `src/assets/wp-style.css` is the file that will originate the Wordpress required `style.css` file, so don't change neither its name nor path.
