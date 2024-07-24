from framework.TemplateEngine.template_engine import TemplateEngine


class BaseComponent:

    # This is the equivalent of static in C#
    # All instances of the class will have this.
    registry = {}

    def __init__(self, name, data={}):
        self.name = name
        # Register each instance of the component
        BaseComponent.registry[name] = self
        self.data = data

    def data(self):
        return {}

    def get_context_data(self):
        return self.data

    def dispatch(self):
        raise NotImplementedError("Route HTMX action to a component.")

    def template(self):
        raise NotImplementedError("Each component must define a template path.")

    def render(self, **kwargs):
        headers = [("Content-Type", "text/html")]
        status = "200 OK"
        data = kwargs.get("data", None)
        template = kwargs.get("template", None)
        engine = TemplateEngine()
        body = engine.partial_render(
            partial_template=template,
            context_data=data,
        )
        return (status, headers, body)
