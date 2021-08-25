import styled from "styled-components";
import React, { useState } from 'react';
import {
    Link
} from "react-router-dom";
import * as config from '../config'

function LandingPhoto(){
    return(
        <PhotoArea>
            <Div>
                비록, 흑역사일지라도 <br/>
                괜찮아요.
            </Div>
            <Link to='/signup'>
                <Button>흑역사 극복하러가기</Button>
            </Link>

        </PhotoArea>
    )
}

const PhotoArea = styled.div`
    width : 360px;
    height: 629px;
    background: rgba(196, 196, 196, 0.2);
    margin-top : 48px; 
    position : relative
`

const Div = styled.div`    
    
    width: 207px;
    height: 67px;
    
    text-align : left;

    font-size: 20px;
    line-height: 32px;
    
    letter-spacing: -0.03em;
    
    color: #FFFFFF;
    
    position : absolute;
    left: 21px;
    top: 36px;
`

const Button = styled.button`
    background: #FFFFFF;
    position: absolute;
    width: 165px;
    height: 40px;
    left: 98px;
    top: 499px;
    border-radius: 60px;
    font-size: 16px;
    margin : 0 auto;
    display : block;
`

export default LandingPhoto
