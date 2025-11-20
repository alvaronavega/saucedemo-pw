import { test, expect } from '@playwright/test';
import LoginPage from '../src/pages/LoginPage';
import ProductsPage from '../src/pages/ProductsPage';
import ProductPage from '../src/pages/ProductPage';
import CartPage from '../src/pages/CartPage';
import CheckoutPage from '../src/pages/CheckoutPage';

test('fluxo completo de compra no saucedemo', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    // Credenciais vindas de .env carregadas por playwright.config.js
    const user = process.env.SAUCE_USERNAME;
    const pass = process.env.SAUCE_PASSWORD;
    await login.login(user, pass);

    const products = new ProductsPage(page);
    await products.waitForLoad();

    // 'Pesquisa' -> abrir produto pelo nome visível (site não possui busca)
    const productName = 'Sauce Labs Backpack';
    await products.openProductByName(productName);

    const product = new ProductPage(page);
    const title = await product.getTitle();
    const price = await product.getPrice();
    const desc = await product.getDescription();

    // Validar detalhes do produto 
    // - título presente
    expect(title.length).toBeGreaterThan(0);
    // - preço em formato monetário (aceita $, € ou £ opcional)
    expect(price).toMatch(/[\$€£]?\s?\d+(\.\d{2})?/);
    // - descrição não vazia
    expect(desc.length).toBeGreaterThan(10);

    // Adicionar ao carrinho
    await product.addToCart();

    // Ir para o carrinho e iniciar checkout
    const cart = new CartPage(page);
    await cart.goto();
    const count = await cart.getCartItemsCount();
    expect(count).toBeGreaterThan(0);
    await cart.proceedToCheckout();

    // Preencher informações do checkout e finalizar
    const checkout = new CheckoutPage(page);
    await checkout.fillCustomerInfo('Test', 'User', '00000');
    await checkout.finish();

    // Verificar finalização por visibilidade do header de confirmação (independente do texto)
    await expect(page.locator('.complete-header')).toBeVisible();
});
