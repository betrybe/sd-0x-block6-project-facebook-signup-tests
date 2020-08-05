const TOP_BAR_SELECTOR = '.top-bar';
const FACEBOOK_LOGOTIPO_SELECTOR = '.facebook-logo';
const FACEBOOK_LOGIN_FORM_SELECTOR = 'form.facebook-login';
const USER_IDENTIFIER_INPUT_SELECTOR = 'input#user-email-phone';
const USER_IDENTIFIER_LABEL_SELECTOR = '#user-email-phone-label';
const USER_PASSWORD_LABEL_SELECTOR = '#user-password-label';
const USER_IDENTIFIER_LABEL_TEXT_SELECTOR = 'Email ou telefone';
const USER_PASSWORD_LABEL_TEXT_SELECTOR = 'Senha';
const USER_PASSWORD_INPUT_SELECTOR = 'input#user-password';
const USER_LOGIN_BUTTON_SELECTOR = '#button-login';
const FACEBOOK_SLOGAN_SELECTOR = 'p#facebook-slogan';
const FACEBOOK_SLOGAN = 'O Facebook ajuda você a se conectar e compartilhar com as pessoas que fazem parte da sua vida.';
const FACEBOOK_NETWORKING_IMG_SELECTOR = 'img#facebook-networking';
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


const evaluateOffset = (doc, selector, offsetType) => {
  return doc.querySelector(selector).getBoundingClientRect()[`${offsetType}`];
};


const checkIsRightOf = (elementLeftSelector, elementRightSelector) => {
  cy.document().then(doc => {
    const elementLeft = {
      top: evaluateOffset(doc, elementLeftSelector, 'top'),
      left: evaluateOffset(doc, elementLeftSelector, 'left'),
      width: evaluateOffset(doc, elementLeftSelector, 'width'),
    };

    const elementRight = {
      top: evaluateOffset(doc, elementRightSelector, 'top'),
      left: evaluateOffset(doc, elementRightSelector, 'left'),
      width: evaluateOffset(doc, elementRightSelector, 'width'),
    };

    expect(elementLeft.top == elementRight.top && elementRight.left > elementLeft.left + elementLeft.width).to.be.true;
  });
};

const checkIsBelowOf = (elementAboveSelector, elementBelowSelector) => {
  cy.document().then(doc => {
    const elementAbove = {
      top: evaluateOffset(doc, elementAboveSelector, 'top'),
      height: evaluateOffset(doc, elementAboveSelector, 'height'),
    };

    const elementBelow = {
      top: evaluateOffset(doc, elementBelowSelector, 'top'),
      height: evaluateOffset(doc, elementBelowSelector, 'height'),
    };

    console.log(elementBelow.top)
    console.log(elementAbove.top + elementAbove.height)

    expect(elementBelow.top >= elementAbove.top + elementAbove.height).to.be.true;
  });
};


describe('Facebook Signup', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  describe('Uma barra azul na parte superior da página do **Facebook** com a classe top-bar', () => {
    it('Esta barra deve possuir a classe top-bar', () => {
      cy.get(TOP_BAR_SELECTOR).should('exist');
    });

    it('A classe top-bar deve determinar que o elemento é um flex container', () => {
      cy.get(TOP_BAR_SELECTOR).should('have.css', 'display', 'flex');
    });

    it('A classe top-bar deve possuir a propriedade `background-color: rgb(66, 103, 178)`', () => {
      cy.get(TOP_BAR_SELECTOR).should('have.css', 'background-color', 'rgb(66, 103, 178)');
    });
  });

  describe('A barra superior deve conter o logotipo do Facebook no canto esquerdo com a classe facebook-logo', () => {
    it('O logotipo deve estar alinhado a esquerda dentro da barra azul', () => {
      cy.get(FACEBOOK_LOGOTIPO_SELECTOR).should('be.leftAligned', '.top-bar');
    });

    it('Deve existir um elemento img com a classe facebook-logo', () => {
      cy.get(FACEBOOK_LOGOTIPO_SELECTOR).should('exist');
    });
    
    it('O atributo src do logotipo deve apontar para ./imgs/facebook-logo.png', () => {
      cy.get(FACEBOOK_LOGOTIPO_SELECTOR).should('have.attr', 'src').should('equal','./imgs/facebook-logo.png')
    });
  });

  describe('A barra superior deve conter um formulário de autenticação no canto direito', () => {
    it('O formulário deve estar alinhado a direita dentro da barra azul', () => {
      cy.get(FACEBOOK_LOGIN_FORM_SELECTOR).should('be.rightAligned', '.top-bar');
    });

    it('Existe formulário possui uma classe chamada facebook-login', () => {
      cy.get(FACEBOOK_LOGIN_FORM_SELECTOR).should('exist');
    });

    it('O formulário deve ser um flex container', () => {
      cy.get(FACEBOOK_LOGIN_FORM_SELECTOR).should('have.css', 'display', 'flex');
    });
  });

  describe('Crie uma classe no CSS chamada form-group', () => {
    it('Essa classe deve possuir a propriedade `diplay: flex`', () => {
      cy.get('.form-group').should('have.css', 'display', 'flex');
    });

    it('Alinhe o eixo principal dessa classe para ser o eixo vertical', () => {
      cy.get('.form-group').should('have.css', 'flex-direction', 'column');
    });
  });

  describe('Dentro do formulário criado anteriormente, adicione o primeiro subcontainer do formulário para o campo "E-mail ou telefone"', () => {
    it('Deve haver um container utilizando a classe `form-group` criada no passo anterior', () => {
      cy.get('form.facebook-login').children().first()
        .should('exist')
        .should('have.class', 'form-group')
    });
  
    it('Dentro do container `form-group` criado, deve haver um rótulo com o id user-email-phone-label e o texto "Email ou telefone"', () => {
      cy.get(USER_IDENTIFIER_LABEL_SELECTOR).parent().should('have.class', 'form-group');

      cy.get(USER_IDENTIFIER_LABEL_SELECTOR)
        .should('exist')
        .should('have.text', USER_IDENTIFIER_LABEL_TEXT_SELECTOR);
    });

    it('Dentro do container `form-group` criado, abaixo do rótulo deve haver campo de entrada de texto para receber o email ou o telefone do usuário com o id user-email-phone', () => {
      cy.get(USER_IDENTIFIER_INPUT_SELECTOR).should('exist');
      
      cy.get(USER_IDENTIFIER_INPUT_SELECTOR).parent().should('have.class', 'form-group');

      checkIsBelowOf(USER_IDENTIFIER_LABEL_SELECTOR, USER_IDENTIFIER_INPUT_SELECTOR);
    });
  });

  describe('Dentro do formulário criado anteriormente, adicione o segundo subcontainer do formulário para o campo "Senha"', () => {
    it('Deve haver um novo container utilizando a classe `form-group` criada no passo 4', () => {
      cy.get("form.facebook-login > .form-group").eq(1).should('exist');
    });
  
    it('Dentro do novo container `form-group` criado, deve haver um rótulo com o id user-password-label e o texto "Senha"', () => {
      cy.get("form.facebook-login .form-group label#user-password-label")
        .should('exist')
        .should('have.text', USER_PASSWORD_LABEL_TEXT_SELECTOR);
    });

    it('Dentro do novo container `form-group` criado, abaixo do rótulo deve haver campo de entrada para senha com o id user-password', () => {
      cy.get("form.facebook-login .form-group input#user-password").should('exist');

      checkIsBelowOf(USER_PASSWORD_LABEL_SELECTOR, USER_PASSWORD_INPUT_SELECTOR);

    });
  });

  describe('Crie uma classe no CSS chamada form-control', () => {
    it('Essa classe deve possuir a propriedade `align-self: flex-end`', () => {
      cy.get('.form-control').should('have.css', 'align-self', 'flex-end');
    });
  });

  describe('Dentro do formulário criado anteriormente, adicione o terceiro subcontainer para o botão de login', () => {
    it('Deve haver um novo container utilizando a classe `form-control` criada no passo anterior`', () => {
      cy.get("form.facebook-login > .form-control").eq(0).should('exist');
    });

    it('Dentro do novo container `form-control` criado, deve haver um botão com o id "button-login" e o texto "Entrar"', () => {
      cy.get("form.facebook-login .form-control #button-login")
        .should('exist')
        .should('have.text', 'Entrar');

        checkIsRightOf(USER_PASSWORD_INPUT_SELECTOR, USER_LOGIN_BUTTON_SELECTOR);
    });

    it('O botão deve estar alinhado a direita do campo de entrada para senha', () => {
      checkIsRightOf(USER_PASSWORD_INPUT_SELECTOR, USER_LOGIN_BUTTON_SELECTOR);
    });

    it('Ao clicar no botão com o id #button-login deve exibir um alert com o valor do campo "Email ou telefone"', () => {
      const content = 'my-user';
      let alerted = false;
  
      cy.on('window:alert', (text) => {
        expect(text).to.equal(content);
        alerted = true;
      });

  
      cy.get(USER_IDENTIFIER_INPUT_SELECTOR).type(content);
      cy.get(USER_LOGIN_BUTTON_SELECTOR)
        .should('exist')
        .should('have.text', 'Entrar')
        .click().then(()=> {
          expect(alerted).to.eq(true);
        });
    });
  });


  describe("Crie agora o conteúdo abaixo da barra superior com os seguintes itens", () => {
    it('Crie um elemento após a barra lateral com a classe main-content (deve ser um flex container) ', () => {
      cy.get('.main-content').should('have.css', 'display', 'flex');

      checkIsBelowOf('.top-bar', '.main-content');
    });

    it("Crie dois elementos container para organizar o conteúdo de cada lado", () => {
      cy.get('.main-content').children().eq(0).should('exist');
      cy.get('.main-content').children().eq(1).should('exist');
      cy.get('.main-content').children().eq(2).should('not.exist');
    });

    it('Utilize na classe main-content a propriedade justify-content com o valor mais apropriado para alinhar os conteúdos', () => {
      cy.get('.main-content').should('have.css', 'justify-content');
    });

    it('Dentro do primeiro container existe um parágrafo com id facebook-slogan e o texto "O Facebook ajuda você a se conectar e compartilhar com as pessoas que fazem parte da sua vida."', () => {
      cy.get('.main-content').children().eq(0).get('#facebook-slogan').contains(FACEBOOK_SLOGAN);
    });

    it('Dentro do primeiro container, abaixo do texto do passo anterior existe uma imagem com id facebook-networking.', () => {
      cy.get('.main-content').children().eq(0).get(FACEBOOK_NETWORKING_IMG_SELECTOR)
        .should('exist')
        .should(($el) => {
          const src = $el.attr('src');
          expect(src).to.match(/networking/);
        });

      checkIsBelowOf(FACEBOOK_SLOGAN_SELECTOR, FACEBOOK_NETWORKING_IMG_SELECTOR);
    });

    it('Dentro do segundo container, existe um texto "Abra uma conta"', () => {
      cy.get('.main-content').children().eq(1).children().eq(0).contains(OPEN_ACCOUNT_MESSAGE);
    });

    it('Dentro do segundo container, existe abaixo do texto anterior um outro texto "É rápido e fácil." posicionado abaixo do texto "Abra uma conta"', () => {
      cy.get('.main-content').children().eq(1).children().eq(1).contains(QUICK_AND_SIMPLE_MESSAGE);
    });

    it('Ainda dentro do segundo container, abaixo do texto anterior crie um elemento form', () => {
      cy.get('.main-content').children().eq(1).children().eq(2).get('form').should('exist')
    });
  });

  describe("Crie um campo de entrada de texto para o nome do usuário dentro do formulário criado no requisito 9", () => {
    it('O campo deve ter o atributo name com o valor "firstname"', () => {
      cy.get('.main-content form input[name="firstname"]').should('exist');    
    });

    it('O campo deve ter um placeholder com o valor "Nome"', () => {
      cy.get('.main-content form input[name="firstname"]').should('have.attr', 'placeholder', 'Nome');
    });
  });

  describe("Crie um campo de entrada de texto para o sobrenome do usuário dentro do formulário criado no requisito 9", () => {
    it('O campo deve ter o atributo name com o valor "lastname"', () => {
      cy.get('.main-content form input[name="lastname"]').should('exist');    
    });

    it('O campo deve ter um placeholder com o valor "Sobrenome"', () => {
      cy.get('.main-content form input[name="lastname"]').should('have.attr', 'placeholder', 'Sobrenome');
    });

    it('Esse campo deve estar alinhado a direita do campo de Nome', () => {
      checkIsRightOf('.main-content form input[name="firstname"]', '.main-content form input[name="lastname"]')
    });
  });

  

  // describe("Crie um campo de entrada de texto para o sobrenome do usuário dentro do formulário criado no requisito 9", () => {
  //   it('Um campo de entrada de texto para o sobrenome do usuário. Posicione esse campo à direita do campo nome', () => {
  //     cy.get(ALL_INPUT_SELECTOR)
  //       .then(($inputs) => {
  //         const elements = $inputs.toArray();
  //         expect(checkPlaceholder(elements, 'Sobrenome')).to.be.true;
  //       });
  //   });

  //   it('Posicione esse campo à direita do campo nome', () => {
  //     checkIsRightOf()
  //   });
  // });

  // it('Um campo de entrada de texto para o celular ou email. Posicione esse campo abaixo do sobrenome do usuário', () => {
  //   cy.get(ALL_INPUT_SELECTOR)
  //     .then(($inputs) => {
  //       const elements = $inputs.toArray();
  //       expect(checkPlaceholder(elements, 'Celular ou email')).to.be.true;
  //     });
  //   // assert position
  // });

  // it('Um campo de entrada de texto para a nova senha do usuário. Posicione esse campo abaixo do celular/email', () => {
  //   cy.get(ALL_PASSWORD_INPUT_SELECTOR)
  //     .then(($inputs) => {
  //       const elements = $inputs.toArray();
  //       expect(checkPlaceholder(elements, 'Nova senha')).to.be.true;
  //     });
  //   // assert position
  // });

  // it('Um texto "Data de nascimento" abaixo do campo de entrada de texto de nova senha', () => {
  //   cy.contains(BIRTHDATE_TITLE);
  //   // assert position
  // });

  // it('Um campo para selecionar a data de nascimento', () => {
  //   cy.get(ALL_INPUT_SELECTOR)
  //     .then(($inputs) => {
  //       const elements = $inputs.toArray();
  //       expect(checkPlaceholder(elements, 'dd/mm/aaaa')).to.be.true;
  //     });
  // });

  // it('Um texto "Gênero" abaixo dos campos de data', () => {
  //   cy.contains(GENDER_TITLE);
  // });

  // it('Três `radio buttons` com os nomes "Feminino", "Masculino" e "Personalizado"', () => {
  //   cy.get("input[type='radio']")
  //     .should(($radios) => {
  //       expect($radios).to.have.length(GENRES.length);
  //       $radios.each((index, radio) => {
  //         expect(Cypress.$(radio).val()).to.equal(GENRES[index]);
  //       });
  //     });
  // });

  // it('Um botão com o texto "Cadastre-se" e id "facebook-register"', () => {
  //   cy.get(REGISTER_BUTTON_SELECTOR)
  //     .should('exist')
  //     .click();
  // });
});
