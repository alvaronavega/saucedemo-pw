/** LoginPage - encapsula o fluxo de login */
export default class LoginPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    // Selectors (data-test)
    this.username = '[data-test="username"]';
    this.password = '[data-test="password"]';
    this.loginButton = '[data-test="login-button"]';
    }

    /** Navega para BASE_URL e aguarda o botão de login */
    async goto() {
        const base = process.env.BASE_URL;
        if (!base) throw new Error('BASE_URL não está definido. Defina BASE_URL no arquivo .env');
        await this.page.goto(base);
        await this.page.waitForSelector(this.loginButton);
    }

    /** Preenche usuário/senha e submete o formulário */
    async login(user, pass) {
        await this.page.fill(this.username, user);
        await this.page.fill(this.password, pass);
        await this.page.click(this.loginButton);
    }
}
