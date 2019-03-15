
class Paginacao:

    inicio = None
    fim = None
    campo_ordenacao = None
    tipo_ordenacao = 'asc'

    def __init__(self, pagina_atual, tamanho_pagina):
        pagina_atual, tamanho_pagina = int(pagina_atual) + 1, int(tamanho_pagina)

        self.inicio = (pagina_atual - 1) * tamanho_pagina
        self.fim = pagina_atual * tamanho_pagina
