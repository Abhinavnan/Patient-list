# This file is used to register the models in the admin panel of the Django application.
from django.contrib import admin
from .models import Patient

admin.site.register(Patient)   # Registering the Patients model in the admin panel

