// import { Button } from "@mui/base";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { Input } from "@mui/material";
import './Store.css'
const UpdateProduct=()=>{
    const data=useLocation()
    const p =data.state;
    const [name, setName] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState(0);
    const [Image, setImage] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        setName(p.name)
        setSize(p.size)
        setPrice(p.price)
        setImage(p.Image)
    },[])
    async function updateProduct () {
      
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
          "id": p._id,
          "name": name,
          "size":size,
          "price":price,
          "Image": Image
        });
    
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          redirect: 'follow',
          body: raw
        };
    
        fetch("http://localhost:7001/api/product", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .then(navigate('/maneger'))
          .catch(error => console.log('error', error));
      }
    
   
   const bitul=()=>{
    navigate('/maneger')
   }
   return(<div className="center">
         <div className="title" >מוצרים לגינה</div>

         <br></br>
                    <Input placeholder={name} onChange={e=>setName(e.target.value)}></Input>:שם מוצר
                    <br></br>
                    <Input  placeholder={size}   onChange={e=>setSize(e.target.value)}></Input>:גודל מוצר
                    <br></br>
                    <Input placeholder={price}  onChange={e=>setPrice(e.target.value)}></Input>:מחיר מוצר
                    <br></br>
                    <Input placeholder={Image}  onChange={e=>setImage(e.target.value)}></Input>:תמונת מוצר
                    <br></br>
                    <Button onClick={()=>updateProduct()}>עידכון מוצר</Button>
                    <Button onClick={()=>bitul()}> ביטול</Button>

        </div>)
}
export default UpdateProduct