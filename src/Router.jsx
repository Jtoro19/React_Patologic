import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Create from './Create';
import Table from './Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/style.css';

function AppRouter() {
    return (
        <div className="page-container">
            <div className="content-wrap">
                <Router>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar">
                        <div className="container-fluid">
                            <div className="navbar-brand">
                                <a href="/">
                                    <img src="/images/logo.png" alt="Logo" className="navbar-logo" />
                                </a>
                            </div>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/create">Crear</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/table">Listado</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <Routes>
                        <Route path='/' element={<Create />} />
                        <Route path='/create' element={<Create />} />
                        <Route path='/table' element={<Table />} />
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default AppRouter;


