# MRC YALITIM & SÖVE - Teklif & Maliyet SPA

Bu proje **MRC YALITIM & SÖVE** firması için özel olarak geliştirilmiş, tamamen istemci tarafında (client-side) çalışan, Excel gereksinimini ortadan kaldıran modern bir Teklif Oluşturma ve Maliyet Hesaplama platformudur.

## Canlı Link : teklifmodul.netlify.app
 
## Özellikler

- 🚀 **Tamamen İstemci Taraflı (SPA):** Sunucuya veya veritabanına ihtiyaç duymaz. Hızlı ve güvenlidir.
- 💾 **Kalıcı Veri (Local Storage):** Tarayıcıyı kapatsanız bile girdiğiniz müşteri bilgileri, ürünler ve kur ayarları kaydedilir.
- 📄 **Doğrudan Yüksek Çözünürlüklü PDF:** `html2canvas` ve `jspdf` kullanılarak yazdırma diyaloğuna gerek kalmadan cihazınıza doğrudan kurumsal form düzeninde PDF indirmenizi sağlar.
- 💱 **Çoklu Döviz ve KDV Sistemi:** TL (₺), USD ($) ve EUR (€) destekler. KDV hesaplama motoru eklenebilir veya çıkarılabilir.
- 💎 **Kurumsal Şablon:** Çizgi ve renkleri özel ayarlanmış estetik bir A4 tablosu, özel kaşe/imza alanı ve not panelleri içerir.

## Teknolojiler

- **React.js + Vite** (Hızlı derleme ve component mimarisi)
- **Tailwind CSS v3** (Modern ve yönetilebilir CSS, kurumsal renk paleti konfigürasyonu)
- **Lucide React** (Minimalist vektör ikonlar)
- **html2canvas & jsPDF** (Özel render bazlı PDF motoru)

## Kurulum ve Çalıştırma

Bilgisayarınızda (Node.js) yüklü ise projeyi saniyeler içinde çalıştırabilirsiniz:

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/talhaff/Teklif_modul.git
   ```
2. Klasöre gidin ve bağımlılıkları indirin:
   ```bash
   cd Teklif_Modul
   npm install
   ```
3. Geliştirici sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## Dosya Yapısı ve Mimari
Ana bileşenler `src/components` klasörü altında incelikle ayrılmıştır:
- `Sidebar/FormPanel.jsx`: Veri girişinin ve state güncellemelerinin yapıldığı kontrol merkezi.
- `Preview/A4Document.jsx`: Form verilerini dinleyerek re-render edilen yüksek çözünürlüklü A4 belge komponenti. `DocumentHeader`, `DocumentTable` ve `DocumentFooter` yapı taşlarından oluşur.
- `utils/`: `pdfGenerator.js` PDF indirme algoritmalarını ve `formatters.js` para birimi görsel formatlama mantıklarını tutar.

## Telif Hakkı ve Lisans
Proje MRC YALITIM ŞTİ. için hazırlanmıştır. Ticari veya firma içi özel kullanıma aittir.
