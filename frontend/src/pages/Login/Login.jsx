import React, { useState } from 'react';//引入React库
import { Helmet } from 'react-helmet-async'; //引入react-helmet库，用于修改页面标题
import { useNavigate } from 'react-router-dom'; //引入useNavigate钩子，用于编程式导航
import CryptoJS from 'crypto-js'; //引入CryptoJS库，用于加密密码
import { Link } from 'react-router-dom';

import HeaderRegister from '../../components/Header/HeaderRegister ';//引入Header_Register组件
import './Login.css';

function Login() {
    const [email, setMail] = useState("");
    // useState是React的一个Hook，初始值为空字符串
    // username用于存储用户名
    // setUsername是更新username状态的函数
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // handleSubmit是一个异步函数（async），用于处理表单提交
        // e是事件对象，包含了事件的相关信息    

        e.preventDefault();
        //preventDefault()方法阻止表单的默认提交行为

        if (!email || !password) {
            alert("Please enter both mailAddress and password.");
            return;
            // 如果用户名或密码为空，弹出提示框并返回   
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // 定义一个正则表达式，用于验证电子邮件格式 
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const encryptedPassword = CryptoJS.SHA256(password).toString();
        // 使用CryptoJS库对密码进行SHA-256加密

        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email,
                password: encryptedPassword
            })
        });

        const result = await response.json();

        if (response.ok) {
            navigate("/api/homepage");
            // 如果响应状态为200，表示登录成功，使用navigate函数跳转到"/api/home"页面
        } else {
            alert(result.message || 'Login failed');
            // Handle login failure (e.g., show error message)
        }
    };

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className='container'>
                <HeaderRegister />

                <div className='page-container'>
                    <div className="login-container">
                        <h2 className='login-font'>Login</h2>
                        <form onSubmit={handleSubmit}>
                            {/*绑定表单提交事件(handleSubmit) */}
                            <input
                                type="text"
                                placeholder="メールアドレス"
                                value={email}
                                onChange={(e) => setMail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className='login-buttons'>
                                <button type="submit">Login</button>
                            </div>
                            <div className="register-link">
                                アカウントをお持ちでない方はこちら
                                <Link to="/api/register" className="link-button">
                                    register
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>

            </div>

        </>

    );
}
export default Login;