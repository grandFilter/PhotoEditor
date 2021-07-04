import React from "react";
// import Stage from "./Stage";
import StageCanvas from "./StageCanvas";
import Layout from "@/components/Layout";
import "./styles.module.less";

export default function Jumbotron() {
  return (
    <>
      <Layout>
        {/* <Stage /> */}
        <StageCanvas />
      </Layout>
    </>
  );
}
