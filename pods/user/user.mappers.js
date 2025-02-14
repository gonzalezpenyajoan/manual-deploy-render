export const mapUserFromModelToApi = (user) => ({
    email: user.email,
    role: user.role,
    avatar: user.avatar
});
