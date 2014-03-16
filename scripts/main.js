/*global require*/
// 'use strict';

require.config({
  shim: {
    underscore: {
        exports: '_'
    },
    backbone: {
        deps: [
            'underscore',
            'jquery'
        ],
        exports: 'Backbone'
    }, 
    imagesloaded: {
      deps: [
        'eventEmitter',
        'eventie'
      ],
      exports: 'imagesLoaded'
    }
  },
  paths: {
    jquery: '../components/jquery/jquery',
    backbone: '../components/backbone/backbone',
    underscore: '../components/underscore/underscore',
    eventEmitter: '../components/eventEmitter/EventEmitter',
    eventie: '../components/eventie/eventie',
    imagesloaded: '../components/imagesloaded/imagesloaded',
    text: '../components/requirejs-text/text',
    requirejs: '../components/requirejs/require',
  }
});


define(['julien-perriere', 'jquery'], function(J, $){
  J.start();
})
