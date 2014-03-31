/*global define*/

define([
    'backbone', 
    'julien-perriere',
    'text!templates/sidebar.html',
    'vendor/helpers'
], function (Backbone, J, tplSidebar, helpers) {
    'use strict';
    var sidebarView = Backbone.View.extend({
      template: _.template(tplSidebar),
      
      el: '#sidebar',

      initialize: function(){
        helpers.init();
      },

      render: function(){
        var self = this;
        this.el.innerHTML = this.template();
        self.bind();
        return this;
      },

      bind: function(){
        var self = this;

        var sidebar = document.getElementById('sidebar'),
            wrapper = document.getElementById('wrapper'),
            main    = document.getElementById('main'),
            infos   = document.querySelectorAll('nav#nav-infos li'), i;

        sidebar.addEventListener('mouseover', function(){ helpers.addClass(wrapper, 'unwound'); });
        sidebar.addEventListener('mouseout', function(){ helpers.removeClass(wrapper, 'unwound'); });
        main.addEventListener('click', function(){ helpers.removeClass(wrapper, 'open'); });
        // Click on sidebar links
        for(i in infos){
          if(i < infos.length) {
            infos[i].addEventListener('click', function(e){
              e.stopPropagation();
              self.switchInfos(this.getAttribute('class')); 
              helpers.addClass(wrapper, 'open'); 
            });
          }
        }

        sidebar.addEventListener('click', function(){ helpers.removeClass(wrapper, 'open'); });
        document.addEventListener('keydown', function(e){
          if(e.keyCode == 27){
            helpers.removeClass(wrapper, 'open'); 
          }
        })
      },
      switchInfos: function(c){
        var infos = document.getElementById('infos');
        helpers.removeClass(infos);
        helpers.addClass(infos, c);
      },
      update: function(project){
        if(project !== ''){
          helpers.removeClass(document.querySelectorAll('section#sidebar li.current')[0])
          helpers.addClass(document.querySelectorAll('section#sidebar [data-project=' + project + ']')[0].parentNode, 'current');
        } else {
          helpers.removeClass(document.querySelectorAll('section#sidebar li.current')[0], 'current');
        }
        
      }
    });

    return sidebarView;
});
