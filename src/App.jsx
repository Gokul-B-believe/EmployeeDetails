import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import Post from './PPost';
import Popup from 'reactjs-popup';
import Content from './content';
import EditModal from './EditModal';

function App() {
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setLoad(true)
        setUsers(response.data);
        setLoad(false)
      });
  }, []);



  const deleteuser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      });
  }

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setIsEditModalOpen(false);
    setEditingUser(null);
    showNotification('User updated successfully!', 'success');
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  return (
    <>
      <div>
        <div className='header'>
          <h2>Employee Details</h2>
          <Popup trigger={<button className='btn-add'>Add User</button>} model nested>
            {
              close => (<div className='username'>
                < Post users={users} setUsers={setUsers} />
                <div className='name'>
                  <button className='btn-back' onClick={() => close()}>Back</button>
                </div>
              </div>)
            }</Popup>
        </div >
        {load ? <div><Content /></div> :
          < div className='con' >
            <table border={1} cellPadding={5} cellSpacing={5} >
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Editing</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{(
                users.map((user) =>
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <button className='btn-blue' onClick={() => handleEdit(user)}>Edit</button>
                    </td>
                    <td>
                      <button
                        className='btn-red' onClick={() => deleteuser(user.id)}>Delete</button>
                    </td>
                  </tr>
                )
              )}
              </tbody>
            </table >
          </div >}

        {/* Edit Modal */}
        <EditModal
          user={editingUser}
          isOpen={isEditModalOpen}
          onClose={handleCloseEdit}
          onSave={handleSaveEdit}
        />

        {/* Notification */}
        {notification.show && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
      </div >
    </>
  )
}

export default App;
