import React from 'react'
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { getTask } from '../services/allApi';

function ViewTask({id}) {
    const [data, setData]= useState([])
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = async() => {
        setShow(true)
        const header={
            "authorization":`bearer ${sessionStorage.getItem('token')}`,
            "content-type":"application/json"
        }
        const result = await getTask(id,header)
        setData(result.data)
    }
    
  return (
    <div>
        
            <button className="btn btn-outline-primary" onClick={handleShow}><i className='fa fa-eye'></i> view</button>

            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Task Details</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <div className="card" style={{width:"100%"}}>
                  <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <p className="card-text">{data.description}</p>
                    <p className="card-text">{data.status}</p>
                    <div className='button-group'>
                      {/* <ViewTask id={item._id} /> */}
                      <button className="btn btn-outline-success" onClick={()=>{setEdit(true)}}><i className='fa fa-pen'></i> edit</button>
                    <button className="btn btn-outline-danger"><i className='fa fa-trash'></i> delete</button>
                    <button className="btn btn-outline-danger"><i className='fa fa-cancel'></i> cancel</button>
                    </div>
                  </div>
                </div>
                    {
                        edit?
                    <div>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Title"
                        className="mb-3">
                        <Form.Control type="text" placeholder="name@example.com" value={data.title}/>
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingTextarea2" label="description" className='mb-3' >
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            value={data.description}
                        />
                    </FloatingLabel>
                    <div className='d-flex justify-content-around'>
                    <button className="btn btn-outline-success"><i className='fa fa-thumbs-up'></i> update</button>
                    <button className="btn btn-outline-danger" onClick={()=>{setEdit(false)}}><i className='fa fa-cancel'></i> cancel </button>
                    </div>
                    </div>:
                    <></>
                    }
                </Offcanvas.Body>
            </Offcanvas>
    </div>
  )
}

export default ViewTask