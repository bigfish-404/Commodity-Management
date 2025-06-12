import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';

// MUIのテーマを作成（ここで色やフォントなどをカスタマイズ可能）
const theme = createTheme();

// HTML の id="root" の DOM 要素を取得（React アプリのマウント先）
const root = ReactDOM.createRoot(document.getElementById('root'));

// React アプリ全体を描画
root.render(
  <React.StrictMode>
    {/* HelmetProvider: 各ページのタイトルや meta 情報を管理 */}
    <HelmetProvider>
      {/* ThemeProvider: MUI の全体テーマを提供、全体のデザイン統一 */}
      <ThemeProvider theme={theme}>
        {/* BrowserRouter: ルーティング機能を有効化（画面遷移管理） */}
        <BrowserRouter>
          {/* CssBaseline: ブラウザ間のCSS差異をリセットし統一 */}
          <CssBaseline />
          {/* 自作したメインコンポーネント App を描画 */}
          <App />

        </BrowserRouter>

      </ThemeProvider>

    </HelmetProvider>
  </React.StrictMode>
);
