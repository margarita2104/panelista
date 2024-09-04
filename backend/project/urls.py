"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework_simplejwt import views as jwt_views
from django.conf import settings

schema_view = get_schema_view(
    openapi.Info(
        title="Django API",
        default_version='v1',
        description="Description of your Django App",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="academy@constructor.org"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,  # Set to False restrict access to protected endpoints
    permission_classes=(permissions.AllowAny,),  # Permissions for docs access
)

urlpatterns = [
    # admin
    path('backend/admin/', admin.site.urls),
    # api documentations
    path('backend/api/docs', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # registration
    path('backend/api/', include('user.urls')),
    # auth
    path('backend/api/auth/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('backend/api/auth/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('backend/api/auth/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_verify'),
    # speakers
    path('backend/api/speakers/', include('speaker.urls')),
    # organizers
    path('backend/api/organizers/', include('organizer.urls')),
    # events
    path('backend/api/events/', include('event.urls')),
    # reviews
    path('backend/api/reviews/', include('review.urls')),
    # chatbot
    path('backend/api/chat/', include('chatbot.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
