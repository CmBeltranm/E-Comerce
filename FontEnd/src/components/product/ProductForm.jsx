import React, { useState, useEffect } from 'react';
import "./ProductForm.css";
import AWS from 'aws-sdk';

const ProductForm = () => {
  const [codeEAN, setCodeEAN] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [unitsAvailable, setUnitsAvailable] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  let img = "";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    const url = 'http://localhost:8080/api/v1/categories?pageNumber=0&pageSize=10';

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la respuesta de la API');
        }
      })
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Error al obtener las categorías:', error);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validateFields();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    uploadImageToS3();
  };

  const uploadImageToS3 = async () => {
    const file = imageFile;
    if (!file) {
      return;
    }
    const s3 = new AWS.S3({
      accessKeyId: 'AKIA5HNRBTCSCFBDPVV2',
      secretAccessKey: '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',
      region: 'TU_REGION'
    });

    const params = {
      Bucket: 'e-comerce-img',
      Key: file.name,
      Body: file,
    };

    try {
      const response = await s3.upload(params).promise();
      const imageUrl = response.Location;
      setImageUrl(imageUrl);
      img = imageUrl;
      createProduct();
    } catch (error) {
      console.error('Error al cargar la imagen en Amazon S3:', error);
    }
  };

  const createProduct = () => {
    const data = {
      codeEAN: codeEAN,
      name: name,
      price: price,
      description: description,
      brand: brand,
      unitsAvailable: unitsAvailable,
      imageUrl: img,
      categories: { id: categoryId }
    };

    const url = 'http://localhost:8080/api/v1/products/save';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la respuesta de la API');
        }
      })
      .then(data => {
        console.log(data);
        resetForm();
        setSuccessMessage('El producto se ha guardado correctamente.');
        setShowModal(true);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
      });
  };

  const validateFields = () => {
    const errors = {};

    if (!codeEAN) {
      errors.codeEAN = 'Code EAN is required.';
    }

    if (!name) {
      errors.name = 'Name is required.';
    }

    if (!price) {
      errors.price = 'Price is required.';
    } else if (isNaN(price) || price <= 0) {
      errors.price = 'Price must be a positive number.';
    }

    if (!description) {
      errors.description = 'Description is required.';
    }

    if (!brand) {
      errors.brand = 'Brand is required.';
    }

    if (!unitsAvailable) {
      errors.unitsAvailable = 'Units Available is required.';
    } else if (isNaN(unitsAvailable) || unitsAvailable <= 0) {
      errors.unitsAvailable = 'Units Available must be a positive number.';
    }

    if (!imageFile) {
      errors.imageFile = 'Image is required.';
    }

    if (!categoryId) {
      errors.categoryId = 'Category is required.';
    }

    return errors;
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const resetForm = () => {
    setCodeEAN('');
    setName('');
    setPrice('');
    setDescription('');
    setBrand('');
    setUnitsAvailable('');
    setImageFile(null);
    setImageUrl('');
    setCategoryId('');
    setErrors({});
  };

  const closeModal = () => {
    setShowModal(false);
    setSuccessMessage('');
  };

  return (
    <>
      <div className='containere text-center titleFormProduct'>
        <h1 className='text-center'>Create Product</h1>
      </div>
      <div className="containere contenedorFormulario">
        <form onSubmit={handleSubmit} className='fromCreateProduct'>
          <div className="mb-3">
            <label htmlFor="codeEAN" className="form-label">Code EAN:</label>
            <input type="text" className="form-control" id="codeEAN" value={codeEAN} onChange={e => setCodeEAN(e.target.value)} />
            {errors.codeEAN && <p className="text-danger">{errors.codeEAN}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)} />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price:</label>
            <input type="number" className="form-control" id="price" value={price} onChange={e => setPrice(e.target.value)} />
            {errors.price && <p className="text-danger">{errors.price}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea className="form-control" id="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            {errors.description && <p className="text-danger">{errors.description}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="brand" className="form-label">Brand:</label>
            <input type="text" className="form-control" id="brand" value={brand} onChange={e => setBrand(e.target.value)} />
            {errors.brand && <p className="text-danger">{errors.brand}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="unitsAvailable" className="form-label">Units Available:</label>
            <input type="number" className="form-control" id="unitsAvailable" value={unitsAvailable} onChange={e => setUnitsAvailable(e.target.value)} />
            {errors.unitsAvailable && <p className="text-danger">{errors.unitsAvailable}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image:</label>
            <input type="file" className="form-control" id="image" onChange={handleImageChange} accept="image/*" />
            {errors.imageFile && <p className="text-danger">{errors.imageFile}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category:</label>
            <select className="form-select" id="category" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.nombre}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="text-danger">{errors.categoryId}</p>}
          </div>
          <div className='d-flex justify-content-center'>
            <button type="submit" className="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Success</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>{successMessage}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductForm;