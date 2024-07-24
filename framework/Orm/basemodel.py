import json
from pathlib import Path
from settings import DATABASE_DIR
import os


class BaseModel:
    data_file = "data.json"  # Default data file path

    def __init__(self):
        self.data = self.load_data()

    @classmethod
    def load_data(cls):
        path = os.path.join(DATABASE_DIR, Path(cls.data_file))
        try:
            with open(path, "r", encoding="utf-8") as file:
                return json.load(file)
        except FileNotFoundError:
            return "DB file not found"

    def save_data(self):
        path = os.path.join(DATABASE_DIR, Path(self.data_file))
        try:
            with open(path, "w", encoding="utf-8") as file:
                json.dump(self.data, file, indent=4)
            print("Data saved successfully.")
        except Exception as e:
            print("Failed to save or read data:", e)

    def find_all(self, condition=lambda x: True):
        return [item for item in self.data if condition(item)]

    def find_one(self, condition):
        class_key = self.__class__.__name__.lower() + "s"
        data = self.data.get(class_key)
        for item in data:
            if condition(item):
                return item
        return None

    def add(self, item):
        class_key = self.__class__.__name__.lower() + "s"
        data = self.data.get(class_key)
        if data:
            data.append(item)
        else:
            self.data[class_key] = [item]
        self.save_data()

    def update(self, identifier, update_data):
        item = self.find_one(lambda x: x["id"] == identifier)
        if item:
            item.update(update_data)
            self.save_data()

    def delete(self, identifier):
        self.data = [item for item in self.data if item["id"] != identifier]
        self.save_data()
