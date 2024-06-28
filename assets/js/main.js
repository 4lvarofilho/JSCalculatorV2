function createCalculator() {
  return {
    display: document.querySelector('.display'),

    init() {
      this.clickButtons();
      this.pressBackspace();
      this.pressEnter();
    },

    pressBackspace() {
      this.display.addEventListener('keydown', e => {
        if (e.keyCode === 8) {
          e.preventDefault();
          this.clearDisplay();
        }
      });
    },

    pressEnter() {
      this.display.addEventListener('keyup', e => {
        if (e.keyCode === 13) {
          this.performCalculation();
        }
      });
    },

    performCalculation() {
      let expression = this.display.value;

      try {
        expression = eval(expression);

        if (!expression) {
          alert('Conta inválida');
          return;
        }

        if (!isFinite(expression)) {
          alert('Divisão por zero não é permitida');
          return;
        }

        this.display.value = String(expression);
      } catch (e) {
        alert('Conta inválida');
        return;
      }
    },

    clearDisplay() {
      this.display.value = '';
    },

    deleteOne() {
      this.display.value = this.display.value.slice(0, -1);
    },

    clickButtons() {
      document.addEventListener('click', e => {
        const el = e.target;

        if (el.classList.contains('btn-num')) {
          this.addToDisplay(el.innerText);
        }

        if (el.classList.contains('btn-clear')) {
          this.clearDisplay();
        }

        if (el.classList.contains('btn-del')) {
          this.deleteOne();
        }

        if (el.classList.contains('btn-eq')) {
          this.performCalculation();
        }

        this.display.focus();
      });
    },

    addToDisplay(value) {
      this.display.value += value;
    },
  };
}

const calculator = createCalculator();
calculator.init();
