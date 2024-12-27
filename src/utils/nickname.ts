const validateNickname = (nick: string): boolean => {
    const regex = /^[a-z0-9]+([_][a-z0-9]+)*[_]?$/;
    const nickname = nick.toLowerCase();
    
    return regex.test(nickname);
}

export default validateNickname;