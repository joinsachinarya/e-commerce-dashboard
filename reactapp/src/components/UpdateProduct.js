import React, { useEffect } from "react";
import {useParams,useNavigate} from 'react-router-dom'

    const UpdateProduct=()=>{
        const [name,setName]=React.useState('');
        const [price,setPrice]=React.useState('');
        const [category,setCategory]=React.useState('');
        const [company,setCompany]=React.useState('');
        const params= useParams();
        const navigete=useNavigate();

        useEffect(()=>{
            getProductDetails();
        },[])


        const getProductDetails=async()=>{
            console.warn(params);
            let result= await fetch(`http://localhost:5000/product/${params.id}`)
            result = await result.json();
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company);
        }
        
        const updateProduct=async()=>{

            console.warn(name,price,category,company)
            let result= await fetch(`http://localhost:5000/product/${params.id}`,{
                method:'put',
                body:JSON.stringify({name,price,category,company}),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            result = await result.json();
            console.warn(result);
            navigete('/')
            
        }


    return (
    <div className="addProduct">
        <p>Update Product</p>
        <input type='text' placeholder='Enter product name' className="inputBox" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
        <input type='text' placeholder='Enter product price'className="inputBox" value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>
        <input type='text' placeholder='Enter product category' className="inputBox" value={category} onChange={(e)=>{setCategory(e.target.value)}}></input>
        <input type='text' placeholder='Enter product company' className="inputBox" value={company} onChange={(e)=>{setCompany(e.target.value)}}></input>
        <button onClick={updateProduct} className="addProductBtn">Update Product</button>
    </div>
    )
}
export default UpdateProduct;