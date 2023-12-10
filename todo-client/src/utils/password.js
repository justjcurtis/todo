export const checkPassword = (password) => {
    const has2Numbers = !!password.match(/[0-9].*[0-9]/);
    const has2Capitals = !!password.match(/[A-Z].*[A-Z]/);
    const has2Lowercase = !!password.match(/[a-z].*[a-z]/);
    const has1Symbol = !password.match(/^[a-zA-Z0-9]*$/);
    return has2Numbers && has2Capitals && has2Lowercase && has1Symbol && password.length >= 8;
}
