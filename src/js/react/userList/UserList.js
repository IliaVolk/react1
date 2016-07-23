/**
 * Created by user on 23.07.2016.
 */

"use strict";


class UserList extends React.Component {
    constructor() {
        super();
        this.userToUserComponent = this.userToUserComponent.bind(this);
        this.onAddUser = this.onAddUser.bind(this);
        this.onRemoveUser = this.onRemoveUser.bind(this);
        this.state = this.getInitialState();
    }
    removeUserComponentFromArray(userComponent) {
        "use strict";
        let array = this.state.userComponents;
        for (let i = 0; i < array.length; i++) {
            if (array[i].props.user.id === userComponent.props.user.id) {
                array.splice(i, 1);
                return;
            }
        }
    };
    getInitialState() {
        console.log("UserList.getInitialState");
        var users = [
            new User("Василий"),
            new User("Алексей")
        ];
        return {
            userComponents: users.map(this.userToUserComponent)
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
        this.state.userComponents.push(this.userToUserComponent(new User(name)));
        this.forceUpdate();
    }

    onRemoveUser(userComponent) {
        console.log(`onRemoveUser(${userComponent}`);
        this.removeUserComponentFromArray(userComponent);
        this.forceUpdate();
    }

    render() {
        console.log("UserList.render()");
        return (
            <div className="container user-list">
                <h3 className="list-component row">User list:</h3>
                <AddUserComponent onAddUser={this.onAddUser}/>
                {this.state.userComponents}
            </div>
        )
    }
}