const formTemplate = {
    tag: "form",
    cls: ["form", ],
    attrs: {
        action: "",
        method: "GET",
        novalidate: true,
    },
    content: [
        {
            tag: "div",
            cls: ["form__field", "form__field_page-one-two", ],
            content: [
                {
                    tag: "div",
                    cls: ["replaceable_pin", ],
                },
            ],
        },
        {
            tag: "div",
            cls: ["form__field", "form__field_page-one-two", ],
            content: [
                {
                    tag: "button",
                    cls: ["form__button", "form__button_create", ],
                    attrs: {
                        type: "button"
                    },
                    content: ["Создать новый Пин-код"],
                },
            ],
        },
        {
            tag: "div",
            cls: ["form__field", "form__field_page-one-two", ],
            content: [
                {
                    tag: "button",
                    cls: ["form__button", "form__button_submit", "form__hidden", ],
                    attrs: {
                        type: "submit"
                    },
                    content: ["Войти"],
                },
            ],
        },
        {
            tag: "div",
            cls: ["form__field", "form__field_page-three", "form__hidden", ],
            content: [
                {
                    tag: "h2",
                    cls: ["form__title", ],
                    content: ["Поздравляю!"],
                },
                {
                    tag: "p",
                    cls: ["form__text", ],
                    content: [
                        "Пин-код",
                        {
                            tag: "span",
                            cls: ["form__text", "form__text_pin", ],
                            content: ["123456", ],
                        },
                        "правильный",
                    ],
                },
            ],
        },

    ],
};
