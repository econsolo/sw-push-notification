from functools import wraps
from flaskr import db


def transacional(f):
    @wraps(f)
    def decorado(*args, **kwargs):
        try:
            result = f(*args, **kwargs)
            db.session.commit()
        except:
            db.session.rollback()
            raise

        return result

    return decorado
