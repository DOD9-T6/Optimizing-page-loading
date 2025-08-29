from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import UserViewSet, ProviderViewSet, TypeOfPaymentViewSet


router = DefaultRouter()
router.register('users', UserViewSet, 'users')
router.register('providers', ProviderViewSet, 'providers')
router.register('payments', TypeOfPaymentViewSet, 'payments')

urlpatterns = [
    path('api/', include(router.urls)),
]
