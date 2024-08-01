import os
from http import HTTPStatus
import mimetypes

# DATABASE CONNECTION
DATABASE = {
    "port": "8000",
    "name": "",
}

DATABASE_DIR = os.path.join(str(os.path.dirname(__file__)), "database")
# TEMPLATE DIRECCTORY
TEMPLATE_DIR = os.path.join("templates")


STATIC_DIR = os.path.join(str(os.path.dirname(__file__)), "static")
STATIC_URL = "/static/"


class StaticHandler:
    def __init__(self, request):
        self.request = request
        self.static_dir = STATIC_DIR

    def dispatch(self, request):
        method = getattr(request, "REQUEST_METHOD", None)
        if hasattr(self, method.lower()):
            handler = getattr(self, method.lower())
            return handler(request)
        else:
            return self.http_method_not_allowed()

    def get(self, request):
        # Extract the relative path and normalize it
        relative_path = os.path.normpath(request.PATH_INFO[len("/static/") :])
        # Construct the full path
        file_path = os.path.join(self.static_dir, relative_path)

        # Security check to prevent directory traversal
        if not file_path.startswith(os.path.abspath(self.static_dir)):
            return self.not_found(request)

        # Check if the file exists and is a file
        if not os.path.isfile(file_path):
            return self.not_found(request)

        # Serve the file
        try:
            with open(file_path, "rb") as f:
                content = f.read()
                content_type, _ = mimetypes.guess_type(file_path)
                content_type = content_type or "application/octet-stream"

                if content_type == "image/png":
                    headers = [
                        ("Content-Type", content_type),
                        ("Content-Length", str(len(content))),
                        ("Cache-Control", "max-age=86400"),
                    ]
                    return "200 OK", headers, content

                return (
                    "200 OK",
                    [("Content-Type", content_type)],
                    content.decode("utf-8"),
                )
        except IOError:
            return self.server_error(request)

    def not_found(self, request):
        """Return a 404 Not Found response."""
        error_message = "<html><body><h1>404 Not Found</h1><p>The requested file was not found on this server.</p></body></html>"
        return (
            HTTPStatus.NOT_FOUND,
            [("Content-Type", "text/html")],
            error_message.encode("utf-8"),
        )

    def server_error(self, request):
        """Return a 500 Internal Server Error response."""
        error_message = "<html><body><h1>500 Internal Server Error</h1><p>An error occurred while handling your request.</p></body></html>"
        return (
            HTTPStatus.INTERNAL_SERVER_ERROR,
            [("Content-Type", "text/html")],
            error_message.encode("utf-8"),
        )
