from sqlalchemy import desc

from flaskr import db
from flaskr.apis.usuario.usuario_dto import UsuarioDTO
from flaskr.util import senha_valida, criptografa_senha
from flaskr.util.resultado_paginado import ResultadoPaginado


class Usuario(db.Model):
    __tablename__ = 'usuario'
    __table_args__ = {'schema': 'public'}

    id = db.Column('id_usuario', db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    login = db.Column(db.String(25), nullable=False, unique=True)
    senha = db.Column(db.String(50), nullable=False)
    is_ativo = db.Column(db.Boolean, nullable=False)
    push_object = db.Column(db.String(9000), nullable=True)

    @classmethod
    def todos(cls):
        return cls.query.all()

    @classmethod
    def por_id(cls, id):
        return cls.query.filter(cls.id == id).first()

    def inserir(self):
        self.senha = criptografa_senha(self.senha)
        self.is_ativo = True
        if self.get_por_login(self.login) is not None:
            raise Exception('Login em uso: ' + self.login)
        db.session.add(self)

    def alterar(self):
        db.session.merge(self)

    @classmethod
    def consultar(cls, filtro):
        query = cls.query
        if filtro.nome:
            query = query.filter(cls.nome.ilike('%' + filtro.nome + '%'))
        if filtro.login:
            query = query.filter(cls.login.ilike('%' + filtro.login + '%'))

        query = query.order_by(desc(cls.id))

        return ResultadoPaginado(query, filtro, UsuarioDTO.converter_lista)

    @classmethod
    def get_por_login(cls, login):
        return cls.query.filter(cls.login.ilike(login)).first()

    def is_senha_valida(self, senha_informada):
        # a senha que está no banco está criptografada
        hashed = self.senha
        return senha_valida(senha_informada, hashed)

    @staticmethod
    def from_json(json):
        usuario = Usuario()
        usuario.id = json.get('id')
        usuario.nome = json.get('nome')
        usuario.email = json.get('email')
        usuario.login = json.get('login')
        usuario.senha = json.get('senha')
        usuario.is_ativo = json.get('is_ativo') if json.get('is_ativo') is not None else True
        return usuario

    def __repr__(self):
        return '<Usuario %r>' % self.login
