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

  // field keys are unchanged (core). Only labels/text are updated for Blood Donation domain
  const fields = ['id','title','author','category','isbn','price','publisher']
  const fieldLabels = {
    id: 'Donor ID',
    title: 'Donor Name',
    author: 'Blood Group',
    category: 'Location',
    isbn: 'Contact No',
    price: 'Units',
    publisher: 'Hospital/Center'
  }

  const baseUrl = `${config.url}/libraryapi`

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`)
      setItems(res.data)
    } catch (error) {
      setMessage(`Failed to fetch donors. ${error.response?.data || error.message}`)
    }
  }

  const handleChange = e => { setItem({ ...item, [e.target.name]: e.target.value }) }

  const validateForm = () => {
    for (let key in item) {
      if (!item[key] || item[key].toString().trim() === '') {
        setMessage(`Please fill out the ${fieldLabels[key] || key} field.`)
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
      setMessage('Donor added successfully.')
      fetchAll()
      resetForm()
    } catch (error) {
      setMessage(`Error adding donor. ${error.response?.data || error.message}`)
    }
  }

  const updateItem = async () => {
    if (!validateForm()) return
    try {
      const payload = { ...item, id: parseInt(item.id), price: parseFloat(item.price) }
      await axios.put(`${baseUrl}/update`, payload)
      setMessage('Donor updated successfully.')
      fetchAll()
      resetForm()
    } catch (error) {
      setMessage(`Error updating donor. ${error.response?.data || error.message}`)
    }
  }

  const deleteItem = async id => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`)
      setMessage(res.data)
      fetchAll()
    } catch (error) {
      setMessage(`Error deleting donor. ${error.response?.data || error.message}`)
    }
  }

  const getById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`)
      setFetchedItem(res.data)
      setMessage('')
    } catch (error) {
      setFetchedItem(null)
      setMessage('Donor not found.')
    }
  }

  const handleEdit = it => { setItem(it); setEditMode(true); setMessage(`Editing donor with ID ${it.id}`) }

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

      <h2>Blood Donation Portal</h2>

      <div>
        <h3>{editMode ? 'Edit Donor' : 'Add Donor'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder={fieldLabels.id} value={item.id} onChange={handleChange} />
          <input type="text" name="title" placeholder={fieldLabels.title} value={item.title} onChange={handleChange} />
          <input type="text" name="author" placeholder={`${fieldLabels.author} (e.g., O+)`} value={item.author} onChange={handleChange} />
          <input type="text" name="category" placeholder={fieldLabels.category} value={item.category} onChange={handleChange} />
          <input type="text" name="isbn" placeholder={fieldLabels.isbn} value={item.isbn} onChange={handleChange} />
          <input type="number" step="0.01" name="price" placeholder={`${fieldLabels.price}`} value={item.price} onChange={handleChange} />
          <input type="text" name="publisher" placeholder={fieldLabels.publisher} value={item.publisher} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-primary" onClick={addItem}>Add Donor</button>
          ) : (
            <>
              <button className="btn-accent" onClick={updateItem}>Update Donor</button>
              <button className="btn-muted" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Donor By ID</h3>
        <input type="number" value={idToFetch} onChange={e => setIdToFetch(e.target.value)} placeholder="Enter Donor ID" />
        <button className="btn-primary" onClick={getById}>Fetch</button>
        {fetchedItem && (
          <div>
            <h4>Donor Found:</h4>
            <pre>{JSON.stringify(fetchedItem, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Donors</h3>
        {items.length === 0 ? (<p>No donors found.</p>) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {fields.map(key => (<th key={key}>{fieldLabels[key]}</th>))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(it => (
                  <tr key={it.id}>
                    {fields.map(key => (<td key={key}>{it[key]}</td>))}
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
