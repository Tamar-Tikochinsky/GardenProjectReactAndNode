import { Button } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

const ShowBasket = () => {

const [product, setProduct] = useState([]);
useEffect(() => {showBasket() }, [product])
async function showBasket(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("userToken")}` );
        myHeaders.append("Content-Type", "application/json");
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
        //   body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:7001/api/basket", requestOptions)
          .then(response => response.json())
          .then(d=>setProduct(d))
          .then(c=>console.log(product))
          .catch(error => console.log('error', error));



  }



async function remove(p){
  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("userToken")}`);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "id": p._id
});

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:7001/api/basket", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

  return (
    <>
      <div className="title" >מוצרים לגינה</div>
      {product && product.map((p) => {
        if(p.product.name){

       
        return <div style={{ fontFamily: "Guttman Yad-Brush" }} className="border" key={p._id} id="div">
          <h3>{p.product.name + " | " + p.product.price + "₪"}</h3>
          <br></br>
          <img src={p.product.Image} style={{ width: '100%', height: '220px' }}></img><br></br>
          <div>{"quantity: " + p.count} </div>
          <Button onClick={() => remove(p)}> הסרה</Button>
          <br></br>
          <br></br>
          <br></br>
        </div>
      } })}
    </>
  )
}
 export default ShowBasket;
//  