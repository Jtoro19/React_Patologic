import { useEffect, useState } from 'react';

export default function Table() {
    const [datos, setDatos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editCategory, setEditCategory] = useState({ categoryName: '' });

    useEffect(() => {
        fetch('http://localhost:8000/api/categories')
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    function borrar(id) {
        fetch(`http://localhost:8000/api/categories/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                alert('Categoría eliminada exitosamente');
                setDatos(datos.filter(dato => dato.id !== id));
            })
            .catch((error) => {
                alert('Error al eliminar la categoría');
            });
    }

    function handleModalOpen(category) {
        setEditCategory(category);
        setShowModal(true);
    }

    function handleModalClose() {
        setShowModal(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setEditCategory({ ...editCategory, [name]: value });
    }

    function actualizar(e) {
        e.preventDefault();

        fetch(`http://localhost:8000/api/categories/${editCategory.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editCategory),
        })
            .then(response => response.json())
            .then(data => {
                alert('Categoría actualizada con éxito');
                setDatos(datos.map(dato => (dato.id === editCategory.id ? editCategory : dato)));
                handleModalClose();
            })
            .catch((error) => {
                alert('Error al actualizar la categoría');
            });
    }

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Lista de Categorías</h2>
            <div className="table-responsive">
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>Código de la Categoría</th>
                            <th>Nombre de la Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.map((dato, index) => (
                            <tr key={index}>
                                <td>{dato.id}</td>
                                <td>{dato.categoryName}</td>
                                <td>
                                    <button className="btn btn-danger me-2" onClick={() => borrar(dato.id)}>Borrar</button>
                                    <button className="btn btn-warning" onClick={() => handleModalOpen(dato)}>Actualizar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div className="modal modal-custom" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Actualizar Categoría</h5>
                                <button type="button" className="close" onClick={handleModalClose}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={actualizar}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="categoryName">Nombre de la Categoría</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="categoryName"
                                            name="categoryName"
                                            value={editCategory.categoryName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-custom w-100">Guardar cambios</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

