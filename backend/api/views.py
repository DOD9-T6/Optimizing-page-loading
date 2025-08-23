from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import SAFE_METHODS
from rest_framework.pagination import LimitOffsetPagination

from .serializers import UserReadSerializer, UserWriteSerializer
from users.models import CustomUser


class UserViewSet(ModelViewSet):
    pagination_class = LimitOffsetPagination

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return UserReadSerializer
        return UserWriteSerializer

    def get_queryset(self):
        return CustomUser.objects.select_related(
            'provider', 'type_of_payment'
        )
