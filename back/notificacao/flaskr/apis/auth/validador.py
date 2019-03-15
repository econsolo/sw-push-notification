from wtforms import StringField, Form
from wtforms.validators import DataRequired


class AuthValidator(Form):

  login = StringField('login', validators=[DataRequired("Campo obrigatório")])
  senha = StringField('senha', validators=[DataRequired("Campo obrigatório")])

  def login_value(self):
    return self.login.data

  def senha_value(self):
    return self.senha.data
