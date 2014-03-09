/*global define*/

define([
    'jquery',
    'backbone', 
    'imagesloaded',
    'views/project',
    'text!templates/kolok.html'
], function ($, Backbone, imagesLoaded, ProjectView, tplKolok) {
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
        self.$el.html(this.template());
        self.load();
        $('html').scrollTop(0);
        J.Views['sidebar'].update(J.Status.currentView);
        self.bind();

        return this;
      }       
    })
    return KolokView;
});
