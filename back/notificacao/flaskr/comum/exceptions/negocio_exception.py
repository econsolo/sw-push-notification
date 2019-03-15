class NegocioException(Exception):

    def __init__(self, args):
        '''
        args pode ser a exceção que ocasionou o problema, ou apenas uma mensagem
        '''

        # Call the base class constructor with the parameters it needs
        super().__init__(args)
