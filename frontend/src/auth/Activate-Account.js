import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const Signin = ({match}) => {

    const [values, setValues] = useState({
        name: '',
        token: ''
    })

    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token);
        if(token){
            setValues({...values, name, token})
        }
    }, []);

    const { name, token } = values;


    const handleSubmit= (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/account-activate`,
            data: { token }
        }).then((resp) => {
            toast.success(resp.data.message);
        }).catch((error) => {
            toast.error(error.response.data.error)
        })
    }

    const activateAccount = () => {
        return(
            <div>
                <h1 className='p-5 text-center'>Hey {name}, click on below button to activate your account</h1>
                <button className='btn btn-outline-primary' onClick={handleSubmit}>Activate-Account</button>
            </div>
        )
    }


    return(
        <Layout>
            <div className='mt-3 col-md-6 offset-md-3'>
                <ToastContainer />
                {activateAccount()}
            </div>
        </Layout>
    )
}

export default Signin;