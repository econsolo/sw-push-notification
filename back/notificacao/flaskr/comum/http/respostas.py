from flask import jsonify
from enum import Enum


class Ok:

    def __init__(self, data):
        self.data = data

    def to_json(self):
        return jsonify(self.__dict__), 200


class ErrorTypes(Enum):
    VALIDATION = 'validation'
    SERVER = 'server'


class ErroBase:

    def __init__(self, errors, type, status_code):
        self.errors = errors
        self.type = type.value
        self.status_code = status_code

    def to_json(self):
        return jsonify(self.__dict__), self.status_code


class BadRequest(ErroBase):

    def __init__(self, errors, type=ErrorTypes.VALIDATION):
        super().__init__(errors, type, 400)


class Unauthorized(ErroBase):
    def __init__(self, errors):
        super().__init__(errors, ErrorTypes.SERVER, 401)
