/*global define*/

define([
    'jquery',
    'backbone', 
    'imagesloaded',
    'views/project',
    'text!templates/my-warner.html'
], function ($, Backbone, imagesLoaded, ProjectView, tplMyWarner) {
    // 'use strict';
    var MyWarnerView = ProjectView.extend({

      template: _.template(tplMyWarner),

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
    return MyWarnerView;
});
