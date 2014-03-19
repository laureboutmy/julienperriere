/*global define*/

define([
    'backbone', 
    'imagesloaded',
    'views/project',
    'text!templates/kolok.html'
], function (Backbone, imagesLoaded, ProjectView, tplKolok) {
    // 'use strict';
    var KolokView = ProjectView.extend({

      template: _.template(tplKolok),

      animations: [
        {
          selector: ".iso",
          class: "up"
        }
      ],

      render: function(){
        var self = this;
        this.el.innerHTML = this.template();
        self.load();
        // $('html').scrollTop(0);
        J.Views['sidebar'].update(J.Status.currentView);
        self.bind();

        return this;
      },

      bind: function(){
        var self = this,
            previousScroll, 
            currentScroll = previousScroll = 0,
            delta;
        window.addEventListener('scroll', function(){
          previousScroll = currentScroll;
          currentScroll = window.pageYOffset;
          delta = previousScroll - currentScroll;
          self.renderAnimations(currentScroll, delta);
        })
    
      }       
    })
    return KolokView;
});
