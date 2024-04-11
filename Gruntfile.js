module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // Task to compile SCSS to CSS using the sass module
    sass: {
      options: {
        implementation: require("sass"),
        sourceMap: true,
      },
      dist: {
        files: {
          "dist/css/styles.css": "src/scss/styles.scss",
        },
      },
    },

    // Task to concatenate JavaScript files
    concat: {
      dist: {
        src: ["src/js/*.js"],
        dest: "dist/js/script.js",
      },
    },

    // Task to minify JavaScript files
    uglify: {
      dist: {
        files: {
          "dist/js/script.min.js": ["dist/js/script.js"],
        },
      },
    },

    // Task to copy HTML files to dist directory
    copy: {
      html: {
        files: [{ expand: true, cwd: "src/", src: ["*.ejs"], dest: "dist/" }],
        options: {
          process: function (content, srcpath) {
            console.log("Copying " + srcpath + " to " + this.dest);
            return content;
          },
        },
      },
      images: {
        files: [
          {
            expand: true,
            cwd: "src/images/",
            src: ["**"],
            dest: "dist/images/",
          },
        ],
      },
      bootstrap: {
        files: [
          {
            expand: true,
            cwd: "node_modules/bootstrap/dist/",
            src: ["**"],
            dest: "dist/bootstrap/",
          },
        ],
      },
    },

    // Task to clean the dist directory before building
    clean: {
      dist: ["dist/*"],
    },

    // Task to watch for file changes and trigger live reloads
    watch: {
      scss: {
        files: ["src/scss/**/*.scss"],
        tasks: ["sass"],
        options: {
          livereload: true,
        },
      },
      js: {
        files: ["src/js/**/*.js"],
        tasks: ["concat", "uglify"],
        options: {
          livereload: true,
        },
      },
      html: {
        files: ["src/*.ejs"],
        tasks: ["copy:html"],
        options: {
          livereload: true,
        },
      },
      images: {
        files: ["src/images/**/*"],
        tasks: ["copy:images"],
        options: {
          livereload: true,
        },
      },
    },
  });

  // Load Grunt tasks
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Register tasks
  grunt.registerTask("build", ["clean", "sass", "concat", "uglify", "copy"]);
  grunt.registerTask("default", ["build", "watch"]);
};
