import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { callRegisterAPI } from '../../apis/BoardAPICalls';
import './BoardForm.css'; // CSS 파일 추가

const BoardForm = () => {
    const [form, setForm] = useState({
        title: '',
        content: '',
        submissionDate: new Date().toISOString().slice(0, 10) // 현재 날짜 설정
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(callRegisterAPI({ form }));
    };

    return (
        <form onSubmit={handleSubmit} className="board-form">
            <div className="form-group">
                <label>Title:</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} required className="form-control" />
            </div>
            <div className="form-group">
                <label>Content:</label>
                <textarea name="content" value={form.content} onChange={handleChange} required className="form-control textarea-content" />
            </div>
            <button type="submit" className="submit-button">Submit</button>
        </form>
    );
};

export default BoardForm;
