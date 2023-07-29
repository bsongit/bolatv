import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeList from "./paginas/HomeList";
import TelaLive from "./paginas/TelaLive";


function App() {
    return (
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<HomeList></HomeList>} />
                <Route path="/live" element={<TelaLive></TelaLive>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
