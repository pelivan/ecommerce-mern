import React, {Fragment} from 'react' //Used to wrap multiple blocks
import {Link, withRouter} from 'react-router-dom'
import {signout,isAuthenticated} from '../auth'

const isActive = (history, path) => {
    if(history.location.pathname === path){
        return {color: '#EE82EE'};
    } else {
        return {color: '#ffffff'};
    }
};//we access history from props
const Menu = ({history}) => (
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li class="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
            </li>
            {!isAuthenticated() && (
                <Fragment> 
                    <li class="nav-item">
                <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link>
            </li>
            <li class="nav-item">
                <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Singup</Link>
            </li>
                </Fragment>
            )}
            {isAuthenticated() && (
                <li class="nav-item">
                <span className="nav-link" style={{cursor: 'pointer',color: '#ffffff'}} onClick ={ () => signout( () => {
                    history.push('/');
                })}>Signout</span>
            </li>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);