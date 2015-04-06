define([
    'jquery',
    'underscore',
    'backbone',
    'router'
], function($, _, Backbone){
    return {
        initialize: function(){
            'use strict';
            window.router = new Router({ pushState: true });
            Backbone.history.start();
        }
    };
});
