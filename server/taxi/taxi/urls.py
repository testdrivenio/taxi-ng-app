from django.contrib import admin
from django.urls import include, path

from trips.views import SignUpView, LogInView, LogOutView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/sign_up/', SignUpView.as_view(), name='sign_up'),
    path('api/log_in/', LogInView.as_view(), name='log_in'),
    path('api/log_out/', LogOutView.as_view(), name='log_out'),
    path('api/trip/', include('trips.urls', 'trip',)),
]
