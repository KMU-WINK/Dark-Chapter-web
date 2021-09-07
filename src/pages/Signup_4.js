import React, {useState} from 'react'
import styled from "styled-components";
import * as config from '../config'
import {useHistory} from 'react-router-dom';

import SignupText from "../component/signup/SignupText";
import NicknameInput from "../component/signup/NicknameInput";
import GoBackBtn from "../component/button/GoBackBtn";
import ActiveBtn from "../component/button/ActiveBtn";
import InactiveBtn from "../component/button/InactiveBtn";


function Signup_4(){

    const [nickname,setNickname] = useState('');

    const [isActive, setIsActive] = useState(false);

    const [message, setMessage] = useState("")
    const history = useHistory();
    const check = () => {
        if (nickname === 'aaa') {
            history.push('/home');
        }
        else{
            setMessage("블가능한 별명입니다.")
        }
    }

    return(
        <Container color={config.BACKGROUND_COLOR}>
            <GoBackBtn previousPage="/signup/password"/>
            <SignupText title = "별명설정" description = "사용하실 별명을 입력해주세요."/>
            <NicknameInput
                setIsActive={setIsActive}
                setNickname={setNickname}
                message = {message}
            />
            <BtnWrap>
                {isActive
                    ?
                        <ActiveBtn
                            text = "끝내기"
                            check = {check}
                        />

                    :
                        <InactiveBtn text = "끝내기"/>

                }
            </BtnWrap>

        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background : ${props => props.color};
    position : relative;
`
const BtnWrap = styled.div`
    margin-top : 140px;
`


export default Signup_4
