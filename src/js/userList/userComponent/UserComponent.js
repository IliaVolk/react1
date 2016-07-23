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