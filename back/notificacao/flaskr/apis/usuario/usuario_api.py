from flask import Blueprint, request, g
from flaskr.apis.usuario.filtro_usuario_dto import FiltroUsuarioDTO
from flaskr.apis.usuario.usuario_dto import UsuarioDTO
from flaskr.comum.decorators import acesso_restrito, get_erros, transacional
from flaskr.comum.http import Ok
from flaskr.models.usuario import Usuario
from flaskr.util import criptografa_senha

bp = Blueprint('usuario', __name__, url_prefix='/api/usuario')


@bp.route('/<int:id_usuario>', methods=['GET'])
@acesso_restrito
@get_erros
def por_id(id_usuario):
    usuario = Usuario.por_id(id_usuario)
    return Ok(UsuarioDTO.converter(usuario).to_dict()).to_json()


@bp.route('', methods=['POST'])
@acesso_restrito
@get_erros
@transacional
def salvar():
    json = request.get_json()
    usuario = Usuario.from_json(json)
    usuario.inserir()

    return Ok(usuario.id).to_json()


@bp.route('/<int:id_usuario>', methods=['PUT'])
@acesso_restrito
@get_erros
@transacional
def alterar(id_usuario):
    json = request.get_json()
    usuario_alteracao = Usuario.por_id(id_usuario)
    usuario = Usuario.from_json(json)
    usuario.id = id_usuario
    usuario.senha = criptografa_senha(usuario.senha)
    usuario.is_ativo = usuario_alteracao.is_ativo
    usuario.alterar()

    return Ok(usuario.id).to_json()


@bp.route('/toggle-ativo/<int:id>', methods=['PUT'])
@acesso_restrito
@get_erros
@transacional
def toggle_ativo(id):
    json = request.get_json()
    usuario = Usuario.por_id(id)
    usuario.is_ativo = json.get('is_ativo')
    usuario.alterar()

    return Ok(usuario.id).to_json()


@bp.route('/consultar', methods=['POST'])
@acesso_restrito
@get_erros
def consultar():
    json = request.get_json()
    filtro = FiltroUsuarioDTO(json.get('pagina'), json.get('tamanho_pagina'))
    filtro.nome = json.get('nome')
    filtro.login = json.get('login')
    usuarios = Usuario.consultar(filtro)

    return Ok(usuarios.to_dict()).to_json()


@bp.route('/toggle-assinar', methods=['POST'])
@acesso_restrito
@get_erros
@transacional
def toggle_assinar():
    json = request.get_json()
    usuario = Usuario.por_id(g.token_data.get('id'))
    if json.get('resposta'):
        usuario.push_object = json.get('push_object')
    else:
        usuario.push_object = None
    usuario.alterar()

    return Ok(usuario.id).to_json()
