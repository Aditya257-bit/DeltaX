import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getCookie, signout } from "../auth/helpers";

const Private = ({history}) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    })

    const { name, email, password, role } = values;

    const token = getCookie('token');

    useEffect(() => {
        userInfo();
    }, [])

    const userInfo = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/user`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            const { name, email, role } = response.data.user;
            setValues({...values, name, email, role});
            toast.success(response.data.message);
        }).catch((error) => {
            if(error.response.status === 401){
                signout(() => {
                    history.push('/')
                })
            }
            toast.error(error.response.data.error);
        })
    }

    const privatePageForm = () => (
        <form>
            <div className="form-group mt-3">
                <label className='text-muted'>Name</label>
                <input 
                    type='text' 
                    className='form-control' 
                    name='name' 
                    value={name}
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
                    placeholder='Enter your password' 
                />
            </div>
            <div className="form-group mt-3">
                <label className='text-muted'>Role</label>
                <input 
                    type='text' 
                    className='form-control' 
                    name='role' 
                    value={role}
                    placeholder='Enter your Role' 
                />
            </div>
        </form>
    )

    return(
        <Layout>
            <div className='mt-3 col-md-6 offset-md-3'>
                <ToastContainer />         
                <h1 className='p-5'>Private</h1>
                {privatePageForm()}
            </div>
        </Layout>
    )
}

export default Private;