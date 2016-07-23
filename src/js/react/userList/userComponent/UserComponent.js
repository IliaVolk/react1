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