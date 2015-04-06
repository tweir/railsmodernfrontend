define(['backbone'], function (Backbone) {
    'use strict';
    return Backbone.Router.extend({
        initialize: function () {
            this.home();
        },
        routes: {
            'home': 'home'
        },
        home: function () {

        }
    });
});
