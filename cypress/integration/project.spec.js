const TOP_BAR_SELECTOR = '.top-bar';
const FACEBOOK_LOGOTIPO_SELECTOR = '.facebook-logo';
const USER_IDENTIFIER_INPUT_SELECTOR = 'input#user-email-phone';
const USER_IDENTIFIER_LABEL_SELECTOR = '#user-email-phone-label';
const USER_IDENTIFIER_LABEL_TEXT_SELECTOR = 'Email ou telefone';
const USER_PASSWORD_INPUT_SELECTOR = 'input#user-password';
const USER_LOGIN_BUTTON_SELECTOR = '#button-login';
const FACEBOOK_SLOGAN = 'O Facebook ajuda você a se conectar e compartilhar com as pessoas que fazem parte da sua vida.';
const FACEBOOK_NETWORKING_IMG_SELECTOR = '#facebook-networking';
const OPEN_ACCOUNT_MESSAGE = 'Abra uma conta';
const QUICK_AND_SIMPLE_MESSAGE = 'É rápido e fácil.';
const ALL_INPUT_SELECTOR = 'input';
const ALL_PASSWORD_INPUT_SELECTOR = 'input[type=password]';
const BIRTHDATE_TITLE = 'Data de nascimento';
const GENDER_TITLE = 'Gênero';
const GENRES = [
  'Feminino',
  'Masculino',
  'Personalizado'
];
const REGISTER_BUTTON_SELECTOR = 'button#facebook-register';

const checkPlaceholder = (elements, placeholder) => (
  elements.some((element) => Cypress.$(element).attr('placeholder') === placeholder)
);

describe('Facebook Signup', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Posicionamento de elementos utilizando CSS Flexbox', () => {
    cy.readFile('./style.css')
      .then((content) => {
        expect(content).to.match(/display: ?flex/);
      });
  });

  it('Uma barra azul na parte superior da página do **Facebook** com a classe top-bar', () => {
    cy.get(TOP_BAR_SELECTOR).should('exist');
  });

  it('O logotipo do Facebook no canto superior esquerdo com a classe facebook-logo', () => {
    cy.get(FACEBOOK_LOGOTIPO_SELECTOR).should('exist');
  });

  it('Um campo de entrada de texto no canto superior direito para receber o email ou o telefone do usuário com o id user-email-phone', () => {
    cy.get(USER_IDENTIFIER_INPUT_SELECTOR).should('exist');
  });

  it('Um título com o texto "Email ou telefone" acima do campo de entrada de texto para email ou telefone com o id user-email-phone-label', () => {
    cy.get(USER_IDENTIFIER_LABEL_SELECTOR)
      .should('exist')
      .should('have.text', USER_IDENTIFIER_LABEL_TEXT_SELECTOR);
      // assert position
  });

  it('Um campo de entrada de texto para digitar a senha do usuário', () => {
    cy.get(USER_PASSWORD_INPUT_SELECTOR).should('have.attr', 'type', 'password');
    // assert position
  });

  it('Um botão com o id "button-login" e o texto "Entrar", à direita do campo de entrada de texto para senha', () => {
    const content = 'my-user';

    cy.on('window:alert', (text) => {
      expect(text).to.equal(content);
    });

    cy.get(USER_IDENTIFIER_INPUT_SELECTOR).type(content);
    cy.get(USER_LOGIN_BUTTON_SELECTOR)
      .should('exist')
      .should('have.text', 'Entrar')
      .click();
    // assert position
  });

  it('Um texto "O Facebook ajuda você a se conectar e compartilhar com as pessoas que fazem parte da sua vida."', () => {
    cy.contains(FACEBOOK_SLOGAN);
  });

  it('Uma imagem com id facebook-networking, que ficará abaixo do item 8. Essa imagem deve conter o mapa do mundo e as conexões entre as pessoas', () => {
    cy.get(FACEBOOK_NETWORKING_IMG_SELECTOR)
      .should('exist')
      .should(($el) => {
        const src = $el.attr('src');
        expect(src).to.match(/networking/);
      });
    // assert position
  });

  it('Um texto "Abra uma conta" posicionado abaixo da caixa de texto de email/telefone', () => {
    cy.contains(OPEN_ACCOUNT_MESSAGE);
    // assert position
  });

  it('Um texto "É rápido e fácil." posicionado abaixo do texto "Abra uma conta"', () => {
    cy.contains(QUICK_AND_SIMPLE_MESSAGE);
    // assert position
  });

  it('Um campo de entrada de texto para o nome do usuário. Posicione esse campo abaixo do texto "É rápido e fácil."', () => {
    cy.get(ALL_INPUT_SELECTOR)
      .then(($inputs) => {
        const elements = $inputs.toArray();
        expect(checkPlaceholder(elements, 'Nome')).to.be.true;
      });
    // assert position
  });

  it('Um campo de entrada de texto para o sobrenome do usuário. Posicione esse campo à direita do campo nome', () => {
    cy.get(ALL_INPUT_SELECTOR)
      .then(($inputs) => {
        const elements = $inputs.toArray();
        expect(checkPlaceholder(elements, 'Sobrenome')).to.be.true;
      });
    // assert position
  });

  it('Um campo de entrada de texto para o celular ou email. Posicione esse campo abaixo do sobrenome do usuário', () => {
    cy.get(ALL_INPUT_SELECTOR)
      .then(($inputs) => {
        const elements = $inputs.toArray();
        expect(checkPlaceholder(elements, 'Celular ou email')).to.be.true;
      });
    // assert position
  });

  it('Um campo de entrada de texto para a nova senha do usuário. Posicione esse campo abaixo do celular/email', () => {
    cy.get(ALL_PASSWORD_INPUT_SELECTOR)
      .then(($inputs) => {
        const elements = $inputs.toArray();
        expect(checkPlaceholder(elements, 'Nova senha')).to.be.true;
      });
    // assert position
  });

  it('Um texto "Data de nascimento" abaixo do campo de entrada de texto de nova senha', () => {
    cy.contains(BIRTHDATE_TITLE);
    // assert position
  });

  it('Um campo para selecionar a data de nascimento', () => {
    cy.get(ALL_INPUT_SELECTOR)
      .then(($inputs) => {
        const elements = $inputs.toArray();
        expect(checkPlaceholder(elements, 'dd/mm/aaaa')).to.be.true;
      });
  });

  it('Um texto "Gênero" abaixo dos campos de data', () => {
    cy.contains(GENDER_TITLE);
  });

  it('Três `radio buttons` com os nomes "Feminino", "Masculino" e "Personalizado"', () => {
    cy.get("input[type='radio']")
      .should(($radios) => {
        expect($radios).to.have.length(GENRES.length);
        $radios.each((index, radio) => {
          expect(Cypress.$(radio).val()).to.equal(GENRES[index]);
        });
      });
  });

  it('Um botão com o texto "Cadastre-se" e id "facebook-register"', () => {
    cy.get(REGISTER_BUTTON_SELECTOR)
      .should('exist')
      .click();
  });
});
