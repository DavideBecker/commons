module.exports = {
    addUser: "INSERT INTO users (username, hash, salt) VALUES (?, ?, ?)",
    getUserByName: "SELECT * FROM users WHERE username=?",
    getAllPermissionsByUserID: "SELECT roles.label AS role, resource_types.label AS resource, permission_levels.label AS permission FROM roles INNER JOIN map_access ON roles.id = map_access.role_id INNER JOIN resource_types ON map_access.resource_type_id = resource_types.id INNER JOIN permission_levels ON map_access.permission_level_id = permission_levels.id INNER JOIN map_users_roles ON map_access.role_id = map_users_roles.role_id INNER JOIN users ON map_users_roles.user_id = users.id WHERE users.id = ?"
}