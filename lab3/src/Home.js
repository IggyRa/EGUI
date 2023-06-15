import { useEffect, useState} from "react";
import { Link } from 'react-router-dom';

const Home = () => {

    const[items,itemschange] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:5000/products").then((res)=>{
            return res.json();
        }).then((resp)=>{
            itemschange(resp);
        })   
    },[])

    const total = () => {
    let totalcount =0;
        for(let item of items){
            let help = item.quantity*item.price; 
            totalcount = totalcount+help; 
        }
        return totalcount;
    }

    return(
        <div className="container" style={{ marginTop: `40px` }} >
            <div className="card">

                <div className="card-header">
                    <h1>Warehouse item list</h1>
                    <a href="/create" className="btn btn-success" >Add product</a>
                </div>

                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                        <td> Code</td>
                        <td> Name </td>
                        <td> Description </td>
                        <td> Category </td>
                        <td> Quantity </td>
                        <td> Unit </td>
                        <td> Price ($) </td>
                        <td> Total ($) </td>
                        <td> Actions </td>
                        </tr>
                        </thead>
                        <tbody>
                            {items &&
                                items.map(item=>(
                                    <tr key={item.id}>
                                        <td> {item.code}</td>
                                        <td> {item.name} </td>
                                        <td> {item.description} </td>
                                        <td> {item.category} </td>
                                        <td> {item.quantity} </td>
                                        <td> {item.measure} </td>
                                        <td> {item.price}</td>
                                        <td> {Math.round(item.quantity*item.price * 100) / 100}</td>
                                        <td>
                                        <Link to={`/edit/${item.id}`} className="btn btn-primary" style={{ marginRight: `10px` }}>Edit</Link>
                                        <Link to={`/delete/${item.id}`} className="btn btn-danger" >Delete</Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                
                <div className="card-footer">
                    <div className="offset-lg-8">
                        <td> Total warehouse value ($):{Math.round(total() * 100) / 100} </td>
                    </div>
                </div>  

            </div>
        </div>
    );
}

export default Home;