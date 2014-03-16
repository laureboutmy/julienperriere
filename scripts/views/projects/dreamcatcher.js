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
          selector: ".iso",
          position: 1300,
          animated: false,
          c: "animate"
        },
        {
          selector: ".milestones",
          position: 5340,
          animated: false,
          c: "animate"
        },
        {
          selector: ".charts",
          position: 6040,
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
