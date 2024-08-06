import React, { useState } from "react";
import NavBar from "./NavBar";

const Calculator = () => {
    const [price, setPrice] = useState(0);
    const [copies, setCopies] = useState(1);
    const [pagesPerCopy, setPagesPerCopy] = useState(1);
    const [slides, setSlides] = useState(1);
    const [faces, setFaces] = useState(1);

    const calculatePrice = () => {
        if (copies === "" || pagesPerCopy === "" || slides === "" || faces === "") {
            validation(copies, pagesPerCopy, slides, faces);
            setPrice(0);
            return;
        }

        validation(copies, pagesPerCopy, slides, faces);

        const allPages = parseInt(copies) * parseInt(pagesPerCopy);
        const divisor = parseInt(slides) * parseInt(faces);
        const printedPages = allPages / divisor;

        const storedData = JSON.parse(localStorage.getItem('priceData'));
        const priceData = storedData || {
            color: [
                { category: "أقل من 10 ورقات وجه", price: "0 قرش" },
                { category: "أقل من 10 ورقات وجهين", price: "0 قرش" },
                { category: "من 10 الى 100 ورقة وجه", price: "0 قرش" },
                { category: "من 10 الى 100 ورقة وجهين", price: "0 قرش" },
                { category: "أكثر من 100 ورقة", price: "0 قرش" },
            ],
            blackWhite: [
                { category: "أقل من 10 ورقات وجه", price: "0 قرش" },
                { category: "أقل من 10 ورقات وجهين", price: "0 قرش" },
                { category: "من 10 الى 100 ورقة وجه", price: "0 قرش" },
                { category: "من 10 الى 100 ورقة وجهين", price: "0 قرش" },
                { category: "أكثر من 100 ورقة", price: "0 قرش" },
            ],
        };

        let pagePrice = 0;
        const checked = document.querySelector('input[name="check"]:checked');
        if (checked) {
            const printType = checked.classList.contains("alwan") ? 'color' : 'blackWhite';
            pagePrice = getPriceForCategory(printedPages, faces, priceData[printType]);
        }

        setPrice(pagePrice * printedPages);
    };

    const getPriceForCategory = (numPages, numFaces, priceArray) => {
        let categoryPrice = "0 قرش";

        if (numPages < 10) {
            if (numFaces === 2) {
                categoryPrice = priceArray.find(cat => cat.category.includes("أقل من 10 ورقات وجهين"))?.price || "0 قرش";
            } else {
                categoryPrice = priceArray.find(cat => cat.category.includes("أقل من 10 ورقات وجه"))?.price || "0 قرش";
            }
        } else if (numPages <= 100) {
            if (numFaces === 2) {
                categoryPrice = priceArray.find(cat => cat.category.includes("من 10 الى 100 ورقة وجهين"))?.price || "0 قرش";
            } else {
                categoryPrice = priceArray.find(cat => cat.category.includes("من 10 الى 100 ورقة وجه"))?.price || "0 قرش";
            }
        } else {
            categoryPrice = priceArray.find(cat => cat.category.includes("أكثر من 100 ورقة"))?.price || "0 قرش";
        }

        return parseFloat(categoryPrice.replace(' قرش', '')) || 0;
    };

    const validation = (x, y, z, s) => {
        document.getElementById("copies").style.borderColor = x === "" ? "red" : "#194fa3";
        document.getElementById("pages").style.borderColor = y === "" ? "red" : "#194fa3";
        document.getElementById("slides").style.borderColor = z === "" ? "red" : "#194fa3";
        document.getElementById("faces").style.borderColor = s === "" ? "red" : "#194fa3";
    };

    return (
        <div className="main">
            <NavBar Ref={"calculator"} />
            <div className="calculator content show">
                <h3 className="cont-header">حاسبة أسعار الطباعة</h3>
                <h5>مكتبة الفجر</h5>
                <div className="calc-cont">
                <div className="cont-top">
                        <div className="field">
                            <label>عدد النسخ</label>
                            <input
                                type="number"
                                min="1"
                                value={copies}
                                onChange={(e) => setCopies(e.target.value)}
                                placeholder=" أدخل رقم "
                                id="copies"
                            />
                        </div>
                        <div className="field">
                            <label>عدد صفحات النسخة</label>
                            <input
                                type="number"
                                min="1"
                                onChange={(e) => setPagesPerCopy(e.target.value)}
                                placeholder=" أدخل رقم "
                                id="pages"
                            />
                        </div>
                        <div className="field">
                            <label>عدد الشرائح</label>
                            <input
                                type="number"
                                min="1"
                                value={slides}
                                onChange={(e) => setSlides(e.target.value)}
                                placeholder=" أدخل رقم "
                                id="slides"
                            />
                        </div>
                    </div>
                    <div className="cont-center">
                        <div className="field">
                            <label>عدد الأوجه</label>
                            <input
                                type="number"
                                min="1"
                                max="2"
                                value={faces}
                                onChange={(e) => setFaces(e.target.value)}
                                placeholder=" أدخل رقم "
                                id="faces"
                            />
                        </div>
                        <div className="field center">
                            <label>نوع الطباعة</label>
                            <div className="check">
                                <div className="rad">
                                    <input type="radio" className="checkbox alwan" id="alwan" name="check" defaultChecked />
                                    <span>ألوان</span>
                                </div>
                                <div className="rad">
                                    <input type="radio" className="checkbox BW" name="check" />
                                    <span>أبيض وأسود </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cont-bottom">
                        <button onClick={calculatePrice}>احسب</button>
                        <h1 id="price"> {price} <span>ج.م</span></h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
