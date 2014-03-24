/*global define*/

define([
    'backbone', 
    'text!templates/infos.html',
    'vendor/helpers'
], function (Backbone, tplInfos, helpers) {
    'use strict';
    var sidebarView = Backbone.View.extend({
      template: _.template(tplInfos),
      
      el: '#infos',
      initialize: function(){
        helpers.init();
      },

      render: function(){
        this.el.innerHTML = this.template();
        this.bind();
        return this;
      },

      bind: function(){
        var self = this;
        document.getElementById('hire').addEventListener('click', function(e){
          e.preventDefault();
          self.switchInfos('contact');
        }

        document.querySelectorAll('button[type="submit"]')[0].addEventListener('click', function(e){
          e.preventDefault();
          var form = this.parentNode,
              name = form.querySelector('input[name="name"]'),
              email = form.querySelector('input[name="email"]'),
              message = form.querySelector('textarea'),
              error = false;

          if(email.value === '' || name.value === '' || message.value === '' || /\S+@\S+\.\S+/.test(email.value)){ error = true; }
          if(error){
            form.querySelector('span.message').innerHTML = 'Whoops! That\'s a no-go.';
            helpers.addClass(form.querySelector('span.message'), 'visible');
          } else {
            var data = {
                name: name.value,
                email: email.value,
                message: message.value
              };
            var request = new XMLHttpRequest();
            request.open('POST', 'form.php', true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            request.send(data);
          }
        });
      },

      switchInfos: function(c){
        var infos = document.getElementById('infos');
        helpers.removeClass(infos);
        helpers.addClass(infos, c);
      }
    });

    return sidebarView;
});
