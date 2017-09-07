const notEmpty = (title, value) => {
    if (_.isEmpty(value)) {
        return `请填写${title}`;
    }
    return null;
};

const maxLength = (title, value, validationItem) => {
    if (!_.isEmpty(value) && value.length > validationItem.maxLength) {
        return `输入字符长度不能超过${validationItem.maxLength}`;
    }
    return null;
};

export {notEmpty, maxLength};