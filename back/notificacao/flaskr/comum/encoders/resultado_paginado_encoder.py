from flask.json import JSONEncoder
from flaskr.util.resultado_paginado import ResultadoPaginado


class ResultadoPaginadoEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ResultadoPaginado):
            return {
                'total': obj.total,
                'registros': obj.registros
            }
        return super(ResultadoPaginadoEncoder, self).default(obj)
