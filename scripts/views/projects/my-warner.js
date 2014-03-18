/*global define*/

define([
    'backbone', 
    'imagesloaded',
    'views/project',
    'text!templates/my-warner.html',
], function (Backbone, imagesLoaded, ProjectView, tplMyWarner) {
    // 'use strict';
    var MyWarnerView = ProjectView.extend({
      template: _.template(tplMyWarner),
      animations: [
        {
          selector: ".iso",
          position: 1570,
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
        window.addEventListener('scroll', function(){
          previousScroll = currentScroll;
          currentScroll = window.pageYOffset;
          delta = previousScroll - currentScroll;
          self.renderAnimations(currentScroll, delta);
        })
    
      }
    })
    return MyWarnerView;
});
