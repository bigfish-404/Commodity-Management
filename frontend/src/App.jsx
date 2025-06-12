import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppRouter from './routes/AppRouter';

// 主题单独提取（方便今后做主题自定义）
const theme = createTheme({
  // 未来可以在这里添加颜色、字体、间距等自定义配置
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRouter />
        </ThemeProvider>
    );
}

export default App;
