from django.db import models

# Create your models here.


class sectors_list(models.Model):
    name = models.CharField(max_length=150)
    value = models.IntegerField(unique=True)

    def __str__(self):
        return self.name


class form_list(models.Model):
    name = models.CharField(max_length=50)
    sector = models.ForeignKey(sectors_list, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
