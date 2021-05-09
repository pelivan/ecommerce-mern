export const addItem = (item,next) => {
    let cart = []
    if(typeof window != 'undefined') 
    {
        if(localStorage.getItem('cart'))
        {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.push({
            ...item,
            count: 1
        })

        //to avoid duplicated items we will create new array

        cart = Array.from(new Set(cart.map((p) => (p._id)))).map(id => {
            return cart.find(p => p._id === id)
        });

        localStorage.setItem('cart',JSON.stringify(cart))
    };
};

export const itemTotal = () => {
    if(typeof window !== 'undefined')
    {
        if(localStorage.getItem('cart'))
        {
            return JSON.parse(localStorage.getItem('cart')).length
        }
    };
    return 0; //default
};

export const getCart = () => {
    if(typeof window !== 'undefined')
    {
        if(localStorage.getItem('cart'))
        {
            return JSON.parse(localStorage.getItem('cart'))
        }
    };
    return []; //if cart is empty return empty array
};

export const updateItem = (productId,count) => {
    let cart = [];
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product,i) => {
            if(product._id === productId)
            {
                //we found product and now we want to update count
                cart[i].count = count
            }
        });
        localStorage.setItem('cart',JSON.stringify(cart));
    };
};

export const removeItem = (productId) => {
    let cart = [];
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product,i) => {
            if(product._id === productId)
            {
                //we found product and now we want to update count
                cart.splice(i,1);
            }
        });
        localStorage.setItem('cart',JSON.stringify(cart));
    };
    return cart;
};

