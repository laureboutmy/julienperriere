/*global define*/

define([
    'backbone', 
    'views/project',
    'text!templates/dreamcatcher.html',
    'vendor/slider'
], function (Backbone, ProjectView, tplDreamcatcher, slideIt) {
    // 'use strict';

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

        // $('html').scrollTop(0);
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
