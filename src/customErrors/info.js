export const generateUserErrorInfo = (user) => {
    return `One or more of the user's fields are invalid.
    List of required properties:
    * first_name : needs to be a string, received ${user.first_name}
    * last_name : needs to be a string, received ${user.last_name}
    * email : needs to be a string, received ${user.email}`
    
}
