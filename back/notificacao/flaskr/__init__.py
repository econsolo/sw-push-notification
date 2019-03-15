import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# sub classe para poder customizar parâmetros do driver
# até o momento o Flask SQLAlchemy não suporta uma maneira mais amigável
# ver issue: https://github.com/mitsuhiko/flask-sqlalchemy/issues/120


class MySQLAlchemy(SQLAlchemy):
    def apply_driver_hacks(self, app, info, options):
        options.update({
            'isolation_level': 'REPEATABLE READ',
        })
        super().apply_driver_hacks(app, info, options)


db = MySQLAlchemy()


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    app.config.from_mapping(
        SECRET_KEY='dev'
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_envvar('APP_SETTINGS')
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # database
    db.init_app(app)

    from flaskr.apis.auth import auth_api
    from flaskr.apis.usuario import usuario_api
    from flaskr.apis.notificacao import notificacao_api

    app.register_blueprint(auth_api.bp)
    app.register_blueprint(usuario_api.bp)
    app.register_blueprint(notificacao_api.bp)

    @app.route('/api')
    def check():
        return '<span style="color:green">On!</span>'

    return app
