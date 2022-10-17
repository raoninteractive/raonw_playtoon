import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Locked from "./Locked";
import Novel from "./Novel";
import Webtoon from "./Webtoon";
import Header from "@COMPONENTS/Header";
import Container from "@/components/author/Container";

const App = () => {
  const params = useParams();
  console.log(params);
  return (
    <>
      <Header className="ty1 mdetail" type="post" />
      <div id="container" className="container sub mpost bg">
        <div className="inr-c">
          <Routes>
            <Route path={"novel/:id"} element={<Novel />} />
            <Route path={"webtoon/:id"} element={<Webtoon />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
