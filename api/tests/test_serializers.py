from django.test import TestCase
from api.serializers.api_serializer import OrderSerializer

class OrderSerializerTestCase(TestCase):
    def test_valid_serializer(self):
        valid_data = {
            "brothId": 1,
            "proteinId": 1
        }
        serializer = OrderSerializer(data=valid_data)
        self.assertTrue(serializer.is_valid())

    def test_invalid_serializer(self):
        invalid_data = {
            "brothId": 1
            # proteinId is missing
        }
        serializer = OrderSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('proteinId', serializer.errors)