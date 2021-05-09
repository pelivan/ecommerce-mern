import React, {Fragment} from 'react' //Used to wrap multiple blocks
import {Link, withRouter} from 'react-router-dom'
import {signout,isAuthenticated} from '../auth'
import {itemTotal} from './CartHelpers'

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
            <li class="nav-item">
                <Link className="nav-link" style={isActive(history, '/shop')} to="/shop">Shop</Link>
            </li>
            <li class="nav-item">
                <Link className="nav-link" style={isActive(history, '/cart')} to="/cart">Cart <sup><small className="cart-badge">{itemTotal()}</small></sup></Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li class="nav-item">
                <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
            </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li class="nav-item">
                <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/admin/dashboard">Dashboard</Link>
            </li>
            )}
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