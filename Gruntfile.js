var path = require("path");
var officehRoot = process.env.OFFICEH_ROOT;
var projekteRoot = process.env.PROJEKTE_ROOT;
var buildFile = "build/ohMsOffh2Pdf.js";
var ohExeDirDirFile = path.join(officehRoot, "delphi/exe/Scripts/ohMsOffh2Pdf.js");

var BrowserifyConf = {
    dist: {
        files: {
            'build/ohMsOffh2Pdf.js': ['ohMsOffh2Pdf.js']
        }
    }
};

var TsConf = {
    options: {
        compile: true,                 // perform compilation. [true (default) | false]
        comments: false,               // same as !removeComments. [true | false (default)]
        //target: 'es3',                 // target javascript language. [es3 | es5 (grunt-ts default) | es6]
        module: 'commonjs',                 // target javascript module style. [amd (default) | commonjs]
        //sourceMap: ,               // generate a source map for every output js file. [true (default) | false]
        sourceRoot: '',                // where to locate TypeScript files. [(default) '' == source ts location]
        //mapRoot: '',                   // where to locate .map.js files. [(default) '' == generated js location.]
        //declaration: false,            // generate a declaration .d.ts file for every output js file. [true | false (default)]
        //htmlModuleTemplate: 'My.Module.<%= filename %>',    // Template for module name for generated ts from html files [(default) '<%= filename %>']
        //htmlVarTemplate: '<%= ext %>',                      // Template for variable name used in generated ts from html files [(default) '<%= ext %>]
                                                            // Both html templates accept the ext and filename parameters.
        //noImplicitAny: false,          // set to true to pass --noImplicitAny to the compiler. [true | false (default)]
        fast: "watch"                  // see https://github.com/TypeStrong/grunt-ts/blob/master/docs/fast.md ["watch" (default) | "always" | "never"]
        /* ,compiler: './node_modules/grunt-ts/customcompiler/tsc'  */ //will use the specified compiler.
    },
    // a particular target
    dev: {
        src: ["*.ts","dkmlib/generic/*.ts","dkmlib/jscript/*.ts"],          // The source typescript files, http://gruntjs.com/configuring-tasks#files
        //html: ['app/**/**.tpl.html'],  // The source html files, https://github.com/basarat/grunt-ts#html-2-typescript-support
        //reference: 'app/reference.ts', // If specified, generate this file that you can use for your reference management
        //out: 'app/out.js',             // If specified, generate an out.js file which is the merged js file
        //watch: 'app',                  // If specified, watches this directory for changes, and re-runs the current target
        // use to override the grunt-ts project options above for this target
        options: {
            module: 'commonjs'
        }
    }};

var CopyConf = {
    copyToOhExe: {
        src: buildFile,
        dest: ohExeDirDirFile
    }
};

/*global module:false*/
module.exports = function (grunt) {


        // Project configuration.
        grunt.initConfig({
            ts:TsConf,
            browserify: BrowserifyConf,
            copy:CopyConf
        });

    // These plugins provide necessary tasks.

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-ts');

    // Default task.
    grunt.registerTask('default', ['ts','browserify',"copy"]);

};
