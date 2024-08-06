import React, { useState } from 'react';


const EditForm = ({ row, tableTitle, onSave, onCancel }) => {
    const [price, setPrice] = useState(row.price);
    const [error, setError] = useState(""); 

    const handleSaveClick = () => {
        if (price.trim() === "" || isNaN(price) || price < 0) {
            setError("ادخل السعر بالقروش"); 
            return;
        }
        setError(""); 
        onSave(row.category, price);
    };

    return (
        <div className="edit-form-overlay">
            <div className="edit-form">
                <h4>تعديل السعر - {tableTitle}</h4>
                <label>
                    <label> الفئة: {row.category}</label>

                        <label>السعر:</label>
                        <input 
                            type="number" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                            className={error ? 'input-error' : ''}
                        />
                    {error && <div className="error-message">{error}</div>} 
                </label>
                <button onClick={handleSaveClick}>حفظ</button>
                <button onClick={onCancel}>إلغاء</button>
            </div>
        </div>
    );
};

export default EditForm;
