/**
 * Created by user on 23.07.2016.
 */
var nextId = function () {
    var id = 0;
    return function () {
        return id++
    }
}();

class User{
    constructor(name){
        this.name = name;
        this.id = nextId();
        console.log(`creating User: ${name}`);
    }
}