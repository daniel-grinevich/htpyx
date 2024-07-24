from views import HomeView, ContactView, AboutView
from settings import STATIC_URL, StaticHandler

routes = {
    "/": HomeView,
    "/contact/": ContactView,
    "/about/": AboutView,
    STATIC_URL: StaticHandler,
}
