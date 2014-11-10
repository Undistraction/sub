module.exports = function(grunt) {

  // Load all available grunt tasks
  require('load-grunt-tasks')(grunt);

  // Configure tasks
  grunt.initConfig({

    dir : {
      src : 'sass',
      dist : 'dist'
    },

    pkg: grunt.file.readJSON('package.json'),
    projectName: '<%= pkg.name.toLowerCase() %>',

    // Concat
    concat: {
      options: {
        separator: '\n\n',
        banner: '/*! <%= projectName %> v<%= pkg.version %> – <%= grunt.template.today("dd.mm.yyyy") %> */\n\n',
      },
      dist: {
        src: [
          '<%= dir.src %>/sub/reset/*.scss',
        ],
        dest: '<%= dir.dist %>/_sub.scss',
      },
    },

    // Sass
    sass: {
      options: {
        style: 'expanded',
        compass: false,
        bundleExec: true,
        loadPath: [
          './sass'
        ]
      }
    },

    // Versioning
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'version: Bump to %VERSION%',
        commitFiles: ['package.json', 'bower.json', 'docs/*', 'dist/*'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false
      }
    }
  });

  // Define own tasks
  grunt.registerTask('build', ['concat']);
  grunt.registerTask('deploy', ['build', 'bump-commit'])
  grunt.registerTask('patch', ['bump-only:patch', 'deploy']);
  grunt.registerTask('minor', ['bump-only:minor', 'deploy']);
  grunt.registerTask('major', ['bump-only:major', 'deploy']);
};