from views import HomeView, ContactView, AboutView, ResumeView
from settings import STATIC_URL, StaticHandler

routes = {
    "/": HomeView,
    "/contact/": ContactView,
    "/about/": AboutView,
    "/resume/": ResumeView,
    STATIC_URL: StaticHandler,
}
