/** ProductsPage - ações na listagem de produtos */
export default class ProductsPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        // Seletores principais
        this.inventoryList = '.inventory_list';
        this.inventoryItem = '.inventory_item';
        this.addToCartButton = '[data-test*="add-to-cart"]';
    }

    /**
     * Espera até que a lista de produtos esteja carregada na página.
     * Útil após o login para garantir que a página está pronta para interações.
     */
    async waitForLoad() {
        await this.page.waitForSelector(this.inventoryList);
    }

    /**
     * Abre a página de detalhes do produto a partir do nome visível na lista.
     * @param {string} name - nome exato do produto conforme exibido na UI
     */
    async openProductByName(name) {
        // usa busca por texto exato na página; é dependente do texto da aplicação
        await this.page.getByText(name, { exact: true }).click();
    }

    /**
     * Retorna uma lista com os nomes dos produtos exibidos na página.
     * @returns {Promise<string[]>}
     */
    async getProductNames() {
        return this.page.locator('.inventory_item_name').allTextContents();
    }
}
