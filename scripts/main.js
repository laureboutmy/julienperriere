/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'backbonenative'
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
        backbone: '../components/backbone/backbone-min',
        backbonenative: '../components/backbone.native/backbone.native.min',
        underscore: '../components/underscore/underscore-min',
        eventEmitter: '../components/eventEmitter/EventEmitter.min',
        eventie: '../components/eventie/eventie',
        imagesloaded: '../components/imagesloaded/imagesloaded.min',
        text: '../components/requirejs-text/text',
        requirejs: '../components/requirejs/require',
    }
});

define(['julien-perriere'], function(J){
    J.start();
});
