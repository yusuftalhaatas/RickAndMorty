module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3CB371", // Yeşil - Rick'in portal rengi
        secondary: "#00BFFF", // Mavi - Morty'nin teması
        accent: "#FFD700", // Parlak Sarı - Önemli aksiyonlar için
        warning: "#FF4500", // Kırmızı - Uyarı ve hata mesajları
        backgroundLight: "#F0F0F0", // Açık Gri - Temiz arka plan
        backgroundDark: "#1C1C3A", // Koyu Lacivert - Koyu tema arka planı
        textPrimary: "#333333", // Koyu Gri - Ana metin rengi
        textSecondary: "#FFFFFF", // Beyaz - Koyu temalar için metin rengi
        detailTurquoise: "#40E0D0", // Turkuaz - Vurgulamalar
        detailPurple: "#8A2BE2", // Mor - Bilim kurgu hissi
      },
    },
  },
  plugins: [],
};
