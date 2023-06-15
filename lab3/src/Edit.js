import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';


const Edit = () => {
const { id } = useParams();
const [code, setCode] = useState("");
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [category, setCategory] = useState("");
const [quantity, setQuantity] = useState("");
const [measure, setMeasure] = useState("");
const [price, setPrice] = useState("");
const navigate = useNavigate();

useEffect(() => {
// Fetch the existing product details based on the ID from the server
fetch(`http://localhost:5000/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
    setCode(data.code);
    setName(data.name);
    setDescription(data.description);
    setCategory(data.category);
    setQuantity(data.quantity);
    setMeasure(data.measure);
    setPrice(data.price);
    });
}, [id]);

  const handleEdit = (e) => {
    e.preventDefault();
    const editedProduct = {code,name,description,category,quantity,measure,price,};

    fetch(`http://localhost:5000/products/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(editedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/home");
      });
  };

  return (
    <div className="offset-lg-4 col-lg-4" style={{ marginTop: "40px" }}>
      <form className="container" onSubmit={handleEdit}>
        <div className="card">
          <div className="card-header">
            <h1>Edit Product</h1>
          </div>
          <div className="card-body">
            <div className="col-lg-6">
              <div className="form-group">
                <label>Unique code<span className="errmsg"> *up to 8 characters</span></label>
                <input className="form-control"maxLength={8}requiredvalue={code}onChange={(e) => setCode(e.target.value)}/>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label> Name<span className="errmsg"> *up to 16 characters</span></label>
                <input className="form-control"maxLength={16}requiredvalue={name}onChange={(e) => setName(e.target.value)}/>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label>Description<span className="errmsg"> *</span></label>
                <textarea className="form-control"requiredvalue={description}onChange={(e) => setDescription(e.target.value)}/>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label>Category<span className="errmsg"> *</span></label>
                <input className="form-control" required value={category} onChange={(e) => setCategory(e.target.value)}/>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label>Quantity<span className="errmsg"> *</span></label>
                <input className="form-control" required value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label>Measure</label>
                <select className="form-control" value={measure} onChange={(e) => setMeasure(e.target.value)}>
                  <option value="kg">kg</option>
                  <option value="pcs">pcs</option>
                  <option value="litre">litre</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label>Price<span className="errmsg"> *</span></label>
                <input className="form-control" required value={price}onChange={(e) => setPrice(e.target.value)}/>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit"className="btn btn-primary"style={{ marginRight: "10px" }}>Update</button>
            <a href="/home" className="btn btn-secondary">
              Cancel
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;