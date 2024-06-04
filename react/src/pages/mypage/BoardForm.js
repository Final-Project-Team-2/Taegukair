import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { callRegisterAPI } from '../../apis/BoardAPICalls';
import { useNavigate } from 'react-router-dom';
import './BoardForm.css'; // CSS 파일 추가

const BoardForm = () => {
    const [form, setForm] = useState({
        title: '',
        content: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(callRegisterAPI({ form, navigate }));
        } catch (error) {
            console.error('Failed to submit form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="board-form">
            <div className="form-group">
                <label>제목</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} required className="form-control" />
            </div>
            <div className="form-group">
                <label>내용</label>
                <textarea name="content" value={form.content} onChange={handleChange} required className="form-control textarea-content" />
            </div>
            <button type="submit" className="submit-button">전송</button>
        </form>
    );
};

export default BoardForm;
