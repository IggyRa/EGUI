import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
    const[id,userchange] = useState("");
    const[pwd,pwdchange] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);

    const navigate=useNavigate();

    const handlelogin=(e) =>{
        e.preventDefault();

        fetch("http://localhost:5000/users/"+ id).then((res) => {
            return res.json();    
            }).then((res)=>{
            if(res.id===id){
                if(res.pwd===pwd){
                    navigate('/home')
                }
                else{
                    //info about wrong password
                    setErrorMessage("Incorrect password.");
                    setShowError(true);
                }
            }
            else{
                //info about wrong id 
                setErrorMessage("Incorrect username.");
                setShowError(true);
            }
   
        })
    }

    return(
        <div>
            <div className="offset-lg-4 col-lg-4" style={{ marginTop: `40px` }}>
                <form className="container" onSubmit={handlelogin}>
                    <div className="card">

                        <div className="card-header">
                            <h1>User Login</h1>
                        </div>

                        <div className="card-body">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>User name<span className="errmsg">*</span></label>
                                        <input required value={id} onChange={e=>userchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Password<span className="errmsg">*</span></label>
                                        <input required value={pwd} onChange={e=>pwdchange(e.target.value)} className="form-control" type="password"></input>
                                    </div>    
                                </div>
                        </div>
                        
                        {showError && (
                            <div className="card-body">
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            </div>
                        )}
                        
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button>
                            <div className="navstyle" style={{marginTop: `20px`}}>
                            <p>Don't have account yet?</p>
                            <NavLink to="/"
                            >Register here</NavLink>
                            </div>    
                        </div>  

                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;