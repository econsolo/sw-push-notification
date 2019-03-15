from flask import Blueprint, request, current_app as app
from flaskr.comum.http import BadRequest, Ok
from flaskr.models.usuario import Usuario
from .validador import AuthValidator
import datetime
import jwt

bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('', methods=['POST'])
def logar():

    validator = AuthValidator(**request.get_json())
    if validator.validate():

        usuario = Usuario.get_por_login(validator.login_value())

        if usuario is None or not usuario.is_senha_valida(validator.senha_value()):
            return BadRequest('Usuário e/ou senha inválido(s)').to_json()

        if not usuario.is_ativo:
            return BadRequest('Usuário bloqueado').to_json()

        # dados que queremos retornar junto ao token
        token_data = {
            'id': usuario.id,
            'nome': usuario.nome,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=app.config['VALIDADE_TOKEN_EM_MINUTOS'])
        }
        token = jwt.encode(token_data, app.config['SECRET_KEY'])
        return Ok(token.decode('UTF-8')).to_json()
    else:
        return BadRequest(validator.errors).to_json()
