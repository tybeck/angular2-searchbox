'use strict';

export const NgSearchboxAddedFilterStyle: string[] = [`:host > div.ng-searchbox-added-filter {
  display: block;
  float: left;
  transition: opacity 0.5s ease-in-out;
  -moz-transition: opacity 0.5s ease-in-out;
  -webkit-transition: opacity 0.5s ease-in-out;
}
:host > div.ng-searchbox-added-filter > div.ng-searchbox-added-filter-contents {
  background: #FFF;
  padding: 5px 6px 5px 6px;
  border-radius: 6px;
  margin-right: 10px;
  margin-top: 8px;
  float: left;
}
:host > div.ng-searchbox-added-filter > div.ng-searchbox-added-filter-contents input {
  outline: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: 1px solid #D4D1D1;
  font-size: 14px;
  padding-left: 5px;
  margin-right: 3px;
}
:host > div.ng-searchbox-added-filter > div.ng-searchbox-added-filter-contents span.filter-name {
  font-size: 13px;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.65);
  font-weight: bold;
  letter-spacing: 1px;
}
:host > div.ng-searchbox-added-filter > div.ng-searchbox-added-filter-contents span.selector-type {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  margin-top: 0px;
  background: #CAE5FF;
  margin-left: 9px;
  padding: 4px;
  opacity: 0.6;
  border-radius: 4px;
  margin-right: 7px;
}
:host > div.ng-searchbox-added-filter > div.ng-searchbox-added-filter-contents span.filter-value {
  display: inline-block;
  padding-bottom: 2px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.82);
}
:host > div.ng-searchbox-added-filter > div.ng-searchbox-added-filter-contents i.fa-times {
  display: inline-block;
  margin-left: 5px;
  vertical-align: top;
  font-size: 18px;
  margin-right: 5px;
}
`];
export const NgSearchboxFilterOperatorsStyle: string[] = [`:host {
  float: left;
}
:host div.ng-searchbox-added-filter-operator {
  background: #FFF;
  border-radius: 6px;
  margin-right: 10px;
  margin-top: 8px;
}
:host div.ng-searchbox-added-filter-operator span {
  padding: 5px 6px 5px 6px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
  display: block;
}
:host div.ng-searchbox-added-filter-operator span i.fa-arrow-left {
  margin-right: 5px;
  color: rgba(0, 0, 0, 0.75);
}
:host div.ng-searchbox-added-filter-operator span i.fa-arrow-right {
  margin-left: 5px;
  color: rgba(0, 0, 0, 0.75);
}
:host div.ng-searchbox-added-filter-operator div.ng-searchbox-filter-operators-wrapper {
  position: absolute;
}
`];
export const NgSearchboxFilterSelectorsStyle: string[] = [`:host div.ng-searchbox-filter-selectors {
  position: absolute;
  z-index: 3;
}
:host div.ng-searchbox-filter-selectors ul {
  list-style-type: none;
  padding: 0;
  margin: 0 0 0 0;
  display: block;
  border-left: 1px solid #A9A9A9;
  border-right: 1px solid #A9A9A9;
  border-bottom: 1px solid #A9A9A9;
  max-height: 130px;
  overflow-y: scroll;
}
`];
export const NgSearchboxAddedFiltersWrapperStyle: string[] = [`:host {
  padding: 0 0 8px 7px;
  background: #E1F0FD;
  border-radius: 6px;
  margin-top: 7px;
  margin-bottom: 4px;
  display: none;
}
:host.active {
  display: block;
}
:host div.ng-searchbox-added-filters {
  display: none;
}
`];
export const NgSearchboxStyle: string[] = [`.ng-clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

* html .ng-clearfix {
  height: 1%;
}

:host {
  border: 1px solid rgba(4, 4, 4, 0.3);
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  position: relative;
  border-radius: 4px;
  display: block;
  background: #FFF;
  padding: 4px;
}
:host div.ng-searchbox-wrapper {
  position: relative;
}
:host div.ng-searchbox-wrapper input {
  font-size: 18px;
  border: none;
  width: 100%;
  outline: none;
  padding: 9px 8px 9px 50px;
  color: rgba(0, 0, 0, 0.68);
  font-weight: normal;
  font-style: italic;
}
:host div.ng-searchbox-wrapper div.ng-searchbox-buttons {
  position: absolute;
  z-index: 1;
  right: 10px;
  transform: translate(0, 50%);
  top: 0;
  font-size: 18px;
}
:host div.ng-searchbox-wrapper div.ng-searchbox-buttons i {
  margin-right: 5px;
  cursor: pointer;
}
:host div.ng-searchbox-wrapper div.ng-searchbox-buttons i.fa-trash, :host div.ng-searchbox-wrapper div.ng-searchbox-buttons i.fa-eraser {
  color: #4A92D0;
}
:host div.ng-searchbox-wrapper div.ng-searchbox-buttons i:last-child {
  margin-right: 0;
}
`];
export const GlobalStyle: string[] = [`.ng-clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

* html .ng-clearfix {
  height: 1%;
}
`];
export const NgSearchboxFilteringStyle: string[] = [`:host {
  display: block;
}
:host span.filtering-selection {
  border-right: 1px solid rgba(4, 4, 4, 0.3);
  margin-top: 0;
  cursor: pointer;
  opacity: 0.75;
  margin-left: 0;
  font-size: 16px;
  font-weight: normal;
  margin-right: 8px;
  display: block;
  text-align: center;
  width: 20px;
  padding: 11px 8px 11px 8px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background: #cee8ff;
  background: -moz-linear-gradient(top, #cee8ff 0%, #b5dcff 100%);
  background: -webkit-linear-gradient(top, #cee8ff 0%, #b5dcff 100%);
  background: linear-gradient(to bottom, #cee8ff 0%, #b5dcff 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#cee8ff', endColorstr='#b5dcff',GradientType=0 );
  transition: opacity 0.25s ease-in-out;
  -moz-transition: opacity 0.25s ease-in-out;
  -webkit-transition: opacity 0.25s ease-in-out;
  position: absolute;
  z-index: 2;
}
:host span.filtering-selection.active {
  background: #b5dcff;
  background: -moz-linear-gradient(top, #b5dcff 0%, #cee8ff 100%);
  background: -webkit-linear-gradient(top, #b5dcff 0%, #cee8ff 100%);
  background: linear-gradient(to bottom, #b5dcff 0%, #cee8ff 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b5dcff', endColorstr='#cee8ff',GradientType=0 );
}
:host ul {
  position: absolute;
  z-index: 6;
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  left: 0;
  top: 0;
}
:host ul li {
  font-size: 14px;
  margin-right: 8px;
  padding: 5px 10px;
  border-bottom: 2px solid #FFF;
  cursor: pointer;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: background 0.25s ease-in-out;
  -moz-transition: background 0.25s ease-in-out;
  -webkit-transition: background 0.25s ease-in-out;
}
:host ul li:last-child {
  border-bottom: none;
}
:host ul li.root-filter {
  background: #CEE8FF;
}
:host ul li.child-filter {
  background: #FFDFDF;
}
:host ul li.child-filter:hover {
  background: #FFD6D6;
}
:host ul li i.fa-filter {
  opacity: 0.45;
  margin-right: 5px;
}
:host ul li i.fa-level-up, :host ul li i.fa-level-down {
  margin-right: 4px;
}
:host ul li:hover span.ng-filter-display-name {
  font-weight: bold;
}
:host ul li span.ng-filtered-from {
  opacity: 0.6;
  font-size: 12px;
  margin-left: 10px;
}
`];
