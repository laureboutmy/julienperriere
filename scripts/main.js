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
        backbone: '../components/backbone/backbone',
        backbonenative: '../components/backbone.native/backbone.native',
        underscore: '../components/underscore/underscore',
        eventEmitter: '../components/eventEmitter/EventEmitter',
        eventie: '../components/eventie/eventie',
        imagesloaded: '../components/imagesloaded/imagesloaded',
        text: '../components/requirejs-text/text',
        requirejs: '../components/requirejs/require',
    }
});

define(['julien-perriere'], function(J){
    J.start();
});
