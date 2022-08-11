import { useState, useEffect } from 'react';
import axios from "axios";
import Header from "./common/header"

function Employees(){
    const [employees, setEmployees] = useState([]);
    const [sortby,setSortBy] = useState()
    const baseURL = "http://localhost:5000/api/";
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(()=>{

        getEmployees()
    },[])

    const deleteEmployee = (event,id) =>{
        axios.get(baseURL+'delete-employee/'+id,config)
        .catch((error)=>{
            console.log(error.response.data)
        }).then(async (res) => {
            let data = res.data
            setEmployees(employees.filter(item => item._id !== data.id));
        });
    }

    const sortBy = (event,field) =>{
        let column,value
        if(sortby && sortby==1){
            value = -1
        }else{
            value = 1
        }

        if(!sortby){
            value = 1
        }
        
        getEmployees({[field]:value})
        setSortBy(value)
        
    }

    const getEmployees = (data) => {
        data = '?'+serialize(data) || ''
        axios.get(baseURL+'employees'+data,config)
        .catch((error)=>{
            console.log(error.response.data)
        }).then(async (res) => {
            let data = res.data
            setEmployees(data)
        });
    }

    const serialize = (obj) => {
        var str = [];
        for (var p in obj)
          if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
        return str.join("&");
      }

    return (
        <div className="container">
            <div class="row">
                <Header/>
                <div className="col-12">
                    <div className='d-flex justify-content-between'>
                    <h3> Employees </h3> <a className="btn btn-sm btn-primary" href={"/create-employee"}> Create </a>
                    </div>
                    <table className="table" style={{height:"60%", width:"60%"}}>
                        <thead>
                            <tr>
                                <th scope="col">Name<i style={{ cursor:'pointer' }} onClick={(event)=>sortBy(event,'name')} class="fa fa-fw fa-sort"></i></th>
                                <th scope="col">Department<i style={{ cursor:'pointer' }} onClick={(event)=>sortBy(event,'department')} class="fa fa-fw fa-sort"></i></th>
                                <th scope="col" onClick={(event)=>sortBy(event,'salary')}>Salary<i style={{ cursor:'pointer' }} onClick={(event)=>
                                    (event,'salary')} class="fa fa-fw fa-sort"></i></th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {employees.map((elem,index)=>{
                                return (<tr key={elem._id}>
                                            <td>{elem.name}</td>
                                            <td>{elem.department}</td>
                                            <td>{elem.salary}</td>
                                            <td className="d-flex">
                                                <a href={'/update-employee/'+elem._id}><i className="fa fa-pencil" aria-hidden="true"></i></a>
                                                <a className="ms-4" onClick={(event)=>deleteEmployee(event,elem._id)} href="javascript:;">
                                                    <i className="fa fa-trash text-danger" aria-hidden="true"></i>
                                                </a>
                                            </td>
                                        </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    )
}

export default Employees;