from framework.TemplateEngine.template_engine import TemplateEngine
from settings import TEMPLATE_DIR
import os


class BaseView:
    http_method_names = [
        "get",
        "post",
        "put",
        "patch",
        "delete",
        "head",
        "options",
        "trace",
    ]

    def __init__(self):
        self.base_template = "_base.html"

    def dispatch(self, request):
        htmx = getattr(request, "HTTP_HX_REQUEST", None)
        method = getattr(request, "REQUEST_METHOD", None)
        if hasattr(self, method.lower()):
            if htmx:
                handler = getattr(self, "reactive")
                component = getattr(request, "HTTP_X_COMPONENT")
                return handler(request, component)
            else:
                handler = getattr(self, method.lower())
                return handler()
        elif hasattr(super(), method.lower()):
            handler = getattr(super(), method.lower())
            return handler()
        else:
            return self.http_method_not_allowed()

    def get(self):
        # Defualt headers, can be overriden
        headers = [("Content-Type", "text/html")]
        # Start with status OK
        status = "200 OK"
        # Get default context data which will be eventually be a selct * from model;
        context_data = self.get_context_data()
        # Get components if none if think this will be fine to keep passing
        components = self.components
        # Body should be html response
        body = self.render(
            base_template=self.base_template,
            view_template=self.template(),
            context_data=context_data,
            components=components,
        )
        return (status, headers, body)

    def post(self):
        return self.http_method_not_allowed()

    def render(self, **kwargs):
        base_template = kwargs.get("base_template", None)
        view_template = kwargs.get("view_template", None)
        data = kwargs.get("context_data", None)
        components = kwargs.get("components", None)
        if base_template is None:
            raise ValueError(
                "No base template was provided; cannot render without a base template file."
            )

        if data is None:
            raise ValueError(
                "No context data was provided, you have to pass atleast an empty dictionary."
            )

        # Initalize the template render engine
        engine = TemplateEngine()
        content = engine.render(
            base_template=base_template,
            view_template=view_template,
            context_data=data,
            components=components,
        )

        return content

    def get_context_data(self):
        # This should pull a model
        data = {
            "title": "Homepage",
            "user": "Guest",
            "messages": ["Welcome!", "Have a nice day!"],
        }
        return data

    def http_method_not_allowed(self):
        body = "<html><body><h1>405 Method Not Allowed</h1></body></html>"
        headers = [("Content-Type", "text/html")]
        status = "405 Method Not Allowed"
        return (status, headers, body)

    def reactive(self, request, c):
        component = self.components.get(c)
        if hasattr(component, "reactive"):
            reactive_method = getattr(component, "reactive", None)
            return reactive_method(request)
        else:
            raise ValueError("HTMX call on a component with no HTMX")

    def get_components(self):
        print("get_components")
        pass

    def render_components(self, context):
        pass

    def render_template(self, template_name, content):
        pass
