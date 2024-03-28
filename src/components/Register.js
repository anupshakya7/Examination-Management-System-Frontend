import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        const userInfo = localStorage.getItem('user-info'); 
        if(userInfo){
            navigate('/');
          }
    });
    
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
        password_confirmation:""
    });

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        });
    }

    const registerHandle = async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch('http://127.0.0.1:8000/api/register',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(formData)
            });
            if(!response.ok){
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if(data.status === 200){
                localStorage.setItem('user-info',JSON.stringify(data.user));
                navigate('/');
            }
        }catch(error){
            console.error("There was an error!!!",error);
        }
        
    }
    return (
        <div className='card p-3 w-50 text-start m-auto shadow'>
            <h2>Register</h2>
            <form onSubmit={registerHandle}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder='Enter Name..' onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder='Enter Email..' onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder='Enter Password..' onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="password_confirmation" placeholder='Enter Confirm Password..' onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary float-end shadow">Register</button>
            </form>
        </div>
    )
}

export default Register
