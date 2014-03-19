/*global define*/

define([
    'backbone', 
    'text!templates/sidebar.html',
    'vendor/helpers'
], function (Backbone, tplSidebar, helpers) {
    'use strict';
    var sidebarView = Backbone.View.extend({
      template: _.template(tplSidebar),
      
      el: '#sidebar',

      initialize: function(){
        helpers.init();
      },

      render: function(){
        this.el.innerHTML = this.template();
        this.bind();
        return this;
      },

      bind: function(){
        var _this = this;

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
              _this.getInfos(this.getAttribute('class')); 
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

      update: function(project){
        helpers.removeClass(document.querySelectorAll('section#sidebar li.current')[0])
        helpers.addClass(document.querySelectorAll('section#sidebar [data-project=' + project + ']')[0].parentNode, 'current');
      },

      getInfos: function(c){
        var infos = document.getElementById('infos');
        helpers.removeClass(infos);
        helpers.addClass(infos, c);
      }
    });

    return sidebarView;
});
