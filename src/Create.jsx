import { useState } from 'react'

export default function Create() {

    const [categoryName, setCategoryName] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        
        // Obtén los valores del formulario usando los setters
        const newCategoryName = e.target.categoryName.value

        fetch('http://localhost:8000/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ categoryName: newCategoryName})
        })
            .then(response => response.json())
            .then(data => {
                alert('Categoría creada exitosamente')
                setCategoryName('')
                e.target.reset() 
            })
            .catch((error) => {
                alert('Error al crear la categoría' + error)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="categoryName">Nombre de la Categoría</label>
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
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
        </div>
    )
}
