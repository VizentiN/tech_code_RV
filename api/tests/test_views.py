from django.test import TestCase
from rest_framework.test import APIClient
from unittest.mock import patch
from api.models.api import Broth, Protein

class ViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.broth = Broth.objects.create(
            imageInactive="https://example.com/broth_inactive.svg",
            imageActive="https://example.com/broth_active.svg",
            name="Salt",
            description="Simple like the seawater, nothing more",
            price=10.00
        )
        self.protein = Protein.objects.create(
            imageInactive="https://example.com/protein_inactive.svg",
            imageActive="https://example.com/protein_active.svg",
            name="Chasu",
            description="A sliced flavourful pork meat with a selection of season vegetables.",
            price=12.00
        )

    @patch('requests.post')
    def test_order_create_view_success(self, mock_post):
        with patch('requests.post') as mock_post:
            mock_post.return_value.status_code = 200
            mock_post.return_value.json.return_value = {'orderId': '12345'}
            response = self.client.post('/api/orders/', data={"brothId": 1, "proteinId": 1}, HTTP_X_API_KEY='your_api_key_here')
            self.assertEqual(response.status_code, 201)

    def test_order_create_view_missing_api_key(self):
        response = self.client.post('/api/orders/', data={"brothId": 1, "proteinId": 1})
        self.assertEqual(response.status_code, 403)