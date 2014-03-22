/*global define*/

define([
    'backbone', 
    'views/project',
    'text!templates/dreamcatcher.html',
    'vendor/slider'
], function (Backbone, ProjectView, tplDreamcatcher, slideIt) {
    'use strict';

    var DreamcatcherView = ProjectView.extend({
      template: _.template(tplDreamcatcher),
      animations: [
        {
          selector: ".brief h2.default",
          position: 1200,
          animated: false,
          c: "animate"
        },
        {
          selector: ".iso",
          position: 1810,
          animated: false,
          c: "animate"
        },
        {
          selector: ".desktop h2.default",
          position: 2750,
          animated: false,
          c: "animate"
        },
        {
          selector: ".audio-post",
          position: 3390,
          animated: false,
          c: "animate"
        },
        {
          selector: ".milestones",
          position: 4060,
          animated: false,
          c: "animate"
        },
        {
          selector: ".charts",
          position: 4710,
          animated: false,
          c: "animate"
        },
        {
          selector: ".mobile-ready h2.default",
          position: 6345,
          animated: false,
          c: "animate"
        },
        {
          selector: ".mobile-ready",
          position: 7000,
          animated: false,
          c: "animate"
        }
      ],
      render: function(){
        var self = this;

        // self.$el.html(this.template());
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
    return DreamcatcherView;
});
