import axios from 'axios'
import React, { useState } from 'react'
import './card.css'

function Post({ users, setUsers }) {
    const [data, setData] = useState({
        name: '',
        username: '',
        email: '',
        phone: ''
    });
    const detail = (e) => {
        e.preventDefault();
        axios
            .post('https://jsonplaceholder.typicode.com/users', data)
            .then((response) => {
                setUsers([...users, { ...response.data, id: users.length + 1 }]);
                setData({ name: "", username: "", email: "", phone: "" });
            });
    };
    return (
        <>
            <center>
                <div className='card'>
                    <h3>Add Users</h3>
                    <form onSubmit={detail}>
                        <div className='val'>
                            <label><b>Enter the Name:</b></label><br />
                            <input type='text' name='name' value={data.name} placeholder='Name../' onChange={(e) => setData({ ...data, name: e.target.value })} />
                            <br />
                            <label><b>UserName:</b></label>
                            <input type='text' name='username' value={data.username} placeholder='UserName../' onChange={(e) => setData({ ...data, username: e.target.value })} />
                            <br />
                            <label><b>Email:</b></label>
                            <input type='email' name='email' value={data.email} placeholder='Email../' onChange={(e) => setData({ ...data, email: e.target.value })} />
                            <br />
                            <label><b>Phone:</b></label>
                            <input type='number' name='phone' value={data.phone} placeholder='Phone../' onChange={(e) => setData({ ...data, phone: e.target.value })} />
                        </div>
                        <br />
                        <div>
                            <button type='submit' className='btn-sub'>Submit</button>
                        </div >
                    </form >
                </div >
            </center >
        </>
    )
}

export default Post