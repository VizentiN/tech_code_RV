from rest_framework import views, status
from rest_framework.response import Response
import requests
from api.models.api import Broth, Protein
from api.serializers.api_serializer import BrothSerializer, OrderSerializer, ProteinSerializer


class BrothListAPIView(views.APIView):
    def get(self, request):
        if 'x-api-key' not in request.headers:
            return Response({"error": "x-api-key header missing"}, status=status.HTTP_403_FORBIDDEN)
        broths = Broth.objects.all()
        serializer = BrothSerializer(broths, many=True)
        return Response(serializer.data)

class ProteinListAPIView(views.APIView):
    def get(self, request):
        if 'x-api-key' not in request.headers:
            return Response({"error": "x-api-key header missing"}, status=status.HTTP_403_FORBIDDEN)
        proteins = Protein.objects.all()
        serializer = ProteinSerializer(proteins, many=True)
        return Response(serializer.data)
    
class OrderAPIView(views.APIView):
    def post(self, request):
        if 'x-api-key' not in request.headers:
            return Response({"error": "x-api-key header missing"}, status=status.HTTP_403_FORBIDDEN)

        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            headers = {'x-api-key': 'ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf'}
            try:
                response = requests.post('https://api.tech.redventures.com.br/orders/generate-id', headers=headers)
                if response.status_code == 200:
                    order_id = response.json()['orderId']
                    order_response = {
                        "id": order_id,
                        "description": f"Order for {request.data.get('item_name', 'Unknown')}",
                        "image": "URL for the order image here"
                    }
                    return Response(order_response, status=status.HTTP_201_CREATED)
                else:
                    return Response({"error": "Error from external order ID service"}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            except requests.exceptions.RequestException as e:
                return Response({"error": str(e)}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)