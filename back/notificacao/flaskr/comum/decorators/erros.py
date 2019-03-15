import sys, traceback
from functools import wraps
from flask import (
    request, current_app, g
)
from flaskr.comum.http import (
    BadRequest, Unauthorized, ErrorTypes
)
from flaskr import db
import jwt

def get_erros(f):
    """
    Esse decorator deve ser o mais externo (com exceção do @acesso_restrito), por exemplo:

    @acesso_restrito    
    @get_erros
    @transacional
    def metodo_api():
        ...
    """
    @wraps(f)
    def decorado(*args, **kwargs):
        try:
            result = f(*args, **kwargs)
        except Exception as ex:
            traceback.print_exc(file=sys.stdout)
            # caso ocorra uma exceção, tratamos e lançamos de uma maneira amigável
            return BadRequest(str(ex)).to_json()
        
        return result

    return decorado
