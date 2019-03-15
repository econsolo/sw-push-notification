

class UsuarioDTO:
    id: 0
    nome: None
    email: None
    login: None
    senha: None
    is_ativo: False
    push_object: None

    @staticmethod
    def converter_lista(dados):
        usuarios = []

        for u in dados:
            usuario = UsuarioDTO()
            usuario.id = u.id
            usuario.nome = u.nome
            usuario.email = u.email
            usuario.login = u.login
            usuario.senha = None
            usuario.is_ativo = u.is_ativo
            usuario.push_object = u.push_object
            usuarios.append(usuario.to_dict())

        return usuarios

    @staticmethod
    def converter(u):
        usuario = UsuarioDTO()
        usuario.id = u.id
        usuario.nome = u.nome
        usuario.email = u.email
        usuario.login = u.login
        usuario.senha = None
        usuario.is_ativo = u.is_ativo
        usuario.push_object = u.push_object

        return usuario

    def to_dict(self):
        return self.__dict__
