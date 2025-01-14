from django.db import models

class Patient(models.Model):
    patient_id = models.BigAutoField(primary_key=True) # AutoField is a special type of IntegerField that automatically increments
    name = models.CharField(max_length=255)
    age = models.IntegerField()
    blood_group = models.CharField(max_length=10)

    def __str__(self):
        return self.name
