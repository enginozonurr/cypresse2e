const baseUrl = "https://www.saucedemo.com/";

const trueUsername = "standard_user";
const truePasswd = "secret_sauce";

const wrongUsername = "wrong_user";
const wrongPasswd = "wrong_key";

describe("SauceDemo E2E Test", () => {

    beforeEach(() => {
        cy.visit(baseUrl); // Her testten önce sayfaya git
    });

    it("TC001 - Kullanıcı sayfaya gider ve başlığı doğrular", () => {
        cy.title().should('eq', "Swag Labs");
    });

    it("TC002 - Kullanıcı geçerli bilgilerle login olur ve anasayfaya yönlendirilir", () => {
        cy.login(trueUsername, truePasswd);
        cy.url().should('eq', `${baseUrl}inventory.html`);
    });

    it("TC003 - Hatalı kullanıcı adı veya şifre ile giriş yapılamamalı ve kullanıcı bilgilendirilmeli", () => {
        cy.get('[data-test="username"]').type(wrongUsername);
        cy.get('[data-test="password"]').type(wrongPasswd);
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', "Epic sadface: Username and password do not match any user in this service");
    });

    it("TC004 - Kullanıcı sepete iki adet ürün ekler", () => {
        cy.login(trueUsername, truePasswd);
        cy.url().should('include', '/inventory.html');

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click(); //sepete iki ürün ekledim
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

        cy.get('.shopping_cart_link').click(); // sepete gider
        cy.get('.cart_item').should('have.length', 2); // sepete eklenen ürün sayısını kontrol ettim
    });

    it("TC005 - Kullanıcı, sepetinde ürün varken checkout butonuna tıklar ve başarılı bir şekilde sipariş verdiğini doğrular", () => {

        cy.login(trueUsername, truePasswd);
        cy.url().should('include', '/inventory.html');

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]').invoke('text').then((productPrice) => {
            cy.get('.shopping_cart_link').click();
            cy.get('[data-test="checkout"]').click();
            cy.url().should('include', "checkout-step-one.html"); // your information sayfasına ulaşıldığı kontrol edildi.

            cy.get('[data-test="firstName"]').type("Test name");
            cy.get('[data-test="lastName"]').type("Test Surname");
            cy.get('[data-test="postalCode"]').type(11224);

            cy.get('[data-test="continue"]').click();
            cy.url().should('include', "checkout-step-two.html");

            //Checkout sayfasındaki fiyatı al ve inventory sayfasındaki fiyat ile karşılaştır karşılaştır // 1000 ürün olsa ne olacaktı? burada eşdeğer sınıflandırma yapsam iyi olur blackbox teknikleri uygulanmalı 'yapıcam :D'
            cy.get('[data-test="inventory-item-price"]').invoke('text').should((checkoutPrice) => {
                expect(checkoutPrice.trim()).to.eq(productPrice.trim());
            });
            cy.get('[data-test="finish"]').click();
            cy.url().should('include', "checkout-complete.html");
            cy.get('[data-test="checkout-complete-container"]').should('be.visible'); //sipariş başarılımı kontol et
            cy.get('[data-test="back-to-products"]').click(); // anasayfaya dön
            cy.get('.shopping_cart_badge').should('not.exist'); // sepette ürün var mı kontrol et



        });

    });
    it("TC006 - Checkout formu boş bırakılırsa ilerlenemez", () => {
        cy.login(trueUsername, truePasswd);
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="continue"]').click();
        
        cy.get('[data-test="error"]').should('be.visible');
    });




});
