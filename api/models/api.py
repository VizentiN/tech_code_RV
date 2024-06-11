from django.db import models

class Broth(models.Model):
    id = models.AutoField(primary_key=True)
    imageInactive = models.URLField()
    imageActive = models.URLField()
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)

class Protein(models.Model):
    id = models.AutoField(primary_key=True)
    imageInactive = models.URLField()
    imageActive = models.URLField()
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)