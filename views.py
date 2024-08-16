from framework.BaseView.baseview import BaseView
from components import (
    NavComponent,
    FooterComponent,
    SidebarComponent,
    ContactFormComponent,
)


# Extend BaseView
class HomeView(BaseView):
    def __init__(self, request):
        super().__init__()
        self.request = request
        # Decalare your components
        self.components = {
            "nav": NavComponent(name="nav_componenrt"),
            "sidebar": SidebarComponent(name="sidebar_component"),
        }

    # Overwrite any context data
    def get_context_data(self):
        data = {"title": "Daniel Grinevich"}
        return data

    # Define a template
    def template(self):
        template_path = "homepage/index.html"
        return template_path


class ContactView(BaseView):
    def __init__(self, request):
        super().__init__()
        self.request = request
        # Decalare your components
        self.components = {
            "nav": NavComponent(name="nav_component"),
            "contactform": ContactFormComponent(name="contactform_component"),
        }

    # Define a template
    def template(self):
        template_path = "contact/index.html"
        return template_path


class AboutView(BaseView):
    def __init__(self, request):
        super().__init__()
        self.request = request
        self.components = {
            "nav": NavComponent(name="nav_componenrt"),
            "sidebar": SidebarComponent(name="sidebar_component"),
        }

    def template(self):
        template_path = "about/index.html"
        return template_path


class ResumeView(BaseView):
    def __init__(self, request):
        super().__init__()
        self.request = request
        self.components = {
            "nav": NavComponent(name="nav_component"),
        }

    def template(self):
        template_path = "resume/index.html"
        return template_path


class BlogView(BaseView):
    def __init__(self, request):
        super().__init__()
        self.request = request
        self.components = {
            "nav": NavComponent(name="nav_component"),
        }

    def template(self):
        template_path = "blog/index.html"
        return template_path
