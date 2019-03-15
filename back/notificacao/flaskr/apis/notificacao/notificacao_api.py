from flask import Blueprint, request, current_app as app
from flaskr.comum.decorators import acesso_restrito, get_erros
from flaskr.comum.http import Ok
from pywebpush import webpush
from flaskr.models.usuario import Usuario
import json as json_convert

bp = Blueprint('notificacao', __name__, url_prefix='/api/notificacao')


@bp.route('/notificar/<int:id_usuario>', methods=['POST'])
@acesso_restrito
@get_erros
def notificar(id_usuario):
    usuario = Usuario.por_id(id_usuario)
    json = request.get_json()
    webpush(
        # Objeto recebido no momento que o usuário aceita receber as notificações
        # deverá ser no formato de dict
        subscription_info=json_convert.loads(usuario.push_object),

        # Corpo da notificação, para uma notificação simples, utilize o padrão abaixo
        # "notification":{
        #    "title":"Portugal vs. Denmark",
        #    "body":"great match!"
        #  }
        # deverá ser um json serializado
        data=json.get('notificacao'),

        # A Chave privada gerada anteriormente com o web-push generate-vapid-keys --json
        vapid_private_key=app.config['VAPID_PRIVATE_KEY'],

        # Dict obrigatório para a autorização
        # https://github.com/web-push-libs/vapid/tree/master/python
        # para maiores informações
        vapid_claims={
            "sub": "mailto:erick.consolo@simples.software"
        }
    )

    return Ok(True).to_json()
