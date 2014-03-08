/*global define*/

define([
    'julien-perriere'
], function (J) {
    // 'use strict';

    var ProjectModel = Backbone.Model.extend({
    	initialize: function(){
    		console.log('ProjectModel', this);
    	}
        // defaults: {}
    });

    J.Models.ProjectModel = ProjectModel;

    return ProjectModel;
});
