/**
 * Created by user on 23.07.2016.
 */

class AddUserComponent extends React.Component{
    constructor(){
        super();
        this.onAddUser = this.onAddUser.bind(this);
    }

    onAddUser(){
        console.log("AddUserComponent.onAddUser")
        var inputNode = ReactDOM.findDOMNode(this.refs.input);
        this.props.onAddUser(
            inputNode.value);
        inputNode.value = "";
    }

    render(){
        console.log("AddUserComponent.render")
        return (
            <div className="list-component row">
                <input type="text" ref="input" placeholder="New Name"/>
                <button className="btn btn-primary"
                    onClick={this.onAddUser}>
                    Submit</button>
            </div>
        )
    }
}
/**
 * Created by user on 23.07.2016.
 */
class UserComponent extends React.Component{

    constructor() {
        super();
        this.onRemoveUser = this.onRemoveUser.bind(this);

    }
    componentDidMount() {
        $(ReactDOM.findDOMNode(this)).css("display", "none").slideDown();
    }

    onRemoveUser(){
        $(ReactDOM.findDOMNode(this)).slideUp(()=>{
            this.props.onRemoveUser(this.props.user);
            console.log("onRemoveUser");
        });
    }
    render() {
    return (
        <div className="list-component row">
            Name: {this.props.user.name}
            <button className="btn btn-danger pull-right" onClick={this.onRemoveUser}>Remove</button>
        </div>
    );
}
}
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
/**
 * Created by user on 23.07.2016.
 */



class App extends React.Component{
    render() {
        return (
            <div>
                <UserList/>
            </div>
        );
    }
}


ReactDOM.render(
    <div>
        <App/>
    </div>
        , document.getElementById("root"));
