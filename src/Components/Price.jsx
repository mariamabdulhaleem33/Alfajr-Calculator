import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import EditForm from './EditForm';

const Price = () => {
    const [data, setData] = useState(() => {
        const storedData = localStorage.getItem('priceData');
        return storedData ? JSON.parse(storedData) : {
            color: [
                { category: "أقل من 10 ورقات وجه", price: "" },
                { category: "أقل من 10 ورقات وجهين", price: "" },
                { category: "من 10 الى 100 ورقة وجه", price: "" },
                { category: "من 10 الى 100 ورقة وجهين", price: "" },
                { category: "أكثر من 100 ورقة", price: "" },
            ],
            blackWhite: [
                { category: "أقل من 10 ورقات وجه", price: "" },
                { category: "أقل من 10 ورقات وجهين", price: "" },
                { category: "من 10 الى 100 ورقة وجه", price: "" },
                { category: "من 10 الى 100 ورقة وجهين", price: "" },
                { category: "أكثر من 100 ورقة", price: "" },
            ],
        };
    });

    const [editRow, setEditRow] = useState(null);

    useEffect(() => {
        localStorage.setItem('priceData', JSON.stringify(data));
    }, [data]);

    const handleEditClick = (row, tableTitle) => {
        setEditRow({ ...row, tableTitle });
    };

    const handleSave = (category, newPrice) => {
        setData(prevData => {
            const updatedData = { ...prevData };
            const key = editRow.tableTitle === "ألوان" ? 'color' : 'blackWhite';
            updatedData[key] = updatedData[key].map(row =>
                row.category === category ? { ...row, price: `${newPrice / 100} جنيه` } : row
            );
            return updatedData;
        });
        setEditRow(null);
    };

    const handleCancel = () => {
        setEditRow(null);
    };

    return (
        <div className={`main ${editRow ? 'blurred' : ''}`}>
            <NavBar Ref={"price"} />
            <div className="price content show">
                <h3 className="cont-header">أسعار الطباعة</h3>
                <div className="price-cont">
                    {Object.entries(data).map(([key, rows]) => (
                        <div key={key} className="tbl">
                            <caption className="cont-header">{key === 'color' ? "ألوان" : "أبيض وأسود"}</caption>
                            <table className="table">
                                <thead className="thead">
                                    <tr>
                                        <th scope="col">الفئة</th>
                                        <th scope="col">السعر</th>
                                        <th scope="col">تعديل</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row) => (
                                        <tr key={row.category}>
                                            <td>{row.category}</td>
                                            <td className="cost">{row.price}</td>
                                            <td>
                                                <button onClick={() => handleEditClick(row, key === 'color' ? "ألوان" : "أبيض وأسود")}>تعديل</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
                {editRow && (
                    <div className="edit-form-overlay">
                        <EditForm 
                            row={editRow} 
                            tableTitle={editRow.tableTitle} 
                            onSave={handleSave} 
                            onCancel={handleCancel} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Price;
