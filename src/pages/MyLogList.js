import React, {useEffect, useState} from 'react';
import styled from "styled-components";

import MyLogFloor from "../component/MyLog/MyLogFloor";
import MyLogHeader from "../component/MyLog/MyLogHeader";
import MyLogBottomFloor from "../component/MyLog/MyLogBottomFloor";
import scale from "../svg/black_scale_group.svg"
import white_hr from "../svg/white_scale_group.svg"

import * as board_service from "../axios/board-service";

function MyLogList() {
    const [headerColor, setHeaderColor] = useState("#000000")
    const [data,setData] = useState([])

    const [firstFloor, setFirstFloor] = useState([])
    const [secondFloor, setSecondFloor] = useState([])
    const [thirdFloor, setThirdFloor] = useState([])

    const [firstNum, setFirstNum] = useState(0)
    const [secondNum, setSecondNum] = useState(0)
    const [thirdNum, setThirdNum] = useState(0)

    // 임의로 정한 흑역사 층별 데이터 개수

    const total = firstNum + secondNum + thirdNum;
    const firstPct = firstNum / total * 100 - 10;
    const secondPct = secondNum / total * 100 - 30;
    const thirdPct = thirdNum / total * 100;

    let checkFirst = 0;
    // 눈금 영역 height
    let height = 1320;
    if (firstFloor > 3) {
        height += 130 * (firstFloor)
        checkFirst = firstFloor * 2
    } else checkFirst = 7
    if (secondFloor > 3) height += 130 * (secondFloor)
    if (thirdFloor > 3) height += 130 * (thirdFloor)


    const hrRendering = () => {
        const result = [];
        for (let i = 0; i < 1001; i++) {
            if (checkFirst >= 0) {
                result.push(<Scale/>)
                checkFirst -= 1
            } else {
                result.push(<WhiteScale/>)
            }
        }
        return result
    }

    const useScroll = () => {
        const [state, setState] = useState({
            x: 0,
            y: 0
        });
        const onScroll = () => {
            setState({x: window.scrollX, y: window.scrollY});
        };
        useEffect(() => {
            window.addEventListener("scroll", onScroll); // scorll할 때 onScroll 이벤트 핸들러 지정
            return () => window.removeEventListener("scroll", onScroll); // clean up
        }, []);
        return state;
    }
    const {y} = useScroll();

    useEffect(() => {
        if (firstFloor <= 3 && y >= 470) setHeaderColor("#FFFFFF")
        else if (firstFloor <= 3 && y < 470) setHeaderColor("#000000")
        else if (firstFloor > 3 && y >= firstFloor * 130 + 80) setHeaderColor("#FFFFFF")
        else if(firstFloor > 3 && y < firstFloor * 130 + 80) setHeaderColor("#000000")
    }, [y])

    const divideFloor = (data) => {

        if(data.depth < 100){
            setFirstNum(firstNum+1)
            setFirstFloor(firstFloor => [...firstFloor, data])
        }
        else if (data.depth < 500 && data.depth >= 100){
            setSecondNum(secondNum+1)
            setSecondFloor(secondFloor => [...secondFloor, data])
        }
        else{
            setThirdNum(thirdNum+1)
            setThirdFloor(thirdFloor => [...thirdFloor, data])
        }

    }

    useEffect( () => {
        const getBoard = async () =>{

            const result = await board_service.getBoard(sessionStorage.getItem("email"))

            result.map(board_result => divideFloor(board_result))

            // setData(result)
        }
        getBoard()

        // data.map((data) => divideFloor(data))
        // console.log(firstFloor)
    },[])

    return (
        <Div
            first={firstPct}
            second={secondPct}
            third={thirdPct}
        >
            {/*{firstFloor.map((first,index) => <p id={first.index}>{first.depth}</p>)}*/}
            {/*{secondFloor.map((second,index) => <p id={second.index}>{second.depth}</p>)}*/}
            {/*{thirdFloor.map((third,index) => <p id={third.index}>{third.depth}</p>)}*/}
            <div style={{width: '100%', height: 56}}></div>
            <MyLogHeader
                color={headerColor}
            />
            <div>
                <div style={{position: "relative"}}>
                    <ScaleWrap height={height}>
                        {hrRendering()}
                    </ScaleWrap>
                    <MyLogFloor
                        color={"black"}
                        bodyTextColor={"#747474"}
                        backgroundTop={"#D2DADF"} backgroundBottom={"#97A2B2"}
                        floor={"상층"}
                        num={firstNum}
                        data={firstFloor}
                    />
                    <MyLogFloor
                        color={"white"}
                        bodyTextColor={"#DCDCDC"}
                        backgroundTop={"#97A2B2"}
                        backgroundBottom={"#2C2C38"}
                        floor={"중충"}
                        num={secondNum}
                        data={secondFloor}
                    />
                    <MyLogFloor
                        num={thirdNum}
                        color={"white"}
                        bodyTextColor={"#DCDCDC"}
                        backgroundTop={"#2C2C38"}
                        backgroundBottom={"#2C2C38"}
                        floor={"심충"}
                        data={thirdFloor}
                    />

                    <MyLogBottomFloor
                        color={"white"}
                        background={"#2C2C38"}
                        floor={"바닥층"}/>
                </div>
            </div>

        </Div>
    )
}

const Div = styled.div`
    width : 100%;
    height: 100vh;
    background : #D2DADF;
    z-index:-1
`

const Scale = styled.img.attrs({
    src: scale
})`
    display:block;
    margin-top:10px;
`

const WhiteScale = styled.img.attrs({
    src: white_hr
})`
    display:block;
    margin-top:10px;
`
const ScaleWrap = styled.div`
    height : 100%-161px;
    position: absolute;
    top: 104px;
    overflow:hidden;
    
`


export default MyLogList
