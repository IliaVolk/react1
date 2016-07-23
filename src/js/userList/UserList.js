/**
 * Created by user on 23.07.2016.
 */

"use strict";
var removeUserFromArray = (array, user)=> {
    "use strict";
    for (let i = 0; i < array.length; i++) {

        if (array[i].id === user.id) {
            array.splice(i, 1);
            return;
        }
    }
};
var nextId = function () {
    var id = 0;
    return function () {
        return id++
    }
}();

class UserList extends React.Component {
    constructor() {
        super();

        this.userToUserComponent = this.userToUserComponent.bind(this);
        this.onAddUser = this.onAddUser.bind(this);
        this.onRemoveUser = this.onRemoveUser.bind(this);
        this.state = this.getInitialState();
    }

    getInitialState() {
        console.log("UserList.getInitialState");
        var users = [{
            id: nextId(),
            name: "Василий"
        }, {
            id: nextId(),
            name: "Алексей"
        }];
        return {
            users: users
        };
    }

    userToUserComponent(user) {
        console.log(`userToUserComponent(${user})`)
        return (
                <UserComponent
                    key={user.id}
                    onRemoveUser={this.onRemoveUser}
                    user={user}/>
        )
    }

    /**
     * @param {string}name
     */
    onAddUser(name) {
        console.log(`onAddUser(${name})`);
        this.state.users.push({name: name, id: nextId()});
        this.forceUpdate();
    }

    onRemoveUser(user) {
        console.log(`onRemoveUser(${user}`);
        removeUserFromArray(this.state.users, user);
        this.forceUpdate();
    }

    render() {
        console.log("UserList.render()");
        var userComponents = this.state.users.map(this.userToUserComponent);
        return (
            <div className="container user-list">
                <h3 className="list-component row">User list:</h3>

                <AddUserComponent onAddUser={this.onAddUser}/>
                {userComponents}
            </div>
        )
    }
}