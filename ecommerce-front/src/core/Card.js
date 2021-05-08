import React from 'react'
import {Link} from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'

const Card = ({product,showViewProductButton = true}) => {

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                <button className="btn btn-outline-primary mt-2 mb-2">View Product</button>
                </Link>
            )
        )
    }

    const showAddToCartButton = () => {
        return(
        <button className="btn btn-outline-warning mt-2 mb-2">
                            Add to Cart
                        </button>
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
        <span className="label label-pill label-primary stockk">In Stock</span>
        ) : (
            <span className="label label-pill label-primary nostockk">Out of Stock</span>
        );
        
    };



    return(

            <div className="card">
                <div className="card-header name">{product.name}</div>
                <div className="card-body">
                    <ShowImage item={product} url="product" />
                    <p className="lead mt-2">{product.description.substring(0, 100)}</p>
                    <p className="black-10">{product.price}€</p>
                    <p className="black-10">Category: {product.category && product.category.name}</p>
                    <p className="black-10">Product added: {moment(product.createdAt).fromNow()}</p>
                        {showStock(product.quantity)}
                        <br/>
                        {showViewButton(showViewProductButton)}

                        {showAddToCartButton()}
                    
                </div>
            </div>

    )
}

export default Card;