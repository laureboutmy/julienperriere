/*global define*/

define([
    'backbone', 
    'julien-perriere',
    'imagesloaded',
    'views/project',
    'text!templates/kolok.html'
], function (Backbone, J, imagesLoaded, ProjectView, tplKolok) {
    // 'use strict';
    var KolokView = ProjectView.extend({

      template: _.template(tplKolok),

      animations: [
        {
          selector: ".brief h2.default",
          position: 1200,
          animated: false,
          c: "animate"
        },
        {
          selector: ".iso",
          position: 1800,
          animated: false,
          c: "animate"
        },
        {
          selector: ".design-guidelines h2.default",
          position: 2785,
          animated: false,
          c: "animate"
        },
        {
          selector: ".the-k-icon",
          position: 3430,
          animated: false,
          c: "animate"
        },
        {
          selector: ".color-palette",
          position: 3950,
          animated: false,
          c: "animate"
        },
        {
          selector: ".typography",
          position: 4390,
          animated: false,
          c: "animate"
        },
        {
          selector: ".datavisualizations  h2.default",
          position: 4830,
          animated: false,
          c: "animate"
        },
        {
          selector: ".share-expenses",
          position: 5500,
          animated: false,
          c: "animate"
        },
        {
          selector: ".who-owes-who",
          position: 6180,
          animated: false,
          c: "animate"
        },
        {
          selector: ".bank-account",
          position: 6860,
          animated: false,
          c: "animate"
        },
        {
          selector: ".total-expenses",
          position: 7425,
          animated: false,
          c: "animate"
        },
        {
          selector: ".final-design  h2.default",
          position: 7960,
          animated: false,
          c: "animate"
        },
        {
          selector: ".home-screen",
          position: 8490,
          animated: false,
          c: "animate"
        },
        {
          selector: ".expenses-details",
          position: 10100,
          animated: false,
          c: "animate"
        },
        {
          selector: ".services-location",
          position: 11700,
          animated: false,
          c: "animate"
        },
        {
          selector: ".welcome-process",
          position: 13300,
          animated: false,
          c: "animate"
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
