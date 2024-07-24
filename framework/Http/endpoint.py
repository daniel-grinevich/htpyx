import json
from http import HTTPStatus

DEFAULT_CONTENT_TYPES = ["application/json", "text/html"]


class Request:
    def __init__(self, environ):
        for key, value in environ.items():
            setattr(self, key.replace(".", "_"), value)


class Response:
    def __init__(
        self,
        content_type=None,
        body=None,
        status: HTTPStatus = None,
    ):
        self.content_type = content_type
        self.body = body
        self.status = status or HTTPStatus.OK
        self.status = f"{int(self.status)} {self.status.phrase}"

    def as_bytes(self):
        if self.content_type not in DEFAULT_CONTENT_TYPES:
            raise ValueError("Invalid content type")

        conversion = {
            "application/json": json.dumps,
            "text/html": lambda body: body,
        }
        body = conversion[self.content_type](self.body).encode("utf-8")
        return [body]

    def wsgi_response(self):
        body = self.as_bytes()
        length = sum(len(b) for b in body)
        headers = [
            ("Content-Type", self.content_type),
            ("Content-Length", str(length)),
        ]
        return (self.status, headers, body)


class EndPoint:
    def get(self, request: Request) -> Response:
        return Response(
            body={"cars": ["Dodge", "Honda", "Kia", "Toyota"]},
            status=HTTPStatus.OK,
            content_type="application/json",
        )

    def post(self, request: Request) -> Response:
        payload = json.loads(request.wsgi_input.read())
        new_car = payload["car"]

        return Response(
            body={"cars": [new_car, "Dodge", "Honda", "Kia", "Toyota"]},
            status=HTTPStatus.CREATED,
            content_type="application/json",
        )
