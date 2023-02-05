from django.contrib import admin

from .models import form_list, sectors_list

# Register your models here.

admin.site.register(form_list)
admin.site.register(sectors_list)
