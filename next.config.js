/** @type {import('next').NextConfig} */
const nextConfig = {
  // MUI関連のパッケージをNext.jsに自動でトランスパイル（翻訳）させる
  transpilePackages: [
    '@mui/material',
    '@mui/system',
    '@mui/icons-material',
    '@mui/styles',
    '@emotion/react',
    '@emotion/styled'
  ],
};

module.exports = nextConfig;