import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { number, object, string } from "yup";


function Order() {
    const token=localStorage.getItem("userToken")
    const[error,setError]=useState("")
    const navigate=useNavigate();
    const[loader,setLoader]=useState(false);
    const[details,setDetails]=useState([]);
    const[total,setTotal]=useState("")
    const[user,setUser]=useState({
        couponName:"",
        address:"",
        phone:""
 })
 const getCart = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setDetails(data.products);
      console.log(data.products);
    } catch (Error) {
      setError(Error.response.data.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getCart();
  },[]);
 const handleChange=(e)=>{
    const{ name, value }=e.target;
    setUser({
   ...user,
      [name]:value
    })
 }
 const finalPrice=()=>{
    let total=0;
    details.map((item)=>{
        total+=item.details.finalPrice*item.quantity
    })
   setTotal(total);
 }
 useEffect(()=>{
    finalPrice();
 },[details])

 const validateData = async () => {
    const registerSchema = object({
        couponName: string(),
        address: string().required(),
      phone: number().required(),
    });
    try {
      await registerSchema.validate(user, { abortEarly: false });
      return true;
    } catch (Error) {
      setError(Error.errors);
      return false;
    }
  };
 const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoader(true);
    if(details.length>0){
   if( await validateData()){
    try{
    const{data}=await axios.post(`${import.meta.env.VITE_API_URL}/order`,user,{
        headers:{
            Authorization:`Tariq__${token}`
        }
    })
    console.log(data);
   if(data.message==="success"){
    toast.success("order send success", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
   }
   navigate("/Profile")
}catch(Error){console.log(Error)}
finally{
    setLoader(false);
}
 }
}
else{
    setLoader(true)
   toast.error("please add Product", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
}
 setLoader(false);
 }

  return (
    <>
        <div>
      <div>
        <table className="col-12"  >
          <thead>
            <tr>
              <th className="p-5">Product</th>
              <th>Image</th>
              <th className="p-5">Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
        {
            details.map(e=>{
                return(
                    <tr key={e._id}>
                        <td className="p-5">{e.details.name}</td>
                        <td className="d-flex ratio ratio-4x3 p-5">
                          <img src={e.details.mainImage.secure_url}/>
                        </td>
                        <td className="p-5">{e.quantity}</td>
                        <td>{e.details.finalPrice*e.quantity}</td>
                    </tr>
                )
            })
        }
          </tbody>
          <tfoot>
            <tr>
              <td>Total Price:{total}</td>
            </tr>
          </tfoot>
          </table>
          </div>
          </div>

   
    {error.length>0?error.map(e=><p key={e}>{e}</p>):""}
    <form onSubmit={handleSubmit}>
    <div className="d-flex flex-column gap-2 col-4 align-items-center justify-content-center m-auto">
<label htmlFor="couponName">couponName</label>
<input type="text" id="couponName" onChange={handleChange} name="couponName" />
<label htmlFor="address">address</label>
<input type="text" id="address" onChange={handleChange} name="address"/>
<label htmlFor="phone">phone</label>
<input type="number" id="phone" onChange={handleChange} name="phone"/>
<input type="submit" value="sendOrder" disabled={loader?"disabled":""}/>
</div>
  </form>
  </>
  )
}

export default Order