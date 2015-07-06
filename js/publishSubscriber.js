/**
 * Created by icojocaru on 7/6/2015.
 */

myApp = myApp || {};

myApp.pubSub = (function(){
    "use strict";

    var events = {};

    function listen(key, handler){
        if(!(events[key])){
            events[key] = [];
        }
        events[key].push(handler);
    };

    function fire(key, word, column, context){
        for(var i = 0; i < events[key].length; i++){
            events[key][i].call(context, word, column);
        }
    };

    return{
        listen: listen,
        fire: fire
    };
})();
