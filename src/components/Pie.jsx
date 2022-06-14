import React from "react";
import facebook from "../img/facebook.PNG"
import instagram from "../img/instagram.PNG"
import twitter from "../img/twitter.PNG"

export default function Pie() {
    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <div class="navbar-nav d-flex justify-content-end">
                    <img src={facebook} alt="" className="img"/>
                    <img src={instagram} alt="" className="img mx-3"/>
                    <img src={twitter} alt="" className="img"/>
                </div>
            </div>
        </nav>
    );
}

