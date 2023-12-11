const getUserById = async (userId) => {
    try {
        const user = await UserModel.findById(userId);
        return user;
    } catch (err) {
        console.error(err);
        return null
    }
}

const verifyUserCsrf = async (user, csrfToken) => {
    return user.csrf === csrfToken;
}

module.exports = {
    getUserById,
    verifyUserCsrf
}
