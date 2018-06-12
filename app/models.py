from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.

class Profile(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    gender = models.CharField(max_length=6, null=True)
    country = models.CharField(max_length=120, null=True)
    state = models.CharField(max_length=120, null=True)
    age = models.CharField(max_length=120, null=True)
    def __str__(self):
        return self.user.username


