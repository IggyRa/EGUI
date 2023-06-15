import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () =>{

const[code,codechange] = useState("");
const[name,namechange] = useState("");
const [description, dchange] = useState('');
const [category, cchange] = useState('');
const [quantity, qchange] = useState('');
const [measure, mchange] = useState('kg');
const [price, pchange] = useState('');
const navigate=useNavigate();
    
const handlecreate = (e) => {
  e.preventDefault();
  let regobj = {code,name,description,category,quantity,measure,price};
  fetch("http://localhost:5000/products",{
      method:"POST",
      headers:{'content-type':'application/json'},
      body:JSON.stringify(regobj)
  }).then((res)=>{
      navigate('/home')
  })
};
    
return (
  <div className="offset-lg-4 col-lg-4" style={{ marginTop: '40px' }}>
    <form className="container" onSubmit={handlecreate}>
      <div className="card">
        <div className="card-header">
          <h1>Create a product</h1>
        </div>
        <div className="card-body">
          <div className="col-lg-6">
            <div className="form-group">
              <label>Unique code<span className="errmsg"> *up to 8 characters</span></label>
              <input className="form-control" maxLength={8} required value={code} onChange={e => codechange(e.target.value)} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Name<span className="errmsg">  *up to 16 characters</span></label>
              <input className="form-control" maxLength={16} required value={name} onChange={e => namechange(e.target.value)} />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="form-group">
              <label>Description<span className="errmsg"> *</span></label>
              <input className="form-control" required value={description} onChange={e => dchange(e.target.value)} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Category<span className="errmsg"> *</span></label>
              <input className="form-control" required value={category} onChange={e => cchange(e.target.value)} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Quantity<span className="errmsg"> *</span></label>
              <input className="form-control" required value={quantity} onChange={e => qchange(e.target.value)} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Measure</label>
              <select className="form-control" value={measure}onChange={e => mchange(e.target.value)}>
                <option value="kg">kg</option>
                <option value="pcs">pcs</option>
                <option value="litre">litre</option>
              </select>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Price<span className="errmsg"> *</span></label>
              <input className="form-control" required value={price} onChange={e => pchange(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button type="submit" className="btn btn-success"  style={{ marginRight: `10px` }}>Create</button>
          <a href="/home" className="btn btn-secondary">Cancel</a>
        </div>
      </div>
    </form>
  </div>
);    
}

export default Create;