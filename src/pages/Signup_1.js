import styled from "styled-components";
import React, { useState } from 'react';
import * as config from '../config'

import EmailInput from "../component/input/EmailInput";
import SignupText from "../component/input/SignupText";
import GoBackBtn from "../component/button/GoBackBtn";
import ActiveBtn from "../component/button/ActiveBtn";
import InactiveBtn from "../component/button/InactiveBtn";

function Signup_1(){

    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

    const [isActive, setIsActive] = useState(false);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("")

    const checkValidate = () => {
        if (!regExp.test(email)){
            setMessage("올바른 이메일 형식이 아닙니다.");
            console.log("1")
        }
        else if (email !==  "BlackYeoksa@gmail.com"){
            setMessage("가입 불가능한 이메일 입니다.")
            console.log("2")
        }
    }

    return(
        <Container color={config.BACKGROUND_COLOR}>

            <GoBackBtn/>
            <SignupText title = "회원가입" description = "사용하실 이메일을 입력해주세요."/>
            <EmailInput
                setIsActive={setIsActive}
                setEmail = {setEmail}
                message = {message}
            />
            <BtnWrap>
                {isActive
                    ?
                    <ActiveBtn
                        text = "Next"
                        check = {checkValidate}
                    />

                    :
                    <InactiveBtn text = "Next"/>

                }
            </BtnWrap>
        </Container>
    )
}

const Container = styled.div`
    width: 360px;
    height: 760px;
    background : ${props => props.color};
    position : relative;
`

const BtnWrap = styled.div`
    margin-top : 140px;
`

export default Signup_1
