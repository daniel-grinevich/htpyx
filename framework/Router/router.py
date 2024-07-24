from urls import routes


class Router:
    def __init__(self):
        self.routes = routes

    def get_handler(self, path):
        if path.startswith("/static/"):
            return self.routes.get("/static/", None)
        return self.routes.get(path, None)
