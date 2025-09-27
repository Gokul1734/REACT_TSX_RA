from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Car(models.Model):
      owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cars')
      make = models.CharField(max_length=100)
      model = models.CharField(max_length=100)
      year = models.PositiveIntegerField()
      vin = models.CharField(max_length=17, unique=True)
      price = models.DecimalField(max_digits=10, decimal_places=2)
      mileage = models.FloatField()
      created_at = models.DateTimeField(default=timezone.now)
   
      def __str__(self):
         return f"{self.year} {self.make} {self.model}"