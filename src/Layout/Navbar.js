import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar() {
  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
        <div className="container-fluid">
          <a className="navbar-brand " >Dell Bets</a>

          <button className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">

            <span className="navbar-toggler-icon"></span>
          </button>


        </div>
      </nav>

    </div>
  )
}
