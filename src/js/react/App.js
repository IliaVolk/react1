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
