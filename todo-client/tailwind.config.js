import daisyui from 'daisyui'
export default {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      daisyui: ["dark", "light"]
    },
  },
  plugins: [daisyui]
}

