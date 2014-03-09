/*global define*/

define([
    'jquery',
    'backbone', 
    'views/project',
    'text!templates/nike.html',
    'vendor/slider'
], function ($, Backbone, ProjectView, tplNike) {
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
        document.documentElement.pageYOffset = 0;
        J.Views['sidebar'].update(J.Status.currentView);
        self.bind();
        return this;
      },

      bind: function(){
        $('.slider').slideIt();
      }
       
    });
    return NikeView;
});

