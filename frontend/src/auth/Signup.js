import React, { useState } from "react";
import Layout from "../core/Layout";
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Redirect } from "react-router-dom";
import { isAuth } from "./helpers";

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        buttonText: 'Sign Up'
    })

    const { name, email, password, buttonText } = values;

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/signup`,
            data: { name, email, password }
        }).then((resp) => {
            setValues({...values, name: '', email: '', password: '', buttonText: 'Submitted'});
            toast.success(resp.data.message);
        }).catch((error) => {
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    }

    const signupForm = () => (
        <form>
            <div className="form-group mt-3">
                <label className='text-muted'>Name</label>
                <input 
                    type='text' 
                    className='form-control' 
                    name='name' 
                    value={name}
                    onChange={handleChange} 
                    placeholder='Enter your name' 
                />
            </div>
            <div className="form-group mt-3">
                <label className='text-muted'>Email</label>
                <input 
                    type='email' 
                    className='form-control' 
                    name='email' 
                    value={email}
                    onChange={handleChange} 
                    placeholder='Enter your email' 
                />
            </div>
            <div className="form-group mt-3">
                <label className='text-muted'>Password</label>
                <input 
                    type='password' 
                    className='form-control' 
                    name='password' 
                    value={password}
                    onChange={handleChange} 
                    placeholder='Enter your password' 
                />
            </div>
            <div className='mt-3'>
                <button className='btn btn-primary' onClick={handleSubmit}>{buttonText}</button>
            </div>
        </form>
    )

    return(
        <Layout>
            <div className='mt-6 col-md-6 offset-md-3'>
                <ToastContainer />      
                {isAuth() ? <Redirect to='/' /> : null}     
                <h1 className='p-5'>Signup</h1>
                {signupForm()}
            </div>
        </Layout>
    )
}

export default Signup;