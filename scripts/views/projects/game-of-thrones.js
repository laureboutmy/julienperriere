/*global define*/

define([
    'jquery',
    'backbone', 
    'imagesloaded',
    'views/project',
    'text!templates/game-of-thrones.html'
], function ($, Backbone, imagesLoaded, ProjectView, tplGameOfThrones) {
    // 'use strict';
    var GameOfThronesView = ProjectView.extend({
      template: _.template(tplGameOfThrones),
      animations: {
        "iso": {
          selector: ".iso",
          class: "up"
        }
      },

      render: function(){
        var self = this;
        self.$el.html(this.template());
        self.load();
        $('html').scrollTop(0);
        J.Views['sidebar'].update(J.Status.currentView);
        self.bind();

        return this;
      }
    })
    return GameOfThronesView;
});
