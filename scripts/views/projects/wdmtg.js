/*global define*/

define([
    'backbone', 
    'views/project',
    'text!templates/wdmtg.html',
    'vendor/slider'
], function (Backbone, ProjectView, tplWdmtg, slideIt) {
    // 'use strict';

    var WdmtgView = ProjectView.extend({
      template: _.template(tplWdmtg),
      animations: [
        {
          selector: ".brief h2.default",
          position: 1200,
          animated: false,
          c: "animate"
        },
        {
          selector: ".iso",
          position: 1830,
          animated: false,
          c: "animate"
        },
        {
          selector: ".pro-signup h2.default",
          position: 2795,
          animated: false,
          c: "animate"
        },
        {
          selector: ".process",
          position: 3410,
          animated: false,
          c: "animate"
        },
        {
          selector: ".full-control",
          position: 3850,
          animated: false,
          c: "animate"
        },
        {
          selector: ".visual-clues",
          position: 4310,
          animated: false,
          c: "animate"
        },
        {
          selector: ".custom-feeds h2.default",
          position: 5640,
          animated: false,
          c: "animate"
        },
        {
          selector: ".powerful-tool",
          position: 6475,
          animated: false,
          c: "animate"
        },
        {
          selector: ".feeds",
          position: 7020,
          animated: false,
          c: "animate"
        },
        {
          selector: ".top-up",
          position: 7660,
          animated: false,
          c: "animate"
        }
      ],

      render: function(){
        var self = this;
        this.el.innerHTML = this.template();
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
