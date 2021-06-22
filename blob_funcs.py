import json
import os, sys, io
import csv
# For Azure blob storage
import azure
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient, __version__


# Returns user settings in a dictionary. If no such user, returns False.
def get_web_resource(uname):
    # Create client
    blob_connect_str = os.getenv('AZURE_STORAGE_CONNECTION_STRING')
    blob_service_client = BlobServiceClient.from_connection_string(blob_connect_str)
    # Gets bucket client
    try:
        blob_container_client = blob_service_client.get_container_client(uname)
    except:
        # Invalid username if no bucket
        return False
    # Obtain user data from bucket
    user_blob = blob_container_client.get_blob_client(blob='settings.txt')
    user_settings_stream = io.BytesIO()
    user_settings_stream.write(user_blob.download_blob().readall())
    user_settings_str = user_settings_stream.getvalue().decode('utf-8')
    user_settings = json.loads(user_settings_str)
    return user_settings

if __name__ == '__main__':
    pass