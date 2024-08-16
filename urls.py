from views import HomeView, ContactView, AboutView, ResumeView, BlogView
from settings import STATIC_URL, StaticHandler

routes = {
    "/": HomeView,
    "/contact/": ContactView,
    "/about/": AboutView,
    "/resume/": ResumeView,
    "/blog/": BlogView,
    STATIC_URL: StaticHandler,
}
