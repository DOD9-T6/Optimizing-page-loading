from rest_framework import serializers

from users.models import CustomUser, Provider, TypeOfPayment


class TypeOfPaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = TypeOfPayment
        fields = ('id', 'name')


class ProviderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Provider
        fields = ('id', 'firstname', 'surname')


class UserReadSerializer(serializers.ModelSerializer):
    provider = ProviderSerializer()
    type_of_payment = TypeOfPaymentSerializer()

    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'surname', 'dob', 'fee', 'debt', 'notes',
                  'provider', 'type_of_payment', 'date_pay', 'date_end_pay')


class UserWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'surname', 'dob', 'fee', 'debt', 'notes',
                  'provider', 'type_of_payment', 'date_pay', 'date_end_pay')

    def to_representation(self, instance):
        return UserReadSerializer(instance,
                                  context=self.context).data
