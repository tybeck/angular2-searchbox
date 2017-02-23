'use strict';

import {
  Component
} from '@angular/core';

import {
  API,
  Search
} from 'angular2-searchbox';


@Component({

  'selector': 'app',

  'templateUrl': 'views/components/app.html',

  'styleUrls': [

  ]

})

export class AppComponent {

  public tybFilters: Search.AvailableFilter[] = [

    {
      'name': 'cpi',
      'displayName': 'CPI',
      'root': 'Product',
      'validation': 'length=3',
      'excluded': true
    }, {
      'name': 'vendor_desc',
      'displayName': 'Vendor Description',
      'root': 'Product',
      'validation': 'between=3,6 numeric'
    }, {
      'name': 'vendor_abbr',
      'displayName': 'Vendor Abbreviation',
      'root': 'Product',
      'multi': true
    }, {
      'name': 'vendor_sku',
      'displayName': 'Vendor SKU',
      'multi': true,
      'root': 'Product',
      'middleware': [function (val) {

        return val + ' test';

      }, function (val) {

        return val + ' test 2';

      }]
    }, {
      'name': 'color',
      'displayName': 'Vendor Color',
      'suggestedValues': [
        'Yellow',
        'Red',
        'Black',
        'Green'
      ],
      'restrictedSuggestedValues': true,
      'root': 'Product'
    }, {
      'name': 'gender',
      'displayName': 'Vendor Gender',
      'suggestedValues': 'GENDER',
      'suggestedDataPoint': 'data',
      'reloadOnCreate': true,
      'restrictedSuggestedValues': true,
      'multi': true,
      'root': 'Product'
    }, {
      'name': 'product_type',
      'displayName': 'Product Type',
      'root': 'Product'
    }, {
      'name': 'upc',
      'displayName': 'UPC',
      'child': 'Size'
    }

  ];

  public tybConfig: Search.Configuration = {

    'delay': 1000,

    'placeholders': [
      'Enter your query here...',
      'Products will be searched via this query',
      'You can enter any search term you\'d like'
    ],

    'placeholderInterval': 3000,

    'placeholderSpeedOutInterval': 15,

    'placeholderSpeedInInterval': 100

  };

  public register (api: API) {

    console.log(api);

    api
      .on('onQueryAdded', (...args): void => {

        console.log('added', args);

      })
      .on('onEraser', (...args): void => {

        console.log('eraser', args);

      })
      .on('onQueryRemoved', (...args): void => {

        console.log('removed', args);

      })
      .on('onFilterChanged', (...args): void => {

        console.log('filter', args);

      })
      .on('onChange', function (...args) {

        console.log('change...', args);

      });

  }

}