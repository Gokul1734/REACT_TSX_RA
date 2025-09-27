from django.shortcuts import render
from rest_framework import generics
from .models import Car
from .serializers import CarSerializer

class CarListCreateView(generics.ListCreateAPIView):
      queryset = Car.objects.all()
      serializer_class = CarSerializer
      def perform_create(self, serializer):
          serializer.save(owner=self.request.user)
