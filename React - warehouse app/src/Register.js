import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";


const Register = () => {
    
    const[id,userchange] = useState("");
    const[pwd,pwdchange] = useState("");
    const[repeatpwd, repwdchange] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);

    const navigate=useNavigate();

    const handlesubmit=(e) =>{
        e.preventDefault();
        let regobj = {id,pwd};  
  
        if (pwd === repeatpwd) {
            fetch("http://localhost:5000/users",{
                method:"POST",
                headers:{'content-type':'application/json'},
                body:JSON.stringify(regobj)
            }).then((res)=>{
                navigate('/login')
            })
        } else {
            // Display an error message or handle the password mismatch
            setErrorMessage("Repeat password does not match.");
            setShowError(true);
        }
    }

    return(
        <div>
            <div className="offset-lg-4 col-lg-4" style={{ marginTop: `40px` }}>
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">

                        <div className="card-header">
                            <h1>User Registration</h1>
                        </div>

                        <div className="card-body">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>User name<span className="errmsg">*</span></label>
                                        <input className="form-control" required value={id} onChange={e=>userchange(e.target.value)} ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Password<span className="errmsg">*</span></label>
                                        <input className="form-control" type="password" required value={pwd} onChange={e=>pwdchange(e.target.value)}></input>
                                    </div>    
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Repeat Password<span className="errmsg">*</span></label>
                                        <input className="form-control" type="password" required value={repeatpwd} onChange={e=>repwdchange(e.target.value)}></input>
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
                            <button type="submit" className="btn btn-primary">Register</button> 
                            <div className="navstyle" style={{marginTop: `20px`}}>
                            <p>Already have an account?</p>
                            <NavLink to="/login"
                            >Log In</NavLink>
                            </div>   
                        </div>  

                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;