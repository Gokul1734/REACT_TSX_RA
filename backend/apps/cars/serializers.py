from .models import Car
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator


class CarSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    vin = serializers.CharField(
        max_length=17,
        validators=[UniqueValidator(queryset=Car.objects.all(), message="VIN must be unique.")]
    )

    class Meta:
        model = Car
        fields = ['id', 'owner', 'make', 'model', 'year', 'vin', 'price', 'mileage', 'created_at']
        read_only_fields = ['id', 'owner', 'created_at']