/*global define*/

define([
    'jquery',
    'backbone', 
    'views/project',
    'text!templates/wdmtg.html',
    'vendor/slider'
], function ($, Backbone, ProjectView, tplWdmtg, slideIt) {
    // 'use strict';

    var WdmtgView = ProjectView.extend({
      template: _.template(tplWdmtg),
      animations: [
        {
          selector: ".iso",
          position: 1570,
          animated: false,
          c: "animate"
        },
        {
          selector: ".pro",
          position: 2200,
          animated: false,
          c: "animate"
        },
        {
          selector: ".process",
          position: 3290,
          animated: false,
          c: "animate"
        },
        {
          selector: ".feeds",
          position: 6150,
          animated: false,
          c: "animate"
        },
        {
          selector: ".top-up",
          position: 6700,
          animated: false,
          c: "animate"
        }
      ],

      render: function(){
        var self = this;
        self.$el.html(this.template());
        self.load();
        J.Views['sidebar'].update(J.Status.currentView);
        self.bind();
        return this;
      },

      bind: function(){
        var self = this,
            previousScroll, 
            currentScroll = previousScroll = 0,
            delta;
        slideIt(document.querySelectorAll('.slider'));
        window.addEventListener('scroll', function(){
          previousScroll = currentScroll;
          currentScroll = window.pageYOffset;
          delta = previousScroll - currentScroll;
          self.renderAnimations(currentScroll, delta);
        })    
      }
       
    })
    return WdmtgView;
});
