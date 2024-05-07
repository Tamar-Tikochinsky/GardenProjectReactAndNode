import { Button } from "@mui/material";
import { amber } from "@mui/material/colors";
import { render } from "@testing-library/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Store.css"

const Customer = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  async function showProduct(user) {
    try {
      const response = await fetch("http://localhost:7001/api/product")
      const data = await response.json();
      setProduct(data)
    }
    catch (error) {
      console.log("failed to fetch");
    }
  }


  
 async function addToBasket(p){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("userToken")}` );
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "product": p._id,
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://localhost:7001/api/basket", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
async function showBasket(){
    navigate('/showBasket')
}

// var v;
// function getValue(e){
// v=v+1;
// }


showProduct()
  return (
    <>
     <div className="title" >מוצרים לגינה</div>
      {product && product.map((p) => {
        return <div className="border" key={p._id} id="div">
          <h3 style={{ fontFamily: "Guttman Yad-Brush" }}>{p.name + " | " + p.price + "₪"}</h3>
          <br></br>
          <img src={p.Image} style={{ width: '100%', height: '220px' }}></img><br></br>
          {/* <input type="number" min="0" max="100" step="1" placeholder="1"  onChange={(e)=>getValue(e.target.value)}></input> */}
          <Button onClick={() => addToBasket(p)}>הוספה לסל</Button>
          <br></br>
          <br></br>
          <br></br>
        </div>
      })}
<Button onClick={()=>showBasket()}> הצגת כל המוצרים בסל</Button>
    </>
  )
}
export default Customer;