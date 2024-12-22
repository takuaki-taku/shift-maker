from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'preferences', views.ShiftPreferenceViewSet, basename='shift-preference')

urlpatterns = [
    path('', include(router.urls)),
]