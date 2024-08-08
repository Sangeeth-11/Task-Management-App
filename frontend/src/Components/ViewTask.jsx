import React from 'react'
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function ViewTask() {
    
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div>
        
            <button className="btn btn-outline-primary" onClick={handleShow}><i className='fa fa-eye'></i> view</button>

            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Task Details</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        edit?
                    <div>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Title"
                        className="mb-3">
                        <Form.Control type="text" placeholder="name@example.com" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingTextarea2" label="description" className='mb-3'>
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                    <div className='d-flex justify-content-around'>
                    <button className="btn btn-outline-success"><i className='fa fa-add'></i> edit</button>
                    <button className="btn btn-outline-danger"><i className='fa fa-cancel'></i> cancel</button>
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