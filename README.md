# Cypress E2E Test Automation - SauceDemo

Bu proje, [SauceDemo](https://www.saucedemo.com/) uygulaması üzerinde Cypress kullanılarak hazırlanan uçtan uca (E2E) test senaryolarını içermektedir.

## 🔍 Test Kapsamı

- ✅ Geçerli kullanıcı ile başarılı login  
- ❌ Geçersiz bilgilerle login denemesi ve hata mesajı kontrolü  
- 🛒 Sepete birden fazla ürün ekleme  
- 💳 Checkout sürecinin tüm adımları  
- 💰 Ürün fiyatlarının inventory ve ödeme sayfasında tutarlılığı  
- 📭 Sipariş sonrası sepetin boş olduğunu doğrulama  
- ⚠️ Checkout formunun boş bırakıldığında hata verdiğini doğrulama

## 🧰 Kullanılan Teknolojiler

- [Cypress](https://www.cypress.io/) (UI Test Otomasyonu)
- JavaScript (ES6)
- Mocha (test runner)
- Chai (assertion library)

## 📁 Klasör Yapısı

```
cypress/
├── e2e/
│   └── saucedemo.cy.js      -> Test senaryoları
├── support/
│   └── commands.js          -> Custom command (login işlemi)
```


Bu proje, Cypress öğrenme sürecinde temel test kabiliyetlerini geliştirmek amacıyla hazırlanmıştır. Kod yapısı sade, okunabilir ve yeniden kullanılabilir olacak şekilde oluşturulmuştur.
