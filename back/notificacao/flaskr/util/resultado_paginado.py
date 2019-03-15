
class ResultadoPaginado:

    total = None
    registros = None

    def __init__(self, query, paginacao, conversor_lista):
        self.total = query.count()
        self.registros = conversor_lista(
            query.slice(paginacao.inicio, paginacao.fim).all())

    def to_dict(self):
        return self.__dict__
