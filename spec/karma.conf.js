// Karma configuration
// Generated and changed to fit our needs...

module.exports = function(config) {
  config.set({
    basePath: '..',

    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'public/js/app.js',    // load app file first
      'public/js/*.js',      // load all other scripts
      'spec/angular/**/*.js' // run spec files last
    ],

    exclude: [],
    preprocessors: {},

    reporters: ['mocha'],

    port:      9876,
    colors:    true,
    logLevel:  config.LOG_INFO,
    autoWatch: true,

    // browsers: ['Chrome', 'PhantomJS'],
    browsers: ['PhantomJS'],

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },

    // Continuous Integration mode
    singleRun: false // if true, Karma captures browsers, runs the tests and exits
  })
};
