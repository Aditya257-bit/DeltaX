import React, { useState } from "react";
import Layout from "../core/Layout";
import axios from 'axios';
import { authenticate, isAuth } from '../auth/helpers';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { Link, Redirect } from "react-router-dom";

const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Sign In'
    })

    const { email, password, buttonText } = values;

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/signin`,
            data: { email, password }
        }).then((resp) => {
            authenticate(resp, () => {
                setValues({...values, email: '', password: '', buttonText: 'Submitted'});
                toast.success(resp.data.message);
            })
        }).catch((error) => {
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error)
        })

    }

    const signinForm = () => {
        return(
            <form>
                <div className='form-group mt-3'>
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
                <div className='form-group mt-3'>
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
                <div className="mt-3">
                    <Link className="nav-link" to="/auth/forgot/password">
                       Forgot password?
                    </Link>
                </div>
                <div className='mt-3'>
                    <button className='btn btn-primary' onClick={handleSubmit}>{buttonText}</button>
                </div>
            </form>
        )
    }

    return(
        <Layout>
            <div className='mt-6 col-md-6 offset-md-3'>
                <ToastContainer />
                {isAuth() ? <Redirect to={isAuth().role === 'admin' ? '/admin' : '/private'} /> : null}
                <h1 className='p-5'>Signin</h1>
                {signinForm()}
            </div>
        </Layout>
    )
}

export default Signin;