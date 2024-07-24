import sys
import uuid
import logging
from typing import List
from framework.Http.endpoint import Request
import debugpy
from framework.Router.router import Router
from http import HTTPStatus
from framework.Middleware.middleware import HtmxMiddleware


"""
HTPyX

Technicaly our web framework can handle any type of request as long
as it can handle it. For example Pizza is valid if we can handle it
"""

HELLO_WORLD = b"Hello World!\n"
DEFAULT_CONTENT_TYPES = [
    "application/json",
    "text/html",
    "application/x-www-form-urlencoded",
]


class Micro:
    def __init__(
        self,
        middlewares=[],
        allowed_content_types: List[str] = None,
    ):
        self.middlewares = [HtmxMiddleware]
        self.allowed_content_types = allowed_content_types or DEFAULT_CONTENT_TYPES

    def __call__(self, environ, start_response):
        request = Request(environ)

        content_type = getattr(request, "CONTENT_TYPE", None)

        if content_type is None:
            content_type = "text/html"
        else:
            if content_type not in self.allowed_content_types:
                status = HTTPStatus.UNSUPPORTED_MEDIA_TYPE
                status_code = f"{int(status)} {status.phrase}"
                response_headers = [
                    ("Content-Type", "text/html"),
                    ("Accept", ", ".join(self.allowed_content_types)),
                ]
                start_response(status, response_headers)
                error_message = f"<html><body><h1>{status_code}</h1><p>Unsupported Media Type. Please use one of the following content types: {', '.join(self.allowed_content_types)}</p></body></html>"
                return [error_message.encode("utf-8")]

        for middleware in self.middlewares:
            request = middleware.preprocess_request(request)

        requested_path = getattr(request, "PATH_INFO", None)
        router = Router()
        handler = router.get_handler(requested_path)

        if handler is None:
            status = HTTPStatus.NOT_FOUND
            status_code = f"{int(status)} {status.phrase}"
            response_headers = [
                ("Content-Type", "text/html"),
            ]
            start_response(status_code, response_headers)
            error_message = f"<html><body><h1>{status_code}</h1><p>Route not found.</p></body></html>"
            return [error_message.encode("utf-8")]

        handler = handler(request)
        response = handler.dispatch(request)

        status, headers, body = response

        for middleware in self.middlewares:
            status, headers, body, request = middleware.postprocess_request(
                status, headers, body, request
            )

        start_response(status, headers)  # Start the HTTP response
        return [body.encode("utf-8")]


class RequestIdMiddleware:
    def preprocess_request(self, request):
        request.id = str(uuid.uuid4())
        return request

    def postprocess_request(self, status, headers, body, request):
        return status, headers, body, request


debugpy.listen(("0.0.0.0", 5678))
app = Micro({})
