module.exports = function (grunt) {
    //var mozjpeg = require('imagemin-mozjpeg');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['<%= pkg.project.dist %>/']
        },
        sass: {                              
            dev: { 
                options: { 
                    style: 'expanded'
                },
                files: { 
                    '<%= pkg.project.src %>/css/<%= pkg.project.css_basename %>_fonts.css': '<%= pkg.project.src %>/sass/<%= pkg.project.scss_basename %>_fonts.scss',
                    '<%= pkg.project.src %>css/<%= pkg.project.css_basename %>_global.css': '<%= pkg.project.src %>sass/<%= pkg.project.scss_basename %>_global.scss', 
                    '<%= pkg.project.src %>css/<%= pkg.project.css_basename %>_custom.css': '<%= pkg.project.src %>sass/<%= pkg.project.scss_basename %>_custom.scss', 
                    '<%= pkg.project.src %>css/<%= pkg.project.css_basename %>_automotive.css': '<%= pkg.project.src %>sass/<%= pkg.project.scss_basename %>_automotive.scss',
                    '<%= pkg.project.src %>css/<%= pkg.project.css_basename %>_utilities.css': '<%= pkg.project.src %>sass/<%= pkg.project.scss_basename %>_utilities.scss'
                }
            },
            dist: { 
                options: { 
                    style: 'expanded'
                },
                files: { 
                    '<%= pkg.project.dist %>/css/<%= pkg.project.css_basename %>.css': '<%= pkg.project.src %>/sass/<%= pkg.project.scss_basename %>.scss'
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    '<%= pkg.project.dist %>/index.html': ['<%= pkg.project.src %>/index.html']
                }
            }
        },
        htmlmin: { 
            dist: { 
                options: { 
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    '<%= pkg.project.dist %>/index.html': '<%= pkg.project.dist %>/index.html', // 'destination': 'source'
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    '<%= pkg.project.dist %>/css/style.min.css': [
                        '<%= pkg.project.src %>/css/<%= pkg.project.css_basename %>_fonts.css',
                        '<%= pkg.project.src %>/css/bootstrap.css',
                        '<%= pkg.project.src %>/css/bootstrap-theme.css',
                        '<%= pkg.project.src %>/ajax-contact-form/css/ajaxContactForm.css',
                        '<%= pkg.project.dist %>/css/style.css'
                    ]
                }
            }
        },
        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            my_target: {
                files: {
                    '<%= pkg.project.dist %>/js/main.min.js': [
                        '<%= pkg.project.src %>/js/vendor/modernizr-2.8.3.min.js',
                        '<%= pkg.project.src %>/js/vendor/bootstrap.js',
                        '<%= pkg.project.src %>/ajax-contact-form/js/ajaxContactForm.pack.min.js',
                        '<%= pkg.project.src %>/js/main.js'
                    ]
                }
            }
        },
        copy: {
            main: {
                files: [
                      
                    {
                        src: '<%= pkg.project.src %>/404.html',
                        dest: '<%= pkg.project.dist %>/404.html'
                    },
                    
                    {
                        src: '<%= pkg.project.src %>/htaccess.txt',
                        dest: '<%= pkg.project.dist %>/htaccess.txt'
                    },
                    
                    {
                        src: '<%= pkg.project.src %>/favicon.ico',
                        dest: '<%= pkg.project.dist %>/favicon.ico'
                    },
                    {
                        expand: true,
                        cwd: '<%= pkg.project.src %>/',
                        src: ['*.txt'],
                        dest: '<%= pkg.project.dist %>/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= pkg.project.src %>/',
                        src: ['*.png'],
                        dest: '<%= pkg.project.dist %>/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= pkg.project.src %>/',
                        src: ['*.xml'],
                        dest: '<%= pkg.project.dist %>/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= pkg.project.src %>/',
                        src: ['js/**'],
                        dest: '<%= pkg.project.dist %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= pkg.project.src %>/',
                        src: ['fonts/**'],
                        dest: '<%= pkg.project.dist %>/'
                    }/*,

                      // includes files within path and its sub-directories
                    {
                        expand: true,
                        src: ['path/**'],
                        dest: 'dest/'
                    },

                      // makes all src relative to cwd
                    {
                        expand: true,
                        cwd: 'path/',
                        src: ['**'],
                        dest: 'dest/'
                    },

                      // flattens results to a single level
                    {
                        expand: true,
                        flatten: true,
                        src: ['path/**'],
                        dest: 'dest/',
                        filter: 'isFile'
                    },*/
                ],
            },
        },
        imagemin: { 
            dist: { 
                options: {                       // Target options
                    optimizationLevel: 5
                },
                files: [{
                    expand: true, 
                    cwd: '<%= pkg.project.src %>/', 
                    src: ['img/**/*.{png,jpg,gif}'], // Actual patterns to match
                    dest: '<%= pkg.project.dist %>/' // Destination path prefix
                }]
            }
        },
        watch: {
            files: ['<%= pkg.project.src %>/sass/*.scss'],
            tasks: ['sass_compile']
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    
    grunt.registerTask('sass_compile', ['sass:dev']);
    grunt.registerTask('dist', [
        'clean',
        'sass:dist',
        'processhtml',
        'htmlmin',
        'cssmin',
        'uglify',
        'copy',
        'imagemin'
    ]);
    grunt.registerTask('default', ['sass:dev','watch']);

};