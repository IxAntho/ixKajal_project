module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // Task to compile SCSS to CSS using the sass module
    sass: {
      options: {
        implementation: require("sass"), // Use the official Dart Sass compiler
        sourceMap: true, // Generate source maps for easier debugging
      },
      dist: {
        files: {
          "dist/public/css/styles.css": "src/scss/styles.scss", // Compile main Sass file to CSS
        },
      },
      vendor: {
        files: [
          {
            expand: true, // Enable dynamic expansion
            cwd: "src/vendor/", // Source directory
            src: ["**/*.scss"], // Pattern to match all Sass files
            dest: "dist/public/vendor/", // Destination directory
            ext: ".css", // Output file extension
          },
        ],
      },
    },

    // Task to concatenate and minify JavaScript files
    concat: {
      app: {
        src: ["src/js/app.js"],
        dest: "dist/js/app.js",
      },
      main: {
        src: ["src/js/main.js"],
        dest: "dist/public/js/main.js",
      },
    },

    uglify: {
      app: {
        files: {
          "dist/js/app.min.js": ["dist/js/app.js"],
        },
      },
      main: {
        files: {
          "dist/public/js/main.min.js": ["dist/public/js/main.js"],
        },
      },
    },

    // Task to copy HTML, CSS, and image files to dist directory
    copy: {
      html: {
        files: [
          {
            expand: true,
            cwd: "src/views/",
            src: ["**/*.ejs"],
            dest: "dist/views/",
          },
        ],
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
            dest: "dist/public/images/",
          },
        ],
      },
      fonts: {
        files: [
          {
            expand: true,
            cwd: "src/vendor/fonts/",
            src: ["**"],
            dest: "dist/public/vendor/fonts/",
          },
        ],
      },
      fontStyles: {
        files: [
          {
            expand: true,
            cwd: "src/vendor/",
            src: ["_fonts.scss"],
            dest: "dist/public/vendor/",
            ext: ".css", // Add this line to specify the output file extension
            flatten: true, // Add this line to flatten the destination structure
            rename: function (dest, src) {
              console.log(dest + "typography.css");
              return dest + "typography.css"; // Rename the output file
            },
          },
        ],
      },
    },

    // // Task to clean the dist directory before building
    // clean: {
    //   dist: ["dist/*"],
    // },

    // Task to watch for file changes and trigger live reloads
    watch: {
      scss: {
        files: ["src/scss/**/*.scss", "src/vendor/**/*.scss"],
        tasks: ["sass"],
        options: {
          livereload: true,
        },
      },
      jsApp: {
        files: ["src/js/app.js"],
        tasks: ["concat:app", "uglify:app"],
        options: {
          livereload: true,
        },
      },
      jsMain: {
        files: ["src/js/main.js"],
        tasks: ["concat:main", "uglify:main"],
        options: {
          livereload: true,
        },
      },
      html: {
        files: ["src/views/**/*.ejs"],
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
      fonts: {
        files: ["src/vendor/fonts/**/*"],
        tasks: ["copy:fonts"],
        options: {
          livereload: true,
        },
      },
      fontStyles: {
        files: ["src/vendor/fonts/**/*"],
        tasks: ["copy:fontStyles"],
        options: {
          livereload: true,
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  // grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["sass", "concat", "uglify", "copy", "watch"]);
};
