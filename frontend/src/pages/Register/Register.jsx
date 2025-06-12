import React from 'react';
import { Helmet } from "react-helmet-async";
import CryptoJS from 'crypto-js';


import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = React.useState("");
    // useState是React的一个Hook，初始值为空字符串
    const [email, setMail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const navigate = useNavigate();
    // useNavigate是React Router的一个Hook，用于编程式导航


    const handleSubmit = async (e) => {
        e.preventDefault();
        // preventDefault()方法阻止表单的默认提交行为
        if (!username || !email || !password || !confirmPassword) {
            alert("すべてのフィールドを入力してください。");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // 定义一个正则表达式，用于验证电子邮件格式
        if (!emailRegex.test(email)) {
            alert("有効なメールアドレスを入力してください。");
            return;
        }

        if (password !== confirmPassword) {
            alert("パスワードが一致しません。");
            return;
        }
        const encryptedPassword = CryptoJS.SHA256(password).toString();
        // 使用CryptoJS库对密码进行SHA-256加密

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username,
                email,
                password: encryptedPassword,
                confirmPassword: encryptedPassword //                
            })
        });
        const result = await response.json();
        if (response.ok) {
            navigate("/");
        } else {
            alert(result.message || '登録に失敗しました');
            // Handle registration failure (e.g., show error message)
        }
    }

    return (
        <>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div className="register-container">
                <div className="left-panel">
                    <h2>Commodity Managementへようこそ</h2>
                    <p>安全・効率的でスマートな在庫管理プラットフォームで、すべての商品の流れを簡単に把握できます。</p>
                    <ul>
                        <li>✅ 在庫のリアルタイム更新と追跡</li>
                        <li>✅ 複数チャネルの販売データを一元管理</li>
                        <li>✅ 自動アラート・補充リマインダー機能</li>
                        <li>✅ ユーザー権限管理に対応</li>
                        <li>✅ グラフ分析で迅速な意思決定を支援</li>
                    </ul>
                </div>

                <div className="right-panel">

                    <h2>新規登録</h2>
                    <form onSubmit={handleSubmit} className="register-form">
                        <input
                            type="text"
                            placeholder="ユーザー名"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        //  onChange事件处理函数，当输入框内容变化时更新username状态
                        />
                        <input
                            type="email"
                            placeholder="メールアドレス"
                            value={email}
                            onChange={(e) => setMail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="パスワード"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="パスワードを確認"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}

                        />
                        <button type="submit" className="register-button">登録</button>
                    </form>
                    <p className="login-link">
                        すでにアカウントをお持ちですか？
                        <a href="/" className="login-link-button">ログイン</a>
                    </p>

                    <div className="social-login">
                        <p>新規登録して利用開始しましょう！</p>
                        <div className="social-icons">
                            <span className="icon blue"></span>
                            <span className="icon red"></span>
                            <span className="icon lightblue"></span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Register;