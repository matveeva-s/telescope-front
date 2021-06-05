import React from "react";
import '../styles/logoTitle.css';

export const LogoTitleBig = (
    <div className="title-big">
        <div className="title-text-big">Chronos</div>
        <div className="logo-big"/>
    </div>
);

export const LogoTitleHeader = (
    <div className="title-header" onClick={() =>  window.location.href = '/' }>
        <div className="title-text-header">Chronos</div>
        <div className="logo-header"/>
    </div>
);
