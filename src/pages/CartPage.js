/** CartPage - ações no carrinho */
export default class CartPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.cartContainer = '[data-test="shopping-cart-link"]';
        this.cartItem = '.cart_item';
        this.checkoutButton = '[data-test="checkout"]';
    }

    /**
     * Abre a página do carrinho clicando no ícone do cabeçalho.
     * Aguarda até que o botão de checkout esteja visível.
     */
    async goto() {
        await this.page.click(this.cartContainer);
        await this.page.waitForSelector(this.checkoutButton);
    }

    /**
     * Retorna a quantidade de itens presentes no carrinho (inteiro).
     * @returns {Promise<number>}
     */
    async getCartItemsCount() {
        return await this.page.locator(this.cartItem).count();
    }

    /**
     * Clica no botão de checkout para prosseguir com o fluxo de finalização.
     */
    async proceedToCheckout() {
        await this.page.click(this.checkoutButton);
    }
}
