import React, { useContext } from 'react'
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { deleteTask, getTask } from '../services/allApi';
import { headerContextApi } from '../ContextApi/HeaderContext';
import { toast } from 'react-toastify';
import { refreshContextApi } from '../ContextApi/RefreshContext';
import { loginContextApi } from '../ContextApi/LoginContext';

function ViewTask({ id }) {
  const { header } = useContext(headerContextApi)
  const { setRefresh } = useContext(refreshContextApi)
  const { logStatus } = useContext(loginContextApi)
  const [data, setData] = useState([])
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    if (logStatus) {
      setShow(true)
      const result = await getTask(id, header)
      setData(result.data)
      console.log(result.data);
    } else {
      toast.warning("plz Login...")
    }
  }

  const handleDelete = async () => {
    const result = await deleteTask(id, header)
    if (result.status == 200) {
      setRefresh(result.data)
      toast.success("deleted")
      handleClose()
    } else {
      console.log(result.response.data);
    }
  }

  return (
    <div>

      <button className="btn btn-outline-primary" onClick={handleShow}><i className='fa fa-eye'></i> view</button>

      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Task Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="card" style={{ width: "100%" }}>
            <div className="card-body">
              <h5 className="card-title">{data.title}</h5>
              <p className="card-text m-0">Created by-{data.userId?.username}</p>
              <p className="card-text m-0">User email-{data.userId?.email}</p>
              <p className="card-text m-0">Description- {data.description}</p>
              <p className="card-text m-0 mb">Status-{data.status}</p>
              <div className='button-group my-2'>
                <button className="btn btn-outline-success" onClick={() => { setEdit(true) }}><i className='fa fa-pen'></i> edit</button>
                <button className="btn btn-outline-danger" onClick={handleDelete}><i className='fa fa-trash' ></i> delete</button>
                <button className="btn btn-outline-danger"><i className='fa fa-cancel'></i> cancel</button>
              </div>
            </div>
          </div>
          {
            edit ?
              <div>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Title"
                  className="mb-3">
                  <Form.Control type="text" placeholder="name@example.com" value={data.title} />
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
                  <button className="btn btn-outline-danger" onClick={() => { setEdit(false) }}><i className='fa fa-cancel'></i> cancel </button>
                </div>
              </div> :
              <></>
          }
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default ViewTask