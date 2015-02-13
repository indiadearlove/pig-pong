module.exports = function(grunt) {

grunt.initConfig({
   pkg: grunt.file.readJSON('package.json'),
   mocha_casperjs: {
     options: {},
     files: {
       src: ['test/**/*.js']
     }
   },
   express: {
      test: {
        options: {
          script: 'server.js'
        }
      }
    } 
 });

 grunt.loadNpmTasks('grunt-mocha-casperjs');
 grunt.loadNpmTasks('grunt-express-server');
 grunt.registerTask('default', ['express:test', 'mocha_casperjs', 'express:test:stop']);

};