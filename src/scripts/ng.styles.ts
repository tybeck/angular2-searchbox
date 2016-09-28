'use strict';

export const NgSearchboxFilteringStyle: string[] = [`:host {
  display: block;
}
:host > div {
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
:host ul {
  position: absolute;
}
`];
export const NgSearchboxStyle: string[] = [`:host {
  border: 1px solid rgba(4, 4, 4, 0.3);
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
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
