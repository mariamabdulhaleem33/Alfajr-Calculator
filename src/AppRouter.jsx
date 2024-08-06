
import { Component } from "react";
import {Route,Routes} from "react-router-dom";
import Calculator from "./Components/Calculator.jsx";
import Price from "./Components/Price.jsx";

class AppRouter extends Component {
    render() {
        return (
            <>
                <Routes>
                    <Route path="/" element={<Calculator />} />
                    <Route path="/price" element={<Price />} />
                </Routes>
            </>
        );
    }
}

export default AppRouter;