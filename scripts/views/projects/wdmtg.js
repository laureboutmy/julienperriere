/*global define*/

define([
    'jquery',
    'backbone', 
    'views/project',
    'text!templates/wdmtg.html',
    'vendor/slider'
], function ($, Backbone, ProjectView, tplWdmtg) {
    // 'use strict';

    var WdmtgView = ProjectView.extend({
      template: _.template(tplWdmtg),
      animations: {
        "iso": {
          selector: ".iso",
          position: 1570,
          animated: false,
          c: "animate"
        },
        "pro": {
          selector: ".pro",
          position: 2200,
          animated: false,
          c: "animate"
        },
        "process": {
          selector: ".process",
          position: 3290,
          animated: false,
          c: "animate"
        },
        "feeds": {
          selector: ".feeds",
          position: 6150,
          animated: false,
          c: "animate"
        },
        "top-up": {
          selector: ".top-up",
          position: 6700,
          animated: false,
          c: "animate"
        }
      },

      render: function(){
        var self = this;
        self.$el.html(this.template());
        self.load();
        $('html').scrollTop(0);
        // document.documentElement.pageYOffset=0;
        J.Views['sidebar'].update(J.Status.currentView);
        self.bind();
        return this;
      },

      bind: function(){
        var self = this,
            currentScroll = previousScroll = 0,
            delta;
        $('.slider').slideIt();
        $(window).on('scroll DOMMouseScroll MozMousePixelScroll', function(e){
          previousScroll = currentScroll;
          currentScroll = window.pageYOffset;
          delta = previousScroll - currentScroll;
          self.renderAnimations(currentScroll, delta);
        });       
      }
       
    })
    return WdmtgView;
});
