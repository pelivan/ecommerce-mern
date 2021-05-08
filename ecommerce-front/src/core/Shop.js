import React,{useState,useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import {getCategories,getFilteredProducts} from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import {prices} from './fixedPrices';

const Shop = () => {

    const[myFilters,setMyFilters] = useState({
        filters: {category: [],price:[]} 
    })

    const[categories,setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories()
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        })
    };

    const loadfilteredResults =(newFilters) => {
        // console.log(newFilters);
        getFilteredProducts(skip,limit,newFilters).then(data => {
            if(data.error){
                setError(data.error)
            } else {
                setFilteredResults(data.data)
            }
        })
    };

    useEffect(() => {
        init();
        loadfilteredResults(skip,limit,myFilters.filters);
    },[])

    const handleFilters = (filters, filterBy) => {
        //console.log("SHOP",filters,filterBy);
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters;
        if(filterBy == "price")
        {
            let priceValues =  handlePrice(filters)
            newFilters.filters[filterBy] = priceValues;
        }
        loadfilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices
        let array = []

        for(let key in data){
            if(data[key]._id === parseInt(value))
            {
                array = data[key].array //if id matches we want to get array
            }
            
        };
        return array;
    };

    

    return(
        <Layout className="container-fluid" title="Shop page" description="Search and find products that you want to buy">
    
            <div className="row">
                <div className="col-2">
                    <h4>Categories</h4>
                    <ul>
                    <Checkbox 
                    categories={categories}
                    handleFilters={filters => 
                        {handleFilters(filters,'category')}}

                    />
                    </ul>

                    <h4>Price Range</h4>
                    <div>
                    <RadioBox 
                    prices={prices}
                    handleFilters={filters => 
                        {handleFilters(filters,'price')}}

                    />
                    </div>
                </div>

                <div className="col-9">  
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((product,i) => (
                                <Card key={i} product={product}/>    
                        ))}
                    </div>
                </div>
            </div>
           
        </Layout>
        );
}

export default Shop;