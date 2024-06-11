from rest_framework import serializers

from api.models.api import Broth, Protein

class BrothSerializer(serializers.ModelSerializer):
    class Meta:
        model = Broth
        fields = '__all__'

class ProteinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Protein
        fields = '__all__'

class OrderSerializer(serializers.Serializer):
    brothId = serializers.IntegerField(required=True)
    proteinId = serializers.IntegerField(required=True)