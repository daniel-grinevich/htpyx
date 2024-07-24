from framework.Orm.basemodel import BaseModel


class Project(BaseModel):
    data_file = "project.json"  # Specific file for projects

    # Additional project-specific methods can go here
    def specific_project_method(self):
        # Implementation specific to projects
        pass


class Contact(BaseModel):
    data_file = "contact.json"
