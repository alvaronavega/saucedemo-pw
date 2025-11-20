/**
 * CheckoutPage - encapsula o fluxo de checkout.
 */
export default class CheckoutPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        // Campos do formulário
        this.firstName = '[data-test="firstName"]';
        this.lastName = '[data-test="lastName"]';
        this.postalCode = '[data-test="postalCode"]';
        // Botões do fluxo
        this.continueButton = '[data-test="continue"]';
        this.finishButton = '[data-test="finish"]';
        // Header de confirmação
        this.completeHeader = '.complete-header';
    }

    /**
     * Preenche as informações do cliente e avança para a próxima etapa.
     * @param {string} first - primeiro nome
     * @param {string} last - sobrenome
     * @param {string} postal - código postal
     */
    async fillCustomerInfo(first, last, postal) {
        await this.page.fill(this.firstName, first);
        await this.page.fill(this.lastName, last);
        await this.page.fill(this.postalCode, postal);
        await this.page.click(this.continueButton);
    }

    /**
     * Finaliza o pedido clicando no botão 'Finish' e aguarda o header de confirmação.
     */
    async finish() {
        await this.page.click(this.finishButton);
        await this.page.waitForSelector(this.completeHeader);
    }

    /**
     * Retorna o texto do header de confirmação (útil para asserts mais detalhados).
     * @returns {Promise<string>}
     */
    async getCompleteText() {
        return (await this.page.locator(this.completeHeader).textContent()).trim();
    }
}
