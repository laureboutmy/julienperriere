/*global define*/

define([
    'backbone', 
    'julien-perriere',
    'text!templates/infos.html',
    'vendor/helpers'
], function (Backbone, J, tplInfos, helpers) {
    'use strict';
    var infosView = Backbone.View.extend({
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
        // document.getElementById('hire').addEventListener('click', function(e){
        //   e.preventDefault();
        //   self.switchInfos('contact');
        // })

        document.querySelector('button[type="submit"]').addEventListener('click', function(e){
          e.preventDefault();
          var form = this.parentNode,
              name = form.querySelector('input[name="name"]').value,
              email = form.querySelector('input[name="email"]').value,
              message = form.querySelector('textarea').value,
              error = false;
          if(email == '' || name == '' || message == '' || !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){ error = true; }
          if(error){

            form.querySelector('span.message').innerHTML = 'Whoops! That\'s a no-go.';
            helpers.addClass(form.querySelector('span.message'), 'visible');
          } else {
            var data = new FormData();
            data.append('name', name);
            data.append('email', email);
            data.append('message', message);
            var request = new XMLHttpRequest();
            request.open('POST', 'form.php', true);
            request.onreadystatechange = function(){
              if(request.readyState == 4){
                var response = JSON.parse(request.responseText);
                if(response){
                  form.querySelector('span.message').innerHTML = 'Yay! Thanks for your message.';
                  helpers.addClass(form.querySelector('span.message'), 'visible');
                } else {
                  form.querySelector('span.message').innerHTML = 'Whoops! That\'s a no-go.';
                  helpers.addClass(form.querySelector('span.message'), 'visible');
                }
              }
            }
            // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
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

    return infosView;
});
