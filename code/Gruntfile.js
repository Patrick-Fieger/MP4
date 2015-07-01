module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),    
    includereplace: {
      dist: {
        options: {},
        src: 'public/index.replace.html',
        dest: 'public/index.html'
      }
    }
    
  });

  grunt.loadNpmTasks('grunt-include-replace');
  
  grunt.registerTask('include', ['includereplace']);
  //grunt.registerTask('compile', ['clean:all', 'includereplace', 'html-prettyprinter', 'copy', 'sass', 'typescript']);
  // TODO build task bauen für live deployment -> Achtung livereload.js dafür auf index.dev.html entfernen, sonst wie compile

};