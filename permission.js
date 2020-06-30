checkPermission = (requestRole, role) => {
    if(requestRole !== role.toLowerCase()) {
        throw 'You have no permission';
    }
}

module.exports = checkPermission;