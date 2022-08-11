import { useState, useEffect } from 'react';
import axios from "axios";
import Header from "./common/header"
import { useParams } from 'react-router-dom' 
    
function UpdateEmployee(){
    const { id } = useParams()
    const [form, setForm] = useState({});
    const baseURL = "http://localhost:5000/api/";
    const [formError, setFormError] = useState({});
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    

    useEffect(()=>{
        axios.get(baseURL+'get-employee/'+id,config)
        .catch((error)=>{
            console.log(error.response.data)
        }).then(async (res) => {
            let data = res.data
            let finalData = {id:data._id,name:data.name,department:data.department,salary:data.salary}
            setForm(finalData)
        });
    },[])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setForm(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(baseURL+'update-employee',form,config).catch((error)=>{
            setFormError(error.response.data)
        })
        .then((res) => {
            let data = res.data
            window.location.href = '/employees'
        });
    }

    const logout = () => {
        localStorage.removeItem("token")
        window.location.href = '/'
    }

    return (
        <div className="container">
            <div class="row">
                <Header/>
                <div className="col-12">
                    <div className="card p-4">
                        <form className="form-row" onSubmit={handleSubmit}>
                            <div className="col-6 mb-3">
                                <input type="text" value={form.name} name="name" onChange={handleChange} placeholder="Name" className="form-control"/>
                                {formError.name ? <div className="invalid-feedback d-block"> {formError.name}</div> : ''}
                            </div>

                            <div className="col-6 mb-3">
                                <input value={form.department} type="text" name="department" onChange={handleChange} placeholder="Department" className="form-control"/>
                                {formError.department ? <div className="invalid-feedback d-block"> {formError.department}</div> : ''}
                            </div>

                            <div className="col-6 mb-3">
                                <input value={form.salary} type="text" name="salary" onChange={handleChange} placeholder="Salary" className="form-control"/>
                                {formError.salary ? <div className="invalid-feedback d-block"> {formError.salary}</div> : ''}
                            </div>
                            
                            <div className="col-2">
                                <input type="submit" value="submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateEmployee;