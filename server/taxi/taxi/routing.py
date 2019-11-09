from django.urls import path
from channels.auth import AuthMiddlewareStack  
from channels.routing import ProtocolTypeRouter, URLRouter

from trips.consumers import TaxiConsumer

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter([
            path('taxi/', TaxiConsumer),
        ])
    )
})
