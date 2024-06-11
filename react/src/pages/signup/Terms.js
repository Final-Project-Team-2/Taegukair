import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './Terms.css';

Modal.setAppElement('#root'); // 애플리케이션의 루트 요소를 설정합니다.

function Terms() {
    const [acceptedTerms, setAcceptedTerms] = useState({
        required1: false,
        required2: false,
        optional1: false,
        optional2: false
    });
    const [selectAll, setSelectAll] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleAccept = () => {
        if (acceptedTerms.required1 && acceptedTerms.required2) {
            navigate('/signup/verify');
        } else {
            alert('필수 약관에 모두 동의해야 다음 단계로 진행할 수 있습니다.');
        }
    };

    const handleCheckboxChange = (type) => {
        setAcceptedTerms(prevState => ({
            ...prevState,
            [type]: !prevState[type]
        }));
    };

    const handleSelectAllChange = () => {
        const newState = !selectAll;
        setSelectAll(newState);
        setAcceptedTerms({
            required1: newState,
            required2: newState,
            optional1: newState,
            optional2: newState
        });
    };

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
    };

    return (
        <div>
            <h1>회원가입</h1>
            <h2>약관 동의</h2>
            <div className='termbox'> 
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                    />
                    전체선택
                </label>
            </div>
            <br />

            <div>
                <h3 onClick={() => openModal('required1')} style={{ cursor: 'pointer', display: 'inline' }}>
                    [필수] 이용 약관
                </h3>
                <label style={{ marginLeft: '10px' }}>
                    <input
                        type="checkbox"
                        checked={acceptedTerms.required1}
                        onChange={() => handleCheckboxChange('required1')}
                    />
                    이용 약관에 동의합니다
                </label>
                <button onClick={() => openModal('required1')} className="view-more-button">전체보기</button>
                <div>
                    <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        
                    </p>
                </div>
            </div>

            <div>
                <h3 onClick={() => openModal('required2')} style={{ cursor: 'pointer', display: 'inline' }}>
                    [필수] 개인 정보 수집 및 동의
                </h3>
                <br/>
                <label style={{ marginLeft: '10px' }}>
                    <input
                        type="checkbox"
                        checked={acceptedTerms.required2}
                        onChange={() => handleCheckboxChange('required2')}
                    />
                    개인 정보 수집 및 동의에 동의합니다
                </label>
                <button onClick={() => openModal('required2')} className="view-more-button">전체보기</button>
                <div>
                    <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        
                    </p>
                </div>
            </div>

            <div>
                <h3 onClick={() => openModal('optional1')} style={{ cursor: 'pointer', display: 'inline' }}>
                    [선택] 개인정보 제3자 제공 동의
                </h3>
                <label style={{ marginLeft: '10px' }}>
                    <input
                        type="checkbox"
                        checked={acceptedTerms.optional1}
                        onChange={() => handleCheckboxChange('optional1')}
                    />
                    개인정보 제3자 제공 동의에 동의합니다
                </label>
                <button onClick={() => openModal('optional1')} className="view-more-button">전체보기</button>
                <div>
                    <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        
                    </p>
                </div>
            </div>
            
            <br />

            <div>
                <h3 onClick={() => openModal('optional2')} style={{ cursor: 'pointer', display: 'inline' }}>
                    [선택] 마케팅 광고 활용 및 수신 동의
                </h3>
                <label style={{ marginLeft: '10px' }}>
                    <input
                        type="checkbox"
                        checked={acceptedTerms.optional2}
                        onChange={() => handleCheckboxChange('optional2')}
                    /> 
                    마케팅 광고 활용 및 수신 동의에 동의합니다
                </label>
                <button onClick={() => openModal('optional2')} className="view-more-button">전체보기</button>
                <div>
                    <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    </p>
                </div>
            </div>
            <button onClick={handleAccept} className='nextbutton'>다음</button>
        </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="약관 내용"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2>{modalContent.includes('required') ? '필수 약관 내용' : '선택 약관 내용'} {modalContent.endsWith('1') ? '1' : '2'}</h2>
                <div className="modal-text">
                    {modalContent === 'required1' ? (
                        <p>
                        <h2>제 1 장 총칙</h2> <br></br>
                        <h3 className='modalcolor'>제1조 (목적) </h3>
                        이 약관은 ㈜태극항공(이하 "태극항공"이라 합니다)이 운영하는 태극항공 온라인 플랫폼에서 제공하는 온라인 서비스(이하 "서비스"라 합니다)를 이용함에 있어 태극항공 이용자의 권리· 및 의무 및 책임사항을 규정함을 목적으로 합니다.
                        
                        <h3 className='modalcolor'>제2조 (용어의 정의)</h3>
                        “태극항공 온라인 플랫폼”이란 태극항공이 정보 또는 서비스를 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비와 정보통신망을 이용하여 정보 및 서비스를 이용자에게 제공하고 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장(PC/모바일웹, 모바일 어플리케이션)을 말합니다.
                        “이용자”란 태극항공 온라인 플랫폼에 접속하여 이 약관에 따라 태극항공이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
                        "SKYPASS(스카이패스) 회원"이란 태극항공의 탑승 및 제휴사를 이용할 때마다 보너스 마일리지를 적립하고 적립된 마일리지를 사용하고자 스카이패스 회원 약관에 동의하고 회원이 된 자를 말합니다.
                        “회원”이라 함은 스카이패스 회원 중 태극항공 온라인 플랫폼에 개인정보를 제공하여 회원등록을 한 자로서, 태극항공 정보를 지속적으로 제공받으며, 태극항공 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
                        "비회원"이라 함은 회원으로 가입하지 않고 태극항공이 제공하는 정보 및 서비스를 이용하는 자를 말합니다.
                        "입점 제휴사"라 함은 태극항공과 제휴되어 온라인플랫폼에 입점 및 연결된 사이트의 제휴사를 말합니다.
                        "개인정보" 라 함은 당해 정보에 포함되어 있는 성명, 전자우편 등의 사항에 의하여 특정 개인을 식별할 수 있는 정보 (당해 정보만으로는 특정 개인을 인식할 수 없더라도 다른 정보 용이하게 결합하여 식별할 수 있는 것을 포함한다)을 말합니다.
                        <h3 className='modalcolor'>제3조 (약관의 명시와 개정)</h3>
                        태극항공은 이 약관의 내용과 상호, 연락처(전자우편주소, 전화번호, 팩스번호 등), 통신판매업신고번호 등을 이용자가 알 수 있도록 초기 서비스화면(전면)에 게시합니다.
                        태극항공은 약관의규제에관한법률, 전자거래기본법, 전자서명법, 정보통신망이용촉진및정보보호등에관한법률, 소비자기본법, 전자상거래등에서의소비자보호에관한법률 등 관련법령을 위반하지 않는 범위에서 이 약관을 개정할 수 있습니다.
                        약관을 개정할 경우에는 개정사유 및 적용일자를 명시하여 현행약관과 함께 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.
                        개정약관은 개정된 내용이 관계 법령에 위배되지 않는 한 개정 이전에 회원으로 가입한 이용자에게도 적용됩니다. 다만 개정약관의 적용을 거절하는 뜻을 약관의 공시기간 내에 태극항공에 명시적으로 통지한 이용자에 대해서는 개정전의 약관조항이 적용됩니다.
                        이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래등에서의소비자보호에관한법률, 약관의규제에관한법률, 공정거래위원회가 정하는 전자상거래등에서의소비자보호지침, 관계법령 또는 상관례에 따릅니다.
                        <h3 className='modalcolor'>제4조 (서비스의 제공)</h3>
                        태극항공이 온라인 플랫폼을 통하여 제공하는 서비스는 아래와 같습니다.
                        
                        항공권 예약 및 구매에 관련된 정보, 서비스 제공
                        스카이패스 관련 서비스
                        에어텔, 호텔, 렌터카 등 여행 관련 정보, 서비스 제공
                        기타 태극항공이 정하는 업무
                        <h3 className='modalcolor'>제5조 (서비스의 중단)</h3>
                        태극항공은 컴퓨터 등 정보통신설비의 점검· 및 보수· 및 교체· 및 고장· 및 통신두절 등의 경우에는 온라인 플랫폼 상의 서비스 제공을 일시적으로 중단할 수 있습니다.
                        제1항에 의한 서비스 중단의 경우 태극항공은 제8조에 정한 방법으로 이용자에게 통지합니다.
                        태극항공은 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 이용자 또는 제 3자가 입은 손해를 배상하지 아니합니다. 단, 태극항공에 고의 또는 중대한 과실이 있는 경우에는 그러하지 아니합니다.
                        태극항공은 이용자가 다음 각 호의 1에 해당하는 행위 또는 행위를 할 우려가 있는 경우 사전통지 없이 서비스 이용을 중단할 수 있습니다.
                        공공질서 또는 미풍양속에 반하는 행위
                        범죄와 관련되었다고 추정되는 일체의 행위
                        공공의 이익을 저해할 목적으로 서비스 이용을 계획 또는 실행하는 행위
                        서비스의 제공을 방해하는 등 서비스의 건전한 이용을 저해하는 행위
                        제4항에 의한 서비스 중단의 경우 태극항공은 이용자 또는 제3자가 입은 손해를 배상하지 아니합니다.
                        <h3 className='modalcolor'>제6조 (회원가입)</h3>
                        이용자는 정해진 가입양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 하는 방법으로 회원가입을 신청합니다. 단, 14세 미만의 미성년자의 경우에는 법정 대리인의 동의를 받아 본 약관에 동의하고 가입신청을 할 수 있습니다.
                        회원이 되고자 하는 자는 반드시 실명으로 회원가입을 하여야 하며, 태극항공이 요청하는 개인정보를 제공해야 합니다.
                        태극항공은 이용자가 다음 각호에 해당하지 않는 한 회원으로 등록합니다.
                        가입신청자가 이 약관 제7조제4항에 의하여 회원자격을 상실한 경우. 다만 회원자격 상실 후 3년이 경과한 자로서 태극항공의 회원 재가입 승낙을 얻은 경우는 예외로 합니다.
                        등록 내용에 허위, 기재누락, 오기가 있는 경우
                        기타 회원으로 등록하는 것이 기술적으로 현저히 지장이 있다고 판단되는 경우
                        회원가입계약의 성립시기는 태극항공의 승낙이 회원에게 도달한 시점으로 합니다.
                        회원은 등록사항에 변경이 있는 경우, 즉시 전자우편 기타 이에 준하는 방법으로 그 변경사항을 수정, 등록함으로써 최신의 정보를 유지해야 합니다.
                        <h3 className='modalcolor'>제7조 (회원탈퇴 및 자격상실 등)</h3>
                        회원은 언제든지 탈퇴신청을 할 수 있으며, 이 경우 태극항공은 즉시 회원탈퇴를 처리합니다.
                        회원이 다음 각 호의 사유에 해당하는 경우 태극항공은 서비스 이용을 제한 또는 해지시킬 수 있습니다.
                        회원 사망 시
                        가입 신청 시 허위 내용을 기재하거나 2개 이상의 I.D.로 이중 등록한 경우
                        태극항공 온라인 플랫폼에서 구매한 항공권 등의 대금지급채무 및 기타 사이트 이용과 관련하여 회원이 부담하는 채무를 불이행하는 경우
                        타인의 태극항공 온라인 플랫폼 이용을 방해하거나 타인의 개인정보를 도용하는 등 전자거래질서를 침해· 및 위협하는 경우
                        태극항공 온라인 플랫폼을 이용하여 이 약관이 금지하는 행위 또는 법령, 공서양속 등에 반하는 행위를 하는 경우
                        회원가입 후, 연속하여 1년 동안 태극항공 온라인 플랫폼을 이용하기 위해 로그인한 기록이 없는 경우
                        태극항공이 서비스 이용을 제한· 및 정지하고자 할 때에는 미리 그 사유, 일시, 기간을 전자우편, 전화, 서면 등으로 이용자에게 통지합니다. 다만 긴급을 요할 경우에는 조치 후에 통지할 수 있습니다.
                        태극항공이 서비스이용을 제한· 및 정지시킨 후 그 제재사유가 된 행위가 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 태극항공은 회원자격을 상실시킬 수 있습니다.
                        태극항공이 회원자격을 상실시키는 경우에는 회원등록을 말소하며, 이 경우 말소 전에 회원에게 이를 통지합니다. 단, 상기 2항의 6에 의하여 이용자의 회원자격을 상실시킬 경우에는 자격 상실 30일 전까지 동 내용에 대한 안내문을 제 8조에 의거 통지하며, 자격이 상실된 회원의 개인정보는 인터넷 개인정보취급방침 사항에 따라 파기합니다.
                        서비스이용의 제한, 정지, 회원자격의 상실로 인한 손해에 대해서 태극항공은 책임을 지지 않습니다.
                        <h3 className='modalcolor'>제8조 (회원에 대한 통지)</h3>
                        태극항공이 회원에 대한 통지를 하는 경우 회원이 제출한 전자우편주소로 할 수 있습니다.
                        태극항공은 불특정다수의 회원에게 통지하는 경우, 홈페이지에 7일이상 공시함으로써 개별통지에 갈음 할 수 있습니다. 다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다.
                        제2항의 사유로 통지하는 경우, 부득이한 사정에 의해 사전 공시기간이 감축되거나 생략될 수 있습니다.
                        <h3 className='modalcolor'>제9조 (구매신청)</h3>
                        이용자는 태극항공이 정한 아래 방법에 의하여 항공권 등의 구매신청을 할 수 있습니다.
                        
                        성명, 성별, 연락처 등 입력
                        개인 정보 수집 및 규정, 법적 고지문, 약관 등에 동의한다는 표시(예: 마우스 클릭)
                        결제수단 선택
                        <h3 className='modalcolor'>제10조 (구매계약의 성립)</h3>
                        태극항공은 제9조에 정한 방법에 의한 구매신청에 대하여 다음 각 호에 해당하는 경우 승낙하지 않을 수 있습니다.
                        신청 내용에 허위, 기재누락, 오기가 있는 경우
                        구매신청에 대한 승낙이 영업상 또는 기술상 현저히 지장이 있다고 판단되는 경우
                        태극항공의 승낙이 제12조제1항의 수신확인통지형태로 이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다.
                        <h3 className='modalcolor'>제11조 (결제방법)</h3>
                        태극항공 온라인 플랫폼에서 구매한 재화· 및 용역에 대한 대금지급방법은 다음 각 호의 하나로 할 수 있습니다.
                        
                        온라인 계좌이체
                        신용카드 결제
                        SKYPASS 마일리지에 의한 항공권 구입
                        기타 태극항공이 정한 결제방식
                        <h3 className='modalcolor'>제12조 (수신확인통지· 및 구매신청 변경 및 취소)</h3>
                        태극항공은 이용자의 구매신청이 있는 경우 이용자에게 수신확인통지를 합니다.
                        수신확인통지를 받은 이용자는 의사표시의 불일치 등이 있는 경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수 있고, 태극항공은 그 요청에 따라 처리하여야 합니다.
                        제 3 장 책임과 의무
                        <h3 className='modalcolor'>제13조 (개인정보보호)</h3>
                        태극항공은 이용자로부터 정보를 수집할 경우 서비스의 제공 및 계약이행에 필요한 최소한의 정보만을 수집합니다.
                        이용자의 개인정보 보호에 대한 상세한 내용은 태극항공 온라인 플랫폼(www.koreanair.com)상의 개인정보취급방침에서 규정한 바에 따릅니다.
                        <h3 className='modalcolor'>제14조 (태극항공의 의무)</h3>
                        태극항공은 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고 안정적인 서비스 제공 및 재화· 및 용역의 공급에 노력합니다.
                        태극항공은 이용자가 안전하게 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함)보호를 위한 보안 시스템을 갖추겠습니다.
                        태극항공이 상품이나 용역에 관하여 「표시· 및 광고의공정화에관한법률」 제3조 소정의 부당한 표시· 및 광고행위를 함으로써 이용자가 손해를 입은 때에는 이를 배상할 책임을 집니다.
                        태극항공은 이용자가 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다.
                        <h3 className='modalcolor'>제15조 (회원의 I.D. 및 비밀번호에 대한 의무)</h3>
                        개인정보취급방침에 명시된 이용을 제외한 I.D.와 비밀번호에 대한 관리책임은 회원에게 있습니다.
                        태극항공 온라인 플랫폼 서비스를 이용하고자 하는 회원은 태극항공이 정하는 바에 따라 회원 ID 및 비밀번호를 태극항공 온라인 플랫폼에 등록해야 합니다.
                        회원은 제3자에게 자신의 I.D. 및 비밀번호를 이용하게 해서는 안됩니다.
                        회원이 자신의 I.D. 및 비밀번호를 도용 당하거나 제3자가 사용하고 있음을 인지한 경우에는 즉시 태극항공에 통보하여 그 안내에 따라야 합니다.
                        <h3 className='modalcolor'>제16조 (이용자의 의무)</h3>
                        이용자는 이 약관 및 관계법령을 준수하여야 하며, 다음의 행위를 해서는 안됩니다.
                        
                        신청 또는 변경 시 허위내용의 기재
                        태극항공 온라인 플랫폼에 게시된 정보의 임의변경
                        태극항공이 허용하고 있지 않은 정보나 컴퓨터 프로그램 등을 무단으로 송신 또는 게시하는 행위
                        태극항공 기타 제3자의 저작권 등 지적재산권 침해
                        태극항공 기타 제3자의 명예, 프라이버시를 침해하거나 업무를 방해하는 행위
                        외설적 또는 폭력적 메시지· 및 화상· 및 음성 기타 공서양속에 반하는 정보를 송신, 공개 또는 게시하는 행위
                        <h3 className='modalcolor'>제17조 (태극항공 온라인 플랫폼과 연결 사이트 간의 관계)</h3>
                        태극항공 온라인 플랫폼과 연결 사이트가 하이퍼링크 (하이퍼링크의 대상에는 문자, 그림 및 동화상 등이 포함) 방식으로 연결 된 경우, 태극항공은 연결 사이트가 독자적으로 제공하는 재화· 및 용역에 의하여 이용자와 행하는 거래에 대해서 보증책임을 지지 않습니다.
                        
                        <h3 className='modalcolor'>제18조 (저작권의 귀속 및 이용제한)</h3>
                        태극항공이 작성한 저작물에 대한 저작권 기타 지적재산권은 태극항공에 귀속합니다.
                        이용자는 태극항공 온라인 플랫폼을 이용함으로써 얻은 정보를 태극항공의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자로 하여금 이용하게 해서는 안됩니다.
                        <h3 className='modalcolor'>제19조 (분쟁해결)</h3>
                        태극항공은 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치· 및 운영합니다.
                        태극항공은 이용자가 제기하는 불만사항 및 의견을 신속· 및 적정하게 처리합니다. 다만 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 지체 없이 통보해 드립니다.
                        태극항공과 이용자간에 전자거래에 관한 분쟁 발생시 전자거래기본법 및 동법 시행령에 근거 하여 설치된 전자거래분쟁조정위원회의 조정에 따를 수 있습니다.
                        <h3 className='modalcolor'>제20조 (관할법원 및 준거법)</h3>
                        태극항공과 이용자간에 발생한 전자거래 분쟁에 관한 소는 서울중앙지방법원에 제기합니다.
                        태극항공과 이용자간에 제기된 전자거래 소송에는 대한민국 법을 적용합니다.
                        <h2>부칙</h2>
                        <h3 className='modalcolor'>제1조 (약관의 효력)</h3>
                        이 약관은 2001년 3월 13일부터 시행하며, 이 약관이 개정되기 전에 가입한 회원에게도 적용됩니다.
                        
                        <h3 className='modalcolor'>제2조 (약관의 개정)</h3>
                        태극항공은 대한민국의 "약관의 규제에 관한 법률", "전자거래기본법", "전자서명법", "정보통신망 이용촉진 및 정보보호 등에 관한 법률", "소비자기본법", "전자상거래 등에서의 소비자보호에 관한 법률", "개인정보보호법" 등 관련법규를 준수합니다. 따라서 태극항공의 회원 약관은 대한민국 관련법규개정 및 정부지침의 변경으로 인하여 그 내용이 변경될 수 있습니다. 회원 약관 개정 시에는 개정일자, 개정이유, 개정내용 등을 온라인 플랫폼에 공시하겠습니다. <br />
                        
                        이용약관 버전 번호 : v1.5 <br />
                        이용약관 시행 일자 : 2001-3-13 <br />
                        이용약관 개정 일자 :
                        2001-03-13 버전 번호 v1.0 시행 <br />
                        2008-10-08 (v1.1)
                        변경사항 : 소비자보호법 개정에 따른 ‘소비자기본법’으로의 명칭 변경, 회원탈퇴 및 자격상실의 조건에 회원 사망 시 추가 <br />
                        추가사항 : 인터넷 회원 약관의 개정에 관한 사항 추가 <br />
                        2011-09-27 추가사항 : 서비스 중단 사유 추가 (v1.2) <br />
                        2011-11-01 추가사항 : 회원탈퇴 및 자격상실 조건 추가 (v1.3) <br />
                        2012-08-20 변경사항 : '정보통신망 이용촉진 및 정보보호 등에 관한 법률' 개정에 따라 회원탈퇴 및 자격 상실의 조건, 통지 방법 변경 (v1.4) <br />
                        2020-10-12 (v1.5) <br />
                        변경사항 : 약관 명칭을 ‘인터넷 회원 약관’에서 ‘이용약관’으로 변경, 기존 ‘웹사이트’의 ‘온라인 플랫폼’으로의 용어 변경 <br />
                        추가사항 : '용어의 정의'에 일부 용어 추가, 회원가입의 조건에 만 14세 미만의 경우 및 실명 가입 추가 <br /></p>
                    ) : modalContent === 'required2' ? (
                        <p><h1>약관 상세</h1>
                        <h2>회원의 개인정보 수집 및 이용에 대한 동의 사항</h2>
                        <h3 className='modalcolor'>1. 수집하는 개인정보의 항목</h3>
                        - 회원가입 <br />
                        - 필수항목 <br />
                        - 아이디(ID), 비밀번호, 성명(한글 및 영어), 연계정보(CI), 생년월일, 성별, 연락처 (전화번호, 휴대전화번호, 이메일 주소) <br />
                        
                        <h3 className='modalcolor'>선택항목</h3>
                        우편물 수령지(자택/직장), 직장정보(직장명, 부서명, 직위) <br />
                        
                        <h3 className='modalcolor'>만 14세 미만의 회원가입</h3>
                        보호자의 성명, 가입자와의 관계, 연락처(전화번호, 휴대전화번호, 이메일 주소), 스카이패스번호(선택) <br />
                        
                        <h3 className='modalcolor'>기타 홈페이지 이용</h3>
                        <span className='boldtext'>국내선 예약</span> <br />
                        탑승자 성명, 생년월일, 성별, 연락처, 이메일 주소, 국적, 마일리지 적립 항공사 및 회원번호(선택), 할인 선택 시 해당 인적사항(선택) <br />
                        
                        <h3 className='modalcolor'>국제선 예약</h3>
                        탑승자 성명, 생년월일, 성별, 연락처, 이메일 주소, 마일리지 적립 항공사 및 회원번호(선택), 할인 선택 시 해당 인적사항(선택) <br />
                        
                        <h3 className='modalcolor'>카드결제</h3>
                        카드번호, 유효기간, 승인번호 등 <br />
                        
                        <h3 className='modalcolor'>환불(한국)</h3>
                        계좌번호, 은행명, 승인번호  <br />
                        
                        <h3 className='modalcolor'>스카이패스 가족회원 등록</h3>
                        가족 회원 정보, 가족관계증빙서류 사본 <br />
                        
                        <h3 className='modalcolor'>고객지원센터를 통한 질의(비회원) </h3>
                        성명, 연락처(전화번호, 휴대전화번호, 이메일 주소), 스카이패스 번호(선택) <br />
                        
                        <h3 className='modalcolor'>체크인 편의를 위한 정보 저장 서비스 이용(선택)</h3>
                        여권정보(국적, 발급국가, 여권번호), 영주권 번호(영주권 구분, 영주권 번호, 국적, 발급국가), KTN(Known Traveler Number)(선택) <br />
                        
                        <h3 className='modalcolor'>결제 편의를 위한 정보 저장 서비스 이용(선택)</h3>
                        신용카드 정보(발급국가, 신용카드 번호, 카드 명의자 성/이름), 신용카드 청구지 정보(주소, 도시, 주, 우편번호) <br />
                        
                        <h3 className='modalcolor'>자동으로 생성되는 개인정보</h3>
                        서비스 이용과정이나 정보처리 과정에서 아래와 같은 정보들이 생성되어 수집될 수 있습니다. <br />
                        
                        서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보, 결제기록 등
                        
                        <h2 className='textunderline'>2. 개인정보의 수집· 및 이용목적 </h2>
                        서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
                        콘텐츠 제공, 항공권 예약 및 발권, 항공권 등 각종 물품배송 또는 청구서 발송, 금융거래 본인 인증 및 금융 서비스, 구매 및 요금결제, 요금추심
                        
                        <h3 className='modalcolor'>회원관리</h3>
                        회원제 서비스 이용에 따른 본인확인, 개인식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 가입 및 가입횟수 제한, 만 14세 미만 아동 개인 정보 수집 시 법정 대리인 동의여부 확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달 <br />
                        
                        <h2 className='textunderline'>3. 개인정보의 보유 목적 및 이용 기간</h2>
                        이용자의 동의 하에 수집된 개인정보는 이용자가 대한항공 인터넷 웹사이트상의 서비스를 이용하는 동안 보유· 및 이용됩니다.<br />
                        
                        <span className='boldtext smalltext modalcolor'>당사는 아래와 같이 개인정보의 수집 및 이용 목적이 달성된 때 수집된 개인정보를 지체 없이 파기하겠습니다.</span> <br />
                        
                        <h3 className='modalcolor'> ① 회원가입 정보의 경우</h3>
                        회원 탈퇴 요청이 있거나 회원 자격을 상실한 때 <br />
                        
                        <h3 className='modalcolor'> ② 설문조사, 이벤트 등 일시적 목적을 위하여 회원가입 시 수집하지 않았던 개인정보를 추가로 수집한 경우 </h3>
                        당해 설문조사, 이벤트 등이 종료한 때  <br />
                        
                        <h3 className='modalcolor'> ③ 사업을 폐지하는 경우</h3>
                        <h3 className='modalcolor'> ④ 기타 관련 법률에 의해 정해진 경우</h3>
                        <span className='smalltext'>다만, 개인정보의 수집 및 이용 목적이 달성된 경우에도 상법, 전자상거래 등에서의 소비자 보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요성이 있는 경우 및 사전에 보유기간을 이용자에게 고지하거나 명시한 경우 등은 그에 따라 개인정보를 보관할 수 있습니다.</span> <br />
                        
                        <h3>가. 계약 또는 청약철회 등에 관한 기록, 대금 결제 및 재화 등의 공급에 관한 기록</h3>
                        &nbsp;&nbsp;&nbsp;① 보존 사유
                        전자상거래 등에서의 소비자 보호에 관한 법률 <br />
                        
                        &nbsp;&nbsp;&nbsp;② 보존 기간 <br />
                        <span className='modalcolor textbold'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5년</span> <br />
                        
                        <h3>나. 소비자의 불만 또는 분쟁 처리 기록</h3>
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>① 보존 사유 </span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;전자상거래 등에서의 소비자 보호에 관한 법률 <br />
                        
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>② 보존 기간</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className='modalcolor'>3년</span><br />
                        
                        <h3>다. 본인확인에 관한 기록</h3>
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>① 보존 사유</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>정보통신망 이용촉진 및 정보보호 등에 관한 법률</span><br />
                        
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>② 보존 기간</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className='modalcolor'>6개월</span>
                        
                        <h3>라. 홈페이지 방문에 관한 기록</h3>
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>① 보존 사유</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>통신비밀보호법</span><br />
                        
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>② 보존 기간</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className='modalcolor'>3개월</span> <br />
                        
                        <h3>4. 개인정보의 수집 및 이용에 대한 동의 거부 관련간</h3>
                        <span className='smalltext'>이용자는 개인정보의 수집 및 이용 동의에 거부하실 수 있으며, 필수항목의 수집 및 이용에 동의하지 않으시는 경우 회원가입이 제한됩니다.</span> <br />
                        
                        <h1>스카이패스 회원의 개인정보 수집· 및 이용에 대한 동의 사항</h1>
                        <h2 className='textunderline'>1. 수집하는 개인정보의 항목</h2>
                        <h3>가. 회원가입</h3>
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>① 필수항목</span><br />
                        &nbsp;&nbsp;&nbsp;<span className='smalltext'>성명(한글 및 영문), 생년월일, 성별, 연락처(전화번호, 휴대전화번호, 이메일 주소), 아이핀 정보 &nbsp;&nbsp;&nbsp;&nbsp;(CI)</span> <br />
                        
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>② 선택항목</span><br />
                        &nbsp;&nbsp;&nbsp;<span className='smalltext'>우편물 수령지(자택/직장), 직장정보(직장명, 부서명, 직위)</span>
                        
                        <h3>나. 만 14세 미만의 회원 가입</h3>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='smalltext'>법정대리인의 성명, 관계, 연락처(전화번호, 휴대전화번호, 이메일 주소), 스카이패스번호(선택)</span> <br />
                        
                        <h3>다. 보너스 항공권 구매 등 당사의 상품 및 서비스에 대한 대금결제</h3>
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>① 카드결제</span> <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='smalltext'>카드번호, 유효기간, 승인번호 등</span> <br />
                        
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>② 계좌이체</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='smalltext'>거래은행명, 계좌번호, 승인번호 등</span><br />
                        
                        <h3>라. 기타</h3>
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>① 스카이패스 가족회원 등록</span> <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='smalltext'>가족 회원의 성명 및 스카이패스 번호, 가족관계 증빙서류 사본</span><br />
                        
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>② 사후 마일리지 입력 신청</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='smalltext'>탑승 편명, 탑승구간, 탑승일자, 항공권 번호</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='smalltext'>(홈페이지를 통한 신청 : 이메일 주소 주소, 전화번호 추가)</span><br />
                        
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>③ 모바일 카드 또는 실물 카드 재발급 신청</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='smalltext'>핸드폰 번호, 우편물 접수 주소(자택 혹은 직장)</span><br />
                        
                        <h3>마. 자동으로 생성되는 개인정보</h3>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='textbold smalltext'>서비스 이용기록</span><br />
                        
                        <h2 className='textunderline'> 2. 개인정보의 수집· 및 이용목적</h2>
                        <h3>가. 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</h3>
                        <span className='modalcolor'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;보너스 예약 및 발권, 회원카드 발급, 항공권· 및 기념품 등 각종 물품 배송 또 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;는 회원실적지 등 각종 안내메일 발송, 우수회원 자격 부여 및 심사, 고객 맞춤 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;형 서비스 제공, 금융거래 본인 인증 및 금융 서비스, 구매 및 요금결제, 요금 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;추심</span> <br />
                        
                        <h3>나. 회원관리</h3>
                        <span className='modalcolor'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;회원제 서비스 이용에 따른 본인확인, 개인식별, 불량회원의 부정 이용 방지와 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;비인가 사용 방지, 가입 의사 확인, 가입 및 가입횟수 제한, 만 14세 미만 아동 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;개인 정보 수집 시 법정 대리인 동의여부 확인, 분쟁 조정을 위한 기록보존, 불 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;만처리 등 민원처리, 고지사항 전달</span><br />
                        
                        <h2 className='textunderline'>3. 개인정보의 보유 목적 및 이용 기간</h2>
                        <span className='smalltext'>- 이용자의 동의 하에 수집된 개인정보는 이용자가 대한항공 인터넷 웹사이트상의 서비스를 이용하는 동안 보유· 및 이용됩니다.</span> <br />
                        
                        <span className='smalltext'>- 당사는 아래와 같이 개인정보의 수집 및 이용 목적이 달성된 때 수집된 개인정보를 지체 없이 파기하겠습니다.</span> <br />
                        
                        <span className='modalcolor'>① 회원가입 정보의 경우</span> <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;회원 탈퇴 요청이 있거나 회원 자격을 상실한 때 <br />
                        
                        <span className='modalcolor'>② 설문조사, 이벤트 등 일시적 목적을 위하여 회원가입 시 수집하지 않았던 개인 &nbsp;&nbsp;&nbsp;&nbsp;정보를 추가로 수집한 경우</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;당해 설문조사, 이벤트 등이 종료한 때 <br />
                        
                        <span className='modalcolor'>③ 사업을 폐지하는 경우</span>
                        <span className='modalcolor'>④ 기타 관련 법률에 의해 정해진 경우</span> <br />
                        <span className='smalltext'>다만, 개인정보의 수집 및 이용 목적이 달성된 경우에도 상법, 전자상거래 등에서의 소비자 보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요성이 있는 경우 및 사전에 보유기간을 이용자에게 고지하거나 명시한 경우 등은 그에 따라 개인정보를 보관할 수 있습니다.</span> <br />
                        
                        <h3>가. 계약 또는 청약철회 등에 관한 기록, 대금 결제 및 재화 등의 공급 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;에 관한 기록</h3>
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>① 보존 사유</span> <br />
                        &nbsp; &nbsp; &nbsp; &nbsp;전자상거래 등에서의 소비자 보호에 관한 법률 <br />
                        
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>② 보존 기간</span><br />
                        &nbsp; &nbsp; &nbsp; &nbsp;<span className='modalcolor'>5년</span> <br />
                        
                        <h3>나. 소비자의 불만 또는 분쟁 처리 기록</h3>
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>① 보존 사유</span> <br />
                        &nbsp; &nbsp; &nbsp; &nbsp;전자상거래 등에서의 소비자 보호에 관한 법률 <br />
                        
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>② 보존 기간</span><br />
                        &nbsp; &nbsp; &nbsp; &nbsp;<span className='modalcolor'>3년</span> <br />
                        
                        <h3>다. 본인확인에 관한 기록</h3>
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>① 보존 사유</span> <br />
                        &nbsp; &nbsp; &nbsp; &nbsp;정보통신망 이용촉진 및 정보보호 등에 관한 법률 <br />
                        
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>② 보존 기간</span><br />
                        &nbsp; &nbsp; &nbsp; &nbsp;<span className='modalcolor'>6개월</span> <br />
                        
                        <h3>라. 홈페이지 방문에 관한 기록</h3>
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>① 보존 사유</span> <br />
                        &nbsp; &nbsp; &nbsp; &nbsp;통신비밀보호법 <br />
                        
                        &nbsp;&nbsp;&nbsp;<span className='textbold'>② 보존 기간</span><br />
                        &nbsp; &nbsp; &nbsp; &nbsp;<span className='modalcolor'>3개월</span> <br />
                        
                        <h2>4. 개인정보의 수집 및 이용에 대한 동의 거부 관련</h2>
                        <span className='smalltext'>이용자는 개인정보의 수집 및 이용 동의에 거부하실 수 있으며, 필수항목의 수집 및 이용에 동의하지 않으시는 경우 회원가입이 제한됩니다.</span> <hr />
                        </p>
                    ) : modalContent === 'required2' ? (
                        <p>약관 상세
                        회원의 개인정보 수집 및 이용에 대한 동의 사항
                        수집하는 개인정보의 항목
                        회원가입
                        필수항목
                        아이디(ID), 비밀번호, 성명(한글 및 영어), 생년월일, 성별, 연락처 (전화번호, 휴대전화번호, 이메일 주소)
                        
                        선택항목
                        우편물 수령지(자택/직장), 직장정보(직장명, 부서명, 직위)
                        
                        만 14세 미만의 회원가입
                        보호자의 성명, 가입자와의 관계, 연락처(전화번호, 휴대전화번호, 이메일 주소), 회원번호(선택)
                        
                        기타 홈페이지 이용
                        국내선 예약
                        탑승자 성명, 생년월일, 성별, 연락처, 이메일 주소, 국적, 마일리지 적립 항공사 및 회원번호(선택), 할인 선택 시 해당 인적사항(선택)
                        
                        카드결제
                        카드번호, 유효기간, 승인번호 등
                        
                        환불(한국)
                        계좌번호, 은행명, 승인번호 
                        
                        가족회원 등록
                        가족 회원 정보, 가족관계증빙서류 사본
                        
                        고객지원센터를 통한 질의(비회원)
                        성명, 연락처(전화번호, 휴대전화번호, 이메일 주소), 회원 번호(선택)
                        
                        체크인 편의를 위한 정보 저장 서비스 이용(선택)
                        여권정보(국적, 발급국가, 여권번호), 영주권 번호(영주권 구분, 영주권 번호, 국적, 발급국가), KTN(Known Traveler Number)(선택)
                        
                        결제 편의를 위한 정보 저장 서비스 이용(선택)
                        신용카드 정보(발급국가, 신용카드 번호, 카드 명의자 성/이름), 신용카드 청구지 정보(주소, 도시, 주, 우편번호)
                        
                        자동으로 생성되는 개인정보
                        서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보, 결제기록 등
                        
                        <h3>2. 개인정보의 수집· 및 이용목적</h3>
                        서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
                        콘텐츠 제공, 항공권 예약 및 발권, 항공권 등 각종 물품배송 또는 청구서 발송, 금융거래 본인 인증 및 금융 서비스, 구매 및 요금결제, 요금추심
                        
                        회원관리
                        회원제 서비스 이용에 따른 본인확인, 개인식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 가입 및 가입횟수 제한, 만 14세 미만 아동 개인 정보 수집 시 법정 대리인 동의여부 확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달
                        
                        3. 개인정보의 보유 목적 및 이용 기간
                        이용자의 동의 하에 수집된 개인정보는 이용자가 대한항공 인터넷 웹사이트상의 서비스를 이용하는 동안 보유· 및 이용됩니다.
                        
                        당사는 아래와 같이 개인정보의 수집 및 이용 목적이 달성된 때 수집된 개인정보를 지체 없이 파기하겠습니다.
                        
                        회원가입 정보의 경우
                        회원 탈퇴 요청이 있거나 회원 자격을 상실한 때
                        
                        설문조사, 이벤트 등 일시적 목적을 위하여 회원가입 시 수집하지 않았던 개인정보를 추가로 수집한 경우
                        당해 설문조사, 이벤트 등이 종료한 때
                        
                        사업을 폐지하는 경우
                        기타 관련 법률에 의해 정해진 경우
                        다만, 개인정보의 수집 및 이용 목적이 달성된 경우에도 상법, 전자상거래 등에서의 소비자 보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요성이 있는 경우 및 사전에 보유기간을 이용자에게 고지하거나 명시한 경우 등은 그에 따라 개인정보를 보관할 수 있습니다.
                        
                        계약 또는 청약철회 등에 관한 기록, 대금 결제 및 재화 등의 공급에 관한 기록
                        보존 사유
                        전자상거래 등에서의 소비자 보호에 관한 법률
                        
                        보존 기간
                        5년
                        
                        소비자의 불만 또는 분쟁 처리 기록
                        보존 사유
                        전자상거래 등에서의 소비자 보호에 관한 법률
                        
                        보존 기간
                        3년
                        
                        본인확인에 관한 기록
                        보존 사유
                        정보통신망 이용촉진 및 정보보호 등에 관한 법률
                        
                        보존 기간
                        6개월
                        
                        홈페이지 방문에 관한 기록
                        보존 사유
                        통신비밀보호법
                        
                        보존 기간
                        3개월
                        
                        4. 개인정보의 수집 및 이용에 대한 동의 거부 관련간
                        이용자는 개인정보의 수집 및 이용 동의에 거부하실 수 있으며, 필수항목의 수집 및 이용에 동의하지 않으시는 경우 회원가입이 제한됩니다.
                        
                        회원 회원의 개인정보 수집· 및 이용에 대한 동의 사항
                        1. 수집하는 개인정보의 항목
                        회원가입
                        필수항목
                        성명(한글 및 영문), 생년월일, 성별, 연락처(전화번호, 휴대전화번호, 이메일 주소), 아이핀 정보(CI)
                        
                        선택항목
                        우편물 수령지(자택/직장), 직장정보(직장명, 부서명, 직위)
                        
                        만 14세 미만의 회원 가입
                        법정대리인의 성명, 관계, 연락처(전화번호, 휴대전화번호, 이메일 주소), 회원번호(선택)
                        
                        보너스 항공권 구매 등 당사의 상품 및 서비스에 대한 대금결제
                        카드결제
                        카드번호, 유효기간, 승인번호 등
                        
                        계좌이체
                        거래은행명, 계좌번호, 승인번호 등
                        
                        기타
                        회원 가족회원 등록
                        가족 회원의 성명 및 회원 번호, 가족관계 증빙서류 사본
                        
                        사후 마일리지 입력 신청
                        탑승 편명, 탑승구간, 탑승일자, 항공권 번호
                        (홈페이지를 통한 신청 : 이메일 주소 주소, 전화번호 추가)
                        
                        모바일 카드 또는 실물 카드 재발급 신청
                        핸드폰 번호, 우편물 접수 주소(자택 혹은 직장)
                        
                        자동으로 생성되는 개인정보
                        서비스 이용기록
                        
                        2. 개인정보의 수집· 및 이용목적
                        서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
                        보너스 예약 및 발권, 회원카드 발급, 항공권· 및 기념품 등 각종 물품 배송 또는 회원실적지 등 각종 안내메일 발송, 우수회원 자격 부여 및 심사, 고객 맞춤형 서비스 제공, 금융거래 본인 인증 및 금융 서비스, 구매 및 요금결제, 요금추심
                        
                        회원관리
                        회원제 서비스 이용에 따른 본인확인, 개인식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 가입 및 가입횟수 제한, 만 14세 미만 아동 개인 정보 수집 시 법정 대리인 동의여부 확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달
                        
                        3. 개인정보의 보유 목적 및 이용 기간
                        이용자의 동의 하에 수집된 개인정보는 이용자가 대한항공 인터넷 웹사이트상의 서비스를 이용하는 동안 보유· 및 이용됩니다.
                        
                        당사는 아래와 같이 개인정보의 수집 및 이용 목적이 달성된 때 수집된 개인정보를 지체 없이 파기하겠습니다.
                        
                        회원가입 정보의 경우
                        회원 탈퇴 요청이 있거나 회원 자격을 상실한 때
                        
                        설문조사, 이벤트 등 일시적 목적을 위하여 회원가입 시 수집하지 않았던 개인정보를 추가로 수집한 경우
                        당해 설문조사, 이벤트 등이 종료한 때
                        
                        사업을 폐지하는 경우
                        기타 관련 법률에 의해 정해진 경우
                        다만, 개인정보의 수집 및 이용 목적이 달성된 경우에도 상법, 전자상거래 등에서의 소비자 보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요성이 있는 경우 및 사전에 보유기간을 이용자에게 고지하거나 명시한 경우 등은 그에 따라 개인정보를 보관할 수 있습니다.
                        
                        계약 또는 청약철회 등에 관한 기록, 대금 결제 및 재화 등의 공급에 관한 기록
                        보존 사유
                        전자상거래 등에서의 소비자 보호에 관한 법률
                        
                        보존 기간
                        5년
                        
                        소비자의 불만 또는 분쟁 처리 기록
                        보존 사유
                        전자상거래 등에서의 소비자 보호에 관한 법률
                        
                        보존 기간
                        3년
                        
                        본인확인에 관한 기록
                        보존 사유
                        정보통신망 이용촉진 및 정보보호 등에 관한 법률
                        
                        보존 기간
                        6개월
                        
                        홈페이지 방문에 관한 기록
                        보존 사유
                        통신비밀보호법
                        
                        보존 기간
                        3개월
                        
                        4. 개인정보의 수집 및 이용에 대한 동의 거부 관련
                        이용자는 개인정보의 수집 및 이용 동의에 거부하실 수 있으며, 필수항목의 수집 및 이용에 동의하지 않으시는 경우 회원가입이 제한됩니다.</p>
                    ) : modalContent === 'optional1' ? (
                        <p><h2>약관상세</h2><h2>회원의 개인정보보호를 위한 이용자 동의 사항</h2>
                        <h3 className='textunderline'>개인정보 제3자 제공 관련</h3>
                        <span className='smalltext'>태극항공은 법령에 근거가 있는 등의 예외적인 경우를 제외하고 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. </span><br /><br />
                        
                        <span className='smalltext'>다만 회원인 경우 설문조사, 프로모션, 이벤트 등 이용자 개개인께 최적화된 양질의 서비스를 제공하기 위한 목적으로 제휴사, 후원사 등에 이용자의 개인정보 제공이 필요할 경우, 그 모든 경우에 제공받는 자, 제공받는 자의 이용 목적, 제공할 정보의 내용, 제공받는 자의 개인정보보유 및 이용기간을 전자우편이나 서면으로 개별 통지하거나, 또는 인터넷 사이트에 명시하여 이용자의 동의 (예:마우스 클릭)를 받아 진행됩니다.</span><br />
                        
                        <h2>스카이패스 회원의 개인정보보호를 위한 이용자 동의 사항</h2>
                        <h3 className='textunderline'>개인정보 제3자 제공 관련</h3>
                        <span className='smalltext'>태극항공은 법령에 근거가 있는 등의 예외적인 경우를 제외하고는 회원의 동의없이 개인정보를 제3자에게 제공하지 않습니다. 다만, 아래의 제휴서비스를 이용하는 경우에는 다음과 같은 개인정보가 제공될 수 있습니다.</span> <br /> <br />
                        
                        <span className='smalltext'>회원은 개인정보의 제3자 제공 동의에 거부하실 수 있으며, 거부하시더라도 회원 가입은 가능하나 제휴사를 통한 마일리지 적립· 및 사용에 제한이 발생할 수 있습니다.</span>
                        </p>
                    ) : (
                        <p>
                        <h2>약관 상세</h2>
                        <h2>마케팅 광고 활용 동의</h2>
                        <span className='modalcolor'>태극항공은 광고성 정보(이벤트, 혜택) 제공을 위해</span> 휴대전화 번호, 이메일 주소, 우편물 수령지(자택, 직장), 회사정보(회사명, 부서명, 직위)를 수집합니다. <br /><br />
                        
                        <span className='modalcolor'>휴대전화 번호, 이메일 주소는 대한항공 회원가입을 위한 필수 수집항목으로써 회원 가입기간 동안 보관되나, 마케팅 광고 활용 동의를 철회하시면 본 목적으로의 개인정보는 처리되지 않습니다.</span> <br /><br />
                        
                        우편물 수령지, 회사정보는 이용자가 동의를 거부하더라도 회원 가입이 가능합니다.</p>
                    )}
                </div>
                <button onClick={closeModal} className="close-button">확인</button>
            </Modal>
        </div>
    );
}

export default Terms;
