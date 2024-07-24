import os
import re
from settings import TEMPLATE_DIR


class TemplateEngine:
    def render(self, **kwargs):
        content = ""
        base_template = kwargs.get("base_template", None)
        view_template = kwargs.get("view_template", None)
        data = kwargs.get("context_data", None)
        components = kwargs.get("components", None)

        # Load the base template
        template_path = os.path.join(TEMPLATE_DIR, base_template)
        try:
            with open(template_path, "r") as file:
                content = file.read()
        except FileNotFoundError:
            return "Base template file not found"

        # Process template inheritance
        if view_template is not None:
            content = self.process_template_inheritance(content, view_template)

        # Process components
        if components is not None:
            content = self.process_component_injection(content, components)

        # Replace context data placeholders
        if data:
            for key, value in data.items():
                placeholder = r"\{\{ " + key + r" \}\}"
                content = re.sub(placeholder, str(value), content)

        return content

    def partial_render(self, partial_template, context_data):
        # Load the specified partial template
        template_path = os.path.join(TEMPLATE_DIR, partial_template)
        try:
            with open(template_path, "r") as file:
                content = file.read()
        except FileNotFoundError:
            return "Partial template file not found", 404

        # Replace context data placeholders
        if context_data:
            for key, value in context_data.items():
                # Adjusting placeholder pattern to fit your template style
                placeholder = r"\{" + key + r"\}"
                content = re.sub(placeholder, str(value), content)

        return content

    def process_template_inheritance(self, base_content, view_template):
        """Process template inheritance by replacing blocks in base content with blocks from view template."""
        view_path = os.path.join(TEMPLATE_DIR, view_template)
        try:
            with open(view_path, "r") as file:
                view_content = file.read()
        except FileNotFoundError:
            return "View template file not found"

        pattern = r"\{% block (\w+) %\}(.*?)\{% endblock \1 %\}"
        view_blocks = dict(re.findall(pattern, view_content, flags=re.DOTALL))
        for block_name, block_content in view_blocks.items():
            base_pattern = (
                rf"\{{% block {block_name} %\}}.*?\{{% endblock {block_name} %\}}"
            )
            base_content = re.sub(
                base_pattern, block_content.strip(), base_content, flags=re.DOTALL
            )
        return base_content

    def process_component_injection(self, content, components):
        """Inject rendered components into the base content."""
        pattern = r"\{\% component (\w+) \%\}"

        def replace_component(match):
            component_name = match.group(1)
            component = components.get(component_name)
            if component:
                return self.render_component_template(component)
            else:
                return f"<!-- Component '{component_name}' not found -->"

        return re.sub(pattern, replace_component, content)

    def render_component_template(self, component):
        """Render an individual component's template with its context data."""
        template_path = os.path.join(TEMPLATE_DIR, component.template())
        try:
            with open(template_path, "r") as file:
                content = file.read()
        except FileNotFoundError:
            return f"<!-- Template file for {component.name} not found -->"

        for key, value in component.get_context_data().items():
            placeholder = r"\{\{ " + key + r" \}\}"
            content = re.sub(placeholder, str(value), content)
        return content
