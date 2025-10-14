import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'
import config from './config.js'

const LibraryManager = () => {
  const [items, setItems] = useState([])
  const [item, setItem] = useState({
    id: '',
    title: '',
    author: '',
    category: '',
    isbn: '',
    price: '',
    publisher: ''
  })
  const [idToFetch, setIdToFetch] = useState('')
  const [fetchedItem, setFetchedItem] = useState(null)
  const [message, setMessage] = useState('')
  const [editMode, setEditMode] = useState(false)

  const baseUrl = `${config.url}/libraryapi`

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`)
      setItems(res.data)
    } catch (error) {
      setMessage(`Failed to fetch items. ${error.response?.data || error.message}`)
    }
  }

  const handleChange = e => { setItem({ ...item, [e.target.name]: e.target.value }) }

  const validateForm = () => {
    for (let key in item) {
      if (!item[key] || item[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`)
        return false
      }
    }
    return true
  }

  const addItem = async () => {
    if (!validateForm()) return
    try {
      const payload = { ...item, id: parseInt(item.id), price: parseFloat(item.price) }
      await axios.post(`${baseUrl}/add`, payload)
      setMessage('Item added successfully.')
      fetchAll()
      resetForm()
    } catch (error) {
      setMessage(`Error adding item. ${error.response?.data || error.message}`)
    }
  }

  const updateItem = async () => {
    if (!validateForm()) return
    try {
      const payload = { ...item, id: parseInt(item.id), price: parseFloat(item.price) }
      await axios.put(`${baseUrl}/update`, payload)
      setMessage('Item updated successfully.')
      fetchAll()
      resetForm()
    } catch (error) {
      setMessage(`Error updating item. ${error.response?.data || error.message}`)
    }
  }

  const deleteItem = async id => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`)
      setMessage(res.data)
      fetchAll()
    } catch (error) {
      setMessage(`Error deleting item. ${error.response?.data || error.message}`)
    }
  }

  const getById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`)
      setFetchedItem(res.data)
      setMessage('')
    } catch (error) {
      setFetchedItem(null)
      setMessage('Item not found.')
    }
  }

  const handleEdit = it => { setItem(it); setEditMode(true); setMessage(`Editing item with ID ${it.id}`) }

  const resetForm = () => {
    setItem({ id: '', title: '', author: '', category: '', isbn: '', price: '', publisher: '' })
    setEditMode(false)
  }

  return (
    <div className="library-container">
      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Library Management</h2>

      <div>
        <h3>{editMode ? 'Edit Item' : 'Add Item'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="ID" value={item.id} onChange={handleChange} />
          <input type="text" name="title" placeholder="Title" value={item.title} onChange={handleChange} />
          <input type="text" name="author" placeholder="Author" value={item.author} onChange={handleChange} />
          <input type="text" name="category" placeholder="Category" value={item.category} onChange={handleChange} />
          <input type="text" name="isbn" placeholder="ISBN" value={item.isbn} onChange={handleChange} />
          <input type="number" step="0.01" name="price" placeholder="Price" value={item.price} onChange={handleChange} />
          <input type="text" name="publisher" placeholder="Publisher" value={item.publisher} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-primary" onClick={addItem}>Add Item</button>
          ) : (
            <>
              <button className="btn-accent" onClick={updateItem}>Update Item</button>
              <button className="btn-muted" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Item By ID</h3>
        <input type="number" value={idToFetch} onChange={e => setIdToFetch(e.target.value)} placeholder="Enter ID" />
        <button className="btn-primary" onClick={getById}>Fetch</button>
        {fetchedItem && (
          <div>
            <h4>Item Found:</h4>
            <pre>{JSON.stringify(fetchedItem, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Items</h3>
        {items.length === 0 ? (<p>No items found.</p>) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(item).map(key => (<th key={key}>{key}</th>))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(it => (
                  <tr key={it.id}>
                    {Object.keys(item).map(key => (<td key={key}>{it[key]}</td>))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-accent" onClick={() => handleEdit(it)}>Edit</button>
                        <button className="btn-danger" onClick={() => deleteItem(it.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default LibraryManager
