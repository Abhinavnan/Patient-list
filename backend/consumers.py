# This file contains the WebSocket consumer that will be used to send real-time updates to the frontend.
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class PatientConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Add this connection to the "patients" group
        await self.channel_layer.group_add("patients", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        # Remove this connection from the "patients" group
        await self.channel_layer.group_discard("patients", self.channel_name)

    async def patient_update(self, event):
        # Send the updated data to the WebSocket client
        await self.send(text_data=json.dumps(event["data"]))
