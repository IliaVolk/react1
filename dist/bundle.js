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
/**
 * Created by user on 23.07.2016.
 */

class AddUserComponent extends React.Component{
    constructor(){
        super();
        this.onAddUser = this.onAddUser.bind(this);
    }
    static get propTypes(){
        return{
            onAddUser: React.PropTypes.func
        };
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
    static get propTypes(){
        return {
            user: React.PropTypes.instanceOf(User),
            onRemoveUser: React.PropTypes.func
        }
    }
    componentDidMount() {
        $(ReactDOM.findDOMNode(this)).css("display", "none").slideDown();
    }

    onRemoveUser(){
        $(ReactDOM.findDOMNode(this)).slideUp(()=>{
            this.props.onRemoveUser(this);
            console.log("onRemoveUser");
        });
    }
    shouldComponentUpdate(){return false;}
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
