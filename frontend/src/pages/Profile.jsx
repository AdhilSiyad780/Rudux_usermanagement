import { useEffect, useState } from "react"
import api from '../features/auth/authAPI';


export default function Profile(){
    const [data,setData] = useState({})
    const [file,setFile] = useState(null)
    const getProfile = async ()=>{
        const res = await api.get('profile/');
        setData(res.data)
    }
    const updateProfile = async (e)=>{
        e.preventDefault();
        const FormData = new FormData();
        FormData.append('profile_image',file);
        await api.put('profile/',FormData);
        getProfile();
    }
    useEffect(()=>{
        getProfile();
    },[])
    return (
        <div>
            <h2>{data.username}</h2>
            {data.profile_image && <img src={`http://127.0.0.1:8000${data.profile_image}`} width="100" /> }
            <form onSubmit={updateProfile} >
            <input type="file" onChange={(e)=>setFile(e.target.value[0])} />
            <button  type="submit" >Upload</button>
            </form>
        </div>
    )
}