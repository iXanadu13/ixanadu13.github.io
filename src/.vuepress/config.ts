import { defineUserConfig } from "vuepress";
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'
import { cut } from 'nodejs-jieba'

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
//   lang: 'zh-CN',
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Xanadu13's Blog",
      description: "Powered by vuepress-theme-hope",
    },
    // "/zh/": {
    //   lang: "zh-CN",
    //   title: "博客演示",
    //   description: "vuepress-theme-hope 的博客演示",
    // },
  },

  head: [
    [
      'link', { rel: 'icon', href: '/skyblock.png' }
    ]
  ],

  plugins: [
    slimsearchPlugin({
      // 索引全部内容
      indexContent: true,
      autoSuggestions: false,
      indexOptions: {
        // 使用 nodejs-jieba 进行分词
        tokenize: (text, fieldName) =>
          fieldName === 'id' ? [text] : cut(text, true),
      },
    }),
  ],

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});


