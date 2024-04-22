module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      primary: '#F1F1F1', // Color primario
      secondary: '#88868B', // Color secundario
      tertiary: {
        DEFAULT: '#F8C300',
        dark: '#dbb200',
        light: '#fbd446'
      }, // Color terciario
      black: '#000000'
    },
    fontSize: {
      sm: '12px',
      md: '15px',
      lg: '20px',
      xl: '22px',
      xxl: '46px'
    },
    fontWeight: {
      extrabold: '800',
      bold: '700',
      medium: '400'
    },
    extend: {
      boxShadow: {
        custom: '14px 17px 15.6px 0px #00000040' // 'custom' es el nombre de tu sombra, puedes cambiarlo
      },
      backdropBlur: {
        'extra-sm': '1px'
      }
    }
  },
  plugins: []
}
