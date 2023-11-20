import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import { UserConfigExport, ConfigEnv } from 'vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      VueSetupExtend(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath: './mock',
        enable: command === 'serve',
      }),
    ],
    resolve: {
      alias: {
        // 相对路径别名配置，使用 @ 代替 src
        '@': path.resolve('./src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    server: {
      proxy: {
        // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo
        '/foo': 'http://localhost:4567',
        // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        // 正则表达式写法：http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
        '^/fallback/.*': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fallback/, ''),
        },
        // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
        '/socket.io': {
          target: 'ws://localhost:5174',
          ws: true,
        },
      },
    },
  }
}
