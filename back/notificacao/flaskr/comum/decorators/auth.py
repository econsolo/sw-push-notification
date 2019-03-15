from functools import wraps
from flask import request, current_app, g
import jwt
from flaskr.comum.http import BadRequest, Unauthorized, ErrorTypes


def acesso_restrito(f):
    @wraps(f)
    def decorado(*args, **kwargs):
        # tenta recuperar o token do header
        # as requisições autenticadas devem ter o cabeçalho 
        # Authorization: Bearer <token>
        authorization = request.headers.get('Authorization')
        
        if not authorization:
            return BadRequest('É necessário informar um token para acessar esse recurso', ErrorTypes.SERVER).to_json()

        try:
            token = jwt.decode(authorization.replace('Bearer ', ''), current_app.config['SECRET_KEY'])
            # coloca os dados do token em um objeto global, que pode ser acessado em qualquer contexto
            g.token_data = token
        except:
            return Unauthorized('O token informado é inválido').to_json()
        
        return f(*args, **kwargs)

    return decorado
