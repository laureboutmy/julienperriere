/*global define*/

define([
    'backbone', 
    'views/project',
    'text!templates/nike.html',
    'vendor/slider'
], function (Backbone, ProjectView, tplNike, slideIt) {
    // 'use strict';

    var NikeView = ProjectView.extend({
      template: _.template(tplNike),
      animations: [
        {
          selector: ".iso",
          class: "up"
        }
      ],
      render: function(){
        var self = this;
        self.$el.html(this.template());
        self.load();
        // $('html').scrollTop(0);
        // document.documentElement.pageYOffset = 0;
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
       
    });
    return NikeView;
});

