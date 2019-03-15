import bcrypt


def criptografa_senha(password):
    hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hash.decode('utf-8')


def senha_valida(password, hashed):
    try:
        return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
    except Exception as ex:
        # pode ocorrer uma exceção se o salt for inválido (segundo parametro informado)
        # isso irá acontecer se a senha que estiver no banco não tiver sido criptografada de forma correta
        # não devemos nos preocupar, pois isso é um erro de desenvolvimento
        print(ex)
        return False
