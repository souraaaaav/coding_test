from rest_framework import generics, status
from rest_framework.response import Response

from .models import form_list, sectors_list
from .serializers import form_list_serializer, sectors_list_serializer

# Create your views here.


class selectbox_list_view(generics.GenericAPIView):
    serializer_class = sectors_list_serializer

    def get(self, request):
        try:
            sectorList = sectors_list.objects.all()
            sectorListSerialized = self.get_serializer(sectorList, many=True)
            return Response(
                {
                    "data": sectorListSerialized.data,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {
                    "message": "Something went wrong",
                },
                status=status.HTTP_200_OK,
            )


class form_list_view(generics.GenericAPIView):
    serializer_class = form_list_serializer

    def get(self, request):
        try:
            formList = form_list.objects.all()
            formListSerialized = self.get_serializer(formList, many=True)
            return Response(
                {
                    "data": formListSerialized.data,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {
                    "message": "Something went wrong",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class form_detail_view(generics.GenericAPIView):
    serializer_class = form_list_serializer

    def get(self, request, id):
        try:
            formList = form_list.objects.get(id=id)
            formListSerialized = self.get_serializer(formList, many=False)
            return Response(
                {
                    "data": formListSerialized.data,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {
                    "message": "Something went wrong",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

    def post(self, request):
        try:
            name = request.data["name"]
            sectorVal = request.data["sectorVal"]
            sector = sectors_list.objects.get(value=sectorVal)
            form = form_list(name=name, sector=sector)
            form.save()
            return Response(
                {
                    "message": "Successfully inserted",
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {
                    "message": "Something went wrong",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

    def put(self, request, id):
        try:
            name = request.data["name"]
            sectorVal = request.data["sectorVal"]
            formList = form_list.objects.get(id=id)
            sector = sectors_list.objects.get(value=sectorVal)
            formList.name = name
            formList.sector = sector
            formList.save()
            return Response(
                {
                    "message": "Successfully Updated",
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {
                    "message": "Something went wrong",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
