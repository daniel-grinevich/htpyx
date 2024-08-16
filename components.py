from framework.BaseView.basecomponent import BaseComponent
from models import Project, Contact


class NavComponent(BaseComponent):
    def __init__(self, name):
        super().__init__(name)  # Register and set name

    def get_context_data(self):
        # Override context data for each individual component
        self.data = {"temp": "james"}
        return self.data

    # Pass template path
    def template(self):
        template_path = "components/nav.html"
        return template_path

    # If htmx request handle it here
    def reactive(self, request):
        if request.REQUEST_METHOD == "GET":
            data = getattr(request, "htmx-data", None)

            if data:
                project_name = data.get("project")
                project = Project()
                project_obj = project.find_one(lambda x: x["slug"] == project_name)


class FooterComponent(BaseComponent):
    def __init__(self, name):
        super().__init__(name)  # Register and set name

    def get_context_data(self):
        # Every component should have its own data right?
        self.data = {"name": "Kenny"}
        return self.data

    def template(self):
        template_path = "components/footer.html"
        return template_path

    def reactive(self):
        print("DO SOME HTMX SHIT")


class SidebarComponent(BaseComponent):
    def __init__(self, name):
        super().__init__(name)

    def get_context_data(self):
        self.data = {
            "htpyx": "HTpyX",
            "navicoffee": "Navi Coffee",
            "stocktrading": "Stock Trading Bot",
            "barml": "Bar Inventory Machine Learning",
        }
        return self.data

    def template(self):
        template_path = "components/sidebar.html"
        return template_path

    def reactive(self, request):
        # We are going to have to specify if its a GET or POST we want to handle
        if request.REQUEST_METHOD == "GET":

            data = getattr(request, "htmx-data", None)

            if data:
                project_name = data.get("project")
                project = Project()
                project_obj = project.find_one(lambda x: x["slug"] == project_name)

            if project_name == "htpyx":
                template_path = "partials/htpyx_project.html"
            elif project_name == "navi":
                template_path = "partials/navi_project.html"
            elif project_name == "stock":
                template_path = "partials/stock_project.html"
            elif project_name == "bar":
                template_path = "partials/bar_project.html"
            else:
                template_path = None

            return self.render(template=template_path, data=project_obj)


class ContactFormComponent(BaseComponent):
    def __init__(self, name):
        super().__init__(name)

    def template(self):
        template_path = "components/contact_form.html"
        return template_path

    def reactive(self, request):
        if request.REQUEST_METHOD == "POST":
            try:
                data = getattr(request, "htmx-data")
                name = data["name"][0]
                email = data["email"][0]

                contact = Contact()
                contact.add({"name": name, "email": email})

                template_path = "partials/success.html"
                return self.render(template=template_path)
            except Exception as e:
                print(f"Error: {e}")
                template_path = "partials/error.html"
                return self.render(template=template_path)


# class HeroComponent:
#     def __init__(self, data):
#         self.data = data

#     def render(self):
#         # Logic to render the hero component based on self.data
#         template_path = "components/hero.html"
#         html = TemplateEngine().render(template_path, context={"data": self.data})
#         return html
