/*global define*/

define([
    'jquery',
    'backbone', 
    'views/project',
    'text!templates/dreamcatcher.html',
    'vendor/slider'
], function ($, Backbone, ProjectView, tplDreamcatcher) {
    // 'use strict';

    var DreamcatcherView = ProjectView.extend({
      template: _.template(tplDreamcatcher),
      animations: {
        "iso": {
          selector: ".iso",
          position: 1300,
          animated: false,
          c: "animate"
        },
        "milestones": {
          selector: ".milestones",
          position: 5340,
          animated: false,
          c: "animate"
        },

        "charts": {
          selector: ".charts",
          position: 6040,
          animated: false,
          c: "animate"
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
        
      },

      // loadImages: function(images){
      //   var self = this;
      //   self.loadStatus = false;
      //   $.each(images, function(image){
      //     if(!image.complete){ self.loadStatus = false; }
      //   })

      //   if(self.loadStatus){
      //     setTimeout("$('section#main').find('ul.meta').addClass('visible')", 3000);
      //     setTimeout("$('section#main').find('header.introduction h1').addClass('visible')", 2700);
      //     $('section#loader').removeClass('complete');
      //   }
      //   return self.loadStatus;
      // },

      bind: function(){
        var self = this,
            currentScroll = 0,
            previousScroll,
            delta;
        $('.slider').slideIt();
        var slides = document.getElementsByClassName('rehg');
        // slideIt(slides);
        $(window).on('scroll DOMMouseScroll MozMousePixelScroll', function(e){
          if(!J.Status.canScroll){ e.preventDefault(); }
          previousScroll = currentScroll;
          currentScroll = window.pageYOffset;
          delta = previousScroll - currentScroll;
          self.renderAnimations(currentScroll, delta);
        });
      }
    })
    return DreamcatcherView;
});
