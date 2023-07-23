import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Delete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product data based on the provided ID
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          navigate('/home');
        } else {
          throw new Error('Failed to delete the product.');
        }
      })
  };

  return (
    <div className="container" style={{ marginTop: `40px` }}>
      <div className="card">
        <div className="card-header">
          <h1>Are you sure you want to delete this item?</h1>
        </div>
  
        <div className="card-body">
          {product ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Price ($)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{product.code}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
                  <td>{product.measure}</td>
                  <td>{product.price}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
        </div>
  
        <div className="card-footer">
          <button className="btn btn-danger" style={{ marginRight: "10px" }} onClick={handleDelete}>
            Confirm Delete
          </button>
          <a href="/home" className="btn btn-secondary">
              Cancel
            </a>
        </div>
      </div>
    </div>
  );
          }  

export default Delete;