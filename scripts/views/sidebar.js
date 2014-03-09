/*global define*/

define([
    'backbone', 
    'text!templates/sidebar.html',
    'vendor/helpers'
], function (Backbone, tplSidebar, helpers) {
    // 'use strict';
    var sidebarView = Backbone.View.extend({
      template: _.template(tplSidebar),
      
      el: '#sidebar',

      initialize: function(){
      	// console.log('sidebar View', this);
        helpers.init();
      },

      render: function(){
        this.$el.html(this.template());
        this.bind();
        return this;
      },

      bind: function(){
        var _this = this;

        var sidebar = document.getElementById('sidebar'),
            wrapper = document.getElementById('wrapper'),
            main    = document.getElementById('main'),
            infos   = document.querySelectorAll('nav#nav-infos li');

        sidebar.addEventListener('mouseover', function(){ helpers.addClass(wrapper, 'unwound'); });
        sidebar.addEventListener('mouseout', function(){ helpers.removeClass(wrapper, 'unwound'); });

        for(i in infos){
          if(i < infos.length) {
            infos[i].addEventListener('click', function(){
              _this.getInfos(this.getAttribute('class')); 
              helpers.addClass(wrapper, 'open'); 
            });
          }
        }

        main.addEventListener('click', function(){ helpers.removeClass(wrapper, 'open'); });
        document.addEventListener('keydown', function(e){
          if(e.keyCode == 27){
            helpers.removeClass(wrapper, 'open'); 
          }
        })
        // $('section#sidebar').on('mouseover', function(){
        //   $('div#wrapper').addClass('unwound'); 
        // });
        // $('section#sidebar').on('mouseout', function(){
        //   $('div#wrapper').removeClass('unwound'); });
        // $('nav#infos li').on('click', function(){
        //   // J.Status.infos = true;
        //   $('div#wrapper').addClass('open'); });
        // $('section#main').on('click', function(){
        //   // J.Status.infos = false;
        //   $('div#wrapper').removeClass('open'); });
      },

      update: function(project){
        helpers.removeClass(document.querySelectorAll('section#sidebar li.current')[0])
        helpers.addClass(document.querySelectorAll('section#sidebar [data-project=' + project + ']')[0].parentNode, 'current');
        // $('section#sidebar li.current').removeClass();
        // $('section#sidebar [data-project=' + project + ']').parent().addClass('current');
      },

      getInfos: function(c){
        var infos = document.getElementById('infos');
        helpers.removeClass(infos);
        helpers.addClass(infos, c);
        // $('section#infos').removeClass();
        // $('section#infos').addClass(c); 
      }
    });

    return sidebarView;
});
