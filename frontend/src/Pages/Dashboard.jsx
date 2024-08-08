import React from 'react'
import './Dashboard.css'
import Add from '../Components/Add'
import ViewTask from '../Components/ViewTask'

function Dashboard() {
  return (
    <>
      <div className='container-main mt-5'>
        <div className='row-container'>
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <div className='add-button'>

          <Add/>
          </div>
        </div>
        <div className='row mt-5'>
          <div className="card">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <div className='button-group'>

                <ViewTask/>
                </div>
                
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard