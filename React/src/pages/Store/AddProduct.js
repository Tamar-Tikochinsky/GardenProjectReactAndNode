// import { Button } from "@mui/base";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Store from "../pages/Store/Store";
import { Button } from "@mui/material";
import { Input } from "@mui/material";
import "./Store.css"

const AddProduct=()=>{
    const [name, setName] = useState();
    const [size, setSize] = useState();
    const [price, setPrice] = useState();
    const [Image, setImage] = useState();
    const navigate = useNavigate();
    async function  addProduct(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
        "name":name,
        "size":size,
        "price":price,
        "Image":Image
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
    
    fetch("http://localhost:7001/api/product", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .then(navigate('/maneger'))
      .catch(error => console.log('error', error))
   
    // navigate('/store')
 }

 const bitul=()=>
 {
  navigate('/maneger')
 }   
   
   
   return(
   <div className="center">
         <br></br>
                   <Input  defualtvalue={name} onChange={e=>setName(e.target.value)}></Input>:שם
                    <br></br>
                    <Input defualtvalue={size}  onChange={e=>setSize(e.target.value)} ></Input>:גודל 
                    <br></br>
                    <Input defualtvalue={price}  onChange={e=>setPrice(e.target.value)}></Input>:מחיר 
                    <br></br>
                    <Input defualtvalue={Image} onChange={e=>setImage(e.target.value)}></Input>:תמונת 
                    <br></br>
                    <Button onClick={()=>addProduct()}>הוספת מוצר</Button>
                    <Button onClick={()=>bitul()}>ביטול</Button>
   </div>)
}
export default AddProduct