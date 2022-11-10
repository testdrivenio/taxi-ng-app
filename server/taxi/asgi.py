import os

from django.core.asgi import get_asgi_application
from django.urls import path

from channels.routing import ProtocolTypeRouter, URLRouter

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'taxi.settings')

django_asgi_application = get_asgi_application()

from taxi.middleware import TokenAuthMiddlewareStack
from trips.consumers import TaxiConsumer

application = ProtocolTypeRouter({
    'http': django_asgi_application,
    'websocket': TokenAuthMiddlewareStack(
        URLRouter([
            path('taxi/', TaxiConsumer.as_asgi()),
        ])
    ),
})
