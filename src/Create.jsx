import { useState } from 'react';

export default function Create() {
    const [categoryName, setCategoryName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const newCategoryName = e.target.categoryName.value;

        fetch('http://localhost:8000/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categoryName: newCategoryName }),
        })
            .then(response => response.json())
            .then(data => {
                alert('Categoría creada exitosamente');
                setCategoryName('');
                e.target.reset();
            })
            .catch((error) => {
                alert('Error al crear la categoría: ' + error);
            });
    }

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Crear Categoría</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="categoryName" className="form-label">Nombre de la Categoría</label>
                            <input
                                type="text"
                                className="form-control"
                                id="categoryName"
                                name="categoryName"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Crea Categoría</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

