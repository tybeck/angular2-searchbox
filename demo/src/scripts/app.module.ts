'use strict';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import {
  NgSearchboxModule
} from 'angular2-searchbox';

import { AppComponent }  from './components/app.component';

@NgModule({

  'imports': [
    BrowserModule,
    CommonModule,
    NgSearchboxModule
  ],

  'declarations': [
    AppComponent
  ],

  'providers': [
    {

      'provide': Window,

      'useValue': window

    }, {

      'provide': Document,

      'useValue': document

    }
  ],

  'bootstrap': [
    AppComponent
  ]

})

export class AppModule {

}