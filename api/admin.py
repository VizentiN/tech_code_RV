from django.contrib import admin

from api.models.api import Broth, Protein


# Administração simples
admin.site.register(Broth)
admin.site.register(Protein)