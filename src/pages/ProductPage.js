/** ProductPage - ações na página de detalhe do produto */
export default class ProductPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        // Seletores principais
        this.titleSel = '.inventory_details_name';
        this.priceSel = '.inventory_details_price';
        this.descSel = '.inventory_details_desc';
        this.addToCartButton = '[data-test*="add-to-cart"]';
        this.removeFromCartButton = '[data-test*="remove-"]';
    }

    /**
     * Retorna o título/nome do produto mostrado na página de detalhes.
     * @returns {Promise<string>}
     */
    async getTitle() {
        return (await this.page.locator(this.titleSel).textContent()).trim();
    }

    /**
     * Retorna o preço do produto como texto (ex.: "$29.99").
     * @returns {Promise<string>}
     */
    async getPrice() {
        return (await this.page.locator(this.priceSel).textContent()).trim();
    }

    /**
     * Retorna a descrição do produto.
     * @returns {Promise<string>}
     */
    async getDescription() {
        return (await this.page.locator(this.descSel).textContent()).trim();
    }

    /**
     * Clica no botão de adicionar ao carrinho.
     * Usa um seletor de classe para ser mais robusto a mudanças de idioma.
     */
    async addToCart() {
        await this.page.click(this.addToCartButton);
    }
}
