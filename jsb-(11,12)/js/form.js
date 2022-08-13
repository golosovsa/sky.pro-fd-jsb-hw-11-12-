class Form {
    constructor(parent, identify, successfulEvent) {
        this.element = templateEngine(formTemplate);
        this.identify = identify;
        this.successfulEvent = successfulEvent
        const replaceable = this.element.querySelector(".replaceable_pin");
        this.pin = new Pin(replaceable, "pin_" + identify);

        this.showPageOneAndTwo();

        const createButton = this.element.querySelector(".form__button_create");
        createButton.addEventListener("click", this.onCreateClick.bind(this));

        const submitButton = this.element.addEventListener("submit", this.onSubmit.bind(this));

        parent.appendChild(this.element);
    }

    showPageOneAndTwo(withoutEvents=false) {
        if (this.pin.isCodeExist()) {
            const submit = this.element.querySelector(".form__button_submit");
            submit.classList.remove("form__hidden"); 
        }

        const pageThree = this.element.querySelector(".form__field_page-three");
        pageThree.classList.add("form__hidden");

        const pagesOneAndTwo = this.element.querySelectorAll(".form__field_page-one-two");
        pagesOneAndTwo.forEach(page => {
            page.classList.remove("form__hidden");    
        });

        if (withoutEvents) {
            return;
        }

    }

    showPageThree() {
        const pageThree = this.element.querySelector(".form__field_page-three");
        pageThree.classList.remove("form__hidden");

        console.log(pageThree.classList);

        const pagesOneAndTwo = this.element.querySelectorAll(".form__field_page-one-two");
        pagesOneAndTwo.forEach(page => {
            page.classList.add("form__hidden");    
        });
    }

    onCreateClick(event) {
        if (!this.pin.checkPin()) {
            this.pin.highlightErrors();

            const errorPopup = new Popup(
                this.element,
                "Неправильный ввод", 
                {
                    left: "24px", 
                    right: "auto", 
                    top: "16px",
                    bottom: "auto",
                }, 
                3000,
            );
        } else {
            this.pin.saveCode();
            this.showPageOneAndTwo(true);
        }
    }

    onSubmit(event) {
        event.preventDefault();

        if (!this.pin.checkPin()) {
            return;
        }

        if (!this.successfulEvent || !this.successfulEvent()) {
            const errorPopup = new Popup(
                this.element,
                "Неверный пин-код", 
                {
                    left: "24px", 
                    right: "auto", 
                    top: "16px",
                    bottom: "auto",
                }, 
                3000,
            );
            return;
        }
        const textPin = this.element.querySelector(".form__text_pin");
        textPin.textContent = this.pin.code.join("");
        this.showPageThree();
    }
}