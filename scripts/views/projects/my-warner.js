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
          selector: ".brief h2.default",
          position: 1200,
          animated: false,
          c: "animate"
        },
        {
          selector: ".iso",
          position: 1830,
          animated: false,
          c: "animate"
        },
        {
          selector: ".movies h2.default",
          position: 2830,
          animated: false,
          c: "animate"
        },
        {
          selector: ".best-tweets",
          position: 3520,
          animated: false,
          c: "animate"
        },
        {
          selector: ".quizzes",
          position: 4180,
          animated: false,
          c: "animate"
        },
        {
          selector: ".facts",
          position: 4665,
          animated: false,
          c: "animate"
        },
        {
          selector: ".statistics",
          position: 5340,
          animated: false,
          c: "animate"
        },
        {
          selector: ".movies section.final-design",
          position: 5950,
          animated: false,
          c: "animate"
        },
        {
          selector: ".bonuses h2.default",
          position: 7105,
          animated: false,
          c: "animate"
        },
        {
          selector: ".bonuses section",
          position: 7810,
          animated: false,
          c: "animate"
        },
        {
          selector: ".bonuses section",
          position: 9095,
          animated: false,
          c: "animate-more"
        },
        {
          selector: ".profile h2.default",
          position: 10370,
          animated: false,
          c: "animate"
        },
        {
          selector: ".profile",
          position: 11390,
          animated: false,
          c: "animate"
        },
        {
          selector: ".icon h2.default",
          position: 12805,
          animated: false,
          c: "animate"
        },
        {
          selector: ".icon .wireframes",
          position: 13465,
          animated: false,
          c: "animate"
        },
        {
          selector: "section.ipad h2.default",
          position: 13940,
          animated: false,
          c: "animate"
        },
        {
          selector: "section.ipad",
          position: 14630,
          animated: false,
          c: "animate"
        }
      ],

      render: function(){
        var self = this;
        this.el.innerHTML = this.template();
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
