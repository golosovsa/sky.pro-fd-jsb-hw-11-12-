class Pin {
    constructor (element, identify) {
        const parent = element.parentElement;

        this.element = templateEngine(pinTemplate);
        this.identify = identify;
        this.code = null;
        this.loadCode()

        this.element.addEventListener("input", this.onKeyDownBubbling.bind(this), true);
        this.element.addEventListener("drop", this.onPasteBubbling.bind(this), true);

        parent.replaceChild(this.element, element);

        this.fillPinsIfCodeExist();
    }

    loadCode() {
        const codeString = localStorage.getItem(`code_${this.identify}`); 
        this.code = codeString ? codeString.split("") : null;
    }

    saveCode() {
        if (this.code || Array.isArray(this.code)) {
            localStorage.setItem(`code_${this.identify}`, this.code.join(""));
        }
    }

    isCodeExist() {
        return Boolean(this.code);
    }

    fillPinsIfCodeExist() {
        if (!this.isCodeExist()) {
            return;
        }
        for (let index = 0; index < Math.min(this.code.length, this.element.childElementCount); index++) {
            this.element.children[index].value = this.code[index];
        }
    }

    checkKey(key) {
        if (!key || key.length > 1 || key < "0" || key > "9") {
            return false;
        }
        return true;
    }

    checkPin() {
        let pinCode = []
        for (const pin of this.element.children) {
            const key = pin.value;
            if (!this.checkKey(key)) {
                return false;
            }
            pinCode.push(key);
        }
        this.code = pinCode;
        return true;
    }

    onKeyDownBubbling(event) {
        event.preventDefault();
        event.stopPropagation();

        const key = event.key;

        if (!this.checkKey(key)) {
            return;
        }

        const target = event.target;
        const parent = target.parentElement;
        const next = target.nextElementSibling || parent.firstElementChild;
        
        target.value = key;
        target.classList.remove("pin_highlight-error");
        next.focus();
    }

    onPasteBubbling(event) {
        event.preventDefault();
        event.stopPropagation();

        const dataNumber = parseFloat(event.dataTransfer.getData("text"));

        if (!Number.isInteger(dataNumber) || dataNumber < 0) {
            return;
        } 

        console.log(dataNumber);

        const data = dataNumber.toString();
        const pins = data.split("");

        for (let index = 0; index < Math.min(pins.length, this.element.childElementCount); index++) {
            this.element.children[index].value = pins[index];
        }
    }

    highlightErrors() {
        this.element.childNodes.forEach(node => {
            if (node.value === "") {
                node.classList.add("pin_highlight-error");
            } else {
                node.classList.remove("pin_highlight-error");
            }
        });
    }

    hideErrors() {
        this.element.childNodes.forEach(node => {
            node.classList.remove("pin_highlight-error");
        });
    }

    getFirstPin() {
        return this.element.firstElementChild;
    }
}