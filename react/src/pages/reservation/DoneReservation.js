import { useNavigate } from "react-router-dom";
import './DoneReservation.css';

const DoneReservation = () => {

    const navigate = useNavigate();

    const goToMyPage = () => {
        navigate("/reservation-tickets");
    };
    
    const goToMainPage = () => {
        navigate("/");
    };

    return (
        <div className="done-reservation">
            <h1>예약이 완료되었습니다</h1>
            <div className="buttons">
            <button onClick={goToMyPage}>예약 내역 확인하기</button>
            <button onClick={goToMainPage}>메인 페이지로 이동</button>
            </div>
        </div>
    );
}

export default DoneReservation;