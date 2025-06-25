import { useState } from "react";
import {login} from '../features/auth/AuthSlice'
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'

export default function Login(){
    const [form,setForm] = useState({username:'',password:''})
    const dispatch  = useDispatch()
    const navigate = useNavigate();

    const handlesubmit = async(e)=>{
        e.preventdefault();
        const result = await dispatch(login(form));
        if (result.meta.requestStatus==='fulfilled'){
            navigate('/');
        }
    }
    return (
        <form onSubmit={handlesubmit}>
            <input type="text" value={form.username} onChange={(e)=>setForm({...form,username:e.target.value})} />
            <input type="text" value={form.password} onChange={(e)=>setForm({...form,username:e.target.value})} />
            <button>login</button>
        </form>
    )
}