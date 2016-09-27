'use strict';

(function (system) {

  let sys = {

    'configuration': {

      'map': {

        'app': 'scripts',

        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',

        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',

        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',

        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',

        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',

        '@angular/http': 'npm:@angular/http/bundles/http.umd.js',

        '@angular/router': 'npm:@angular/router/bundles/router.umd.js',

        '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

        'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',

        'lodash': 'npm:lodash',

        'tyb-advanced-searchbox': 'npm:tyb-advanced-searchbox',

        'rxjs': 'npm:rxjs',

        'json': 'npm:systemjs-plugin-json/json.js'

      },

      'meta': {

        '/config/*.json': {

          'loader': 'json'

        },

        '/package.json': {

          'loader': 'json'

        }

      },

      'paths': {

        'npm:': '../../node_modules/'

      },

      'packages': {

        'app': {

          'main': 'app',

          'defaultExtension': 'js'

        },

        'npm:tyb-advanced-searchbox': {

          'defaultExtension': 'js',

          'main': './index'

        },

        'rxjs': {

          'defaultExtension': 'js'

        },

        'lodash': {

          'main': './index',

          'defaultExtension': 'js'

        },

        'angular2-in-memory-web-api': {

          'main': './index',

          'defaultExtension': 'js'

        }

      }

    },

    config: function () {

      system
        .config(
          this.configuration
        );

      return this;

    },

    import: function (name) {

      system
        .import(name)
        .catch(function (err) {

          return console
            .error(err);

        });

      return this;

    }

  };

  if (sys && system) {

    sys
      .config()
      .import('app');

  }

})(window.System || {});