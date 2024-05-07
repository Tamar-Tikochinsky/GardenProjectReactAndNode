import { Button } from "@mui/material";
import { amber } from "@mui/material/colors";
import { render } from "@testing-library/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/base";
import "./Store.css"

const Maneger = () => {
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
  useEffect(() => { showProduct() }, [product])


  async function deleteProduct(i) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": i._id
    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
      body: raw
    };

    fetch("http://localhost:7001/api/product", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      // .then(navigate('/store'))
      .catch(error => console.log('error', error));

  }

  const update=(p)=>{
    navigate('/UpdateProduct',{state:p})
}
const add=()=>{
  navigate('/addProduct')
}

  return (
    <>
      <div className="title" >מוצרים לגינה</div>
      {product && product.map((p) => {
        return <div className="border" key={p._id} id="div">
          <h3 style={{ fontFamily: "Guttman Yad-Brush" }}>{p.name + " | " + p.price + "₪"}</h3>
          <br></br>
          <img src={p.Image} style={{ width: '100%', height: '220px' }}></img><br></br>
          <Button onClick={() => deleteProduct(p)}>מחיקת פריט</Button>
          <Button onClick={() =>update(p)}>עידכון פריט</Button>
          {/* <button onClick={() => addToBasket(p)}>הוספה לסל</button> */}
          <img>100.jpg</img>
          <br></br>
          <br></br>
          <br></br>
          
        </div>
      })}
  <Button onClick={()=>add()}>הוספת פריט</Button>

    </>
  )
}
export default Maneger;
