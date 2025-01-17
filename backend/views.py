from .models import Patient
from .serializers import PatientSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

@api_view(['GET', 'POST']) # This decorator is used to create a view that can handle GET and POST requests.
def patient_list(request, format=None):  # format=None is used to specify accepted all data formats like JSON, XML, etc.
    if request.method == 'GET':
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # send the updated data to the WebSocket client
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "patients",
        {
            "type": "patient_update",
            "data": {"message": "Patient data updated", "patients": patients},
        },
    )
    
@api_view(['GET', 'PUT', 'DELETE'])
def patient_detail(request, id, format=None):
    try:
        patient = Patient.objects.get(patient_id=id)
    except Patient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PatientSerializer(patient)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PatientSerializer(patient, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        patient.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    # Send the updated data to the WebSocket client
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "patients",
        {
            "type": "patient_update",
            "data": {"message": "Patient data updated", "patients": patient},
        },
    )  
  

    
    